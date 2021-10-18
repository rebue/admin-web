<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
                    <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                        <crud-table
                            :showKeywords="true"
                            :ref="`crudTable.${realm.id}`"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ realmId: curRealmId, orgId: curOrgId }"
                            :scrollX="600"
                            :showHierarchical="showOrg"
                        >
                            <template #left>
                                <div v-show="showOrg" class="table-left">
                                    <org-tree
                                        :ref="`orgTree.${realm.id}`"
                                        :show.sync="showOrg"
                                        :realmId="realm.id"
                                        @click="handleOrgMenuClick"
                                        @select="handleOrgTreeSelect"
                                    />
                                    <div class="table-divider"></div>
                                </div>
                            </template>
                        </crud-table>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-org-form
            ref="manageOrgForm"
            :account="curRecord"
            :visible.sync="manageOrgFormVisible"
            @close="handleEditFormClose"
        />
        <manage-role-form
            ref="manageRoleForm"
            :account="curRecord"
            :visible.sync="manageRoleFormVisible"
            @close="handleEditFormClose"
        />
        <disabled-form :record="curRecord" :visible.sync="disabledFormVisible" @close="handleEditFormClose" />
        <enabled-form :record="curRecord" :visible.sync="enabledFormVisible" @close="handleEditFormClose" />
        <change-pswd-form :record="curRecord" :visible.sync="changePswdFormVisible" @close="handleEditFormClose" />
        <agent-sign-in-form
            :record="curRecord"
            :realmId="curRealmId"
            :visible.sync="agentSignInFormVisible"
            @close="handleEditFormClose"
        />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm.vue';
import DisabledForm from './DisabledForm.vue';
import EnabledForm from './EnabledForm.vue';
import ChangePswdForm from './ChangePswdForm.vue';
import AgentSignInForm from './AgentSignInForm.vue';
import OrgTree from '../rac-org/Tree';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi, racAccountApi } from '@/api/Api';
import ManageOrgForm from './ManageOrgForm.vue';
import ManageRoleForm from './ManageRoleForm.vue';

export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
        EditForm,
        AgentSignInForm,
        ChangePswdForm,
        OrgTree,
        DisabledForm,
        EnabledForm,
        ManageOrgForm,
        ManageRoleForm,
    },
    data() {
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'signInName',
                title: '登录账号',
                width: 200,
                fixed: 'left',
                customRender: (text, record) => (
                    <a-popover title={(record.signInName || record.signInMobile || record.signInEmail) + '详情'}>
                        {record.signInName || record.signInMobile || record.signInEmail}
                        <template slot="content">
                            <p>账户ID：{record.id}</p>
                            <p>账户名：{record.signInName}</p>
                            <p>手机号：：{record.signInMobile}</p>
                            <p>邮箱：{record.signInEmail}</p>
                            <p>账户昵称：{record.signInNickname}</p>
                            <p>微信昵称：{record.wxNickname}</p>
                            <p>QQ昵称：{record.qqNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'nickname',
                title: '昵称',
                // width: 120,
                ellipsis: true,
                customRender: (text, record) => {
                    //FIXME 在编辑的时候，昵称输入框删除完之后会报错，浏览窗口动不了
                    return (
                        <fragment>
                            {record.signInNickname}
                            {record.wxNickname && (
                                <span>
                                    <br />
                                    {record.wxNickname + '(微信)'}
                                </span>
                            )}
                            {record.qqNickname && (
                                <span>
                                    <br />
                                    {record.qqNickname + '(QQ)'}
                                </span>
                            )}
                        </fragment>
                    );
                },
            },
            {
                dataIndex: 'realName',
                title: '用户姓名',
                align: 'center',
            },
            {
                dataIndex: 'isEnabled',
                align: 'center',
                title: '启用',
                width: 100,
                fixed: 'right',
                customRender: (text, record) => (
                    <a-switch
                        checked={record.isEnabled}
                        checkedChildren="启"
                        unCheckedChildren="禁"
                        onClick={() => this.handleAccountCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除该账户吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'more',
                items: [
                    // 先注释重置密码，后期再实现
                    // {
                    //     type: 'a',
                    //     title: '重置密码',
                    //     onClick: record => this.handleResetPswd(record),
                    // },
                    {
                        type: 'a',
                        title: '修改密码',
                        onClick: record => this.handleChangePswd(record),
                    },
                    {
                        type: 'a',
                        title: '关联用户',
                        onClick: record => this.handleManageUser(record),
                    },
                    {
                        type: 'a',
                        title: '管理组织',
                        onClick: record => this.handleManageOrg(record),
                    },
                    {
                        type: 'a',
                        title: '管理角色',
                        onClick: record => this.handleManageRole(record),
                    },
                    {
                        type: 'a',
                        title: '映射账号',
                        onClick: record => this.handleManageAccount(record),
                    },
                    // 先注释代理登录，后期实现
                    // {
                    //     type: 'a',
                    //     title: '代理登录',
                    //     onClick: record => this.handleAgentSignIn(record),
                    // },
                ],
            },
        ];

        return {
            loading: false,
            changePswdFormVisible: false,
            manageOrgFormVisible: false,
            manageRoleFormVisible: false,
            enabledFormVisible: false,
            disabledFormVisible: false,
            agentSignInFormVisible: false,
            showOrg: false,
            curRealmId: '',
            curOrgId: undefined,
            realms: [],
            columns,
            curRecord: {},
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
        orgTree() {
            return this.$refs['orgTree.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.manageOrgForm = this.$refs.manageOrgForm;
        this.manageRoleForm = this.$refs.manageRoleForm;
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = ro.extra.list;
                    if (!this.curRealmId) this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理改变领域的事件
         */
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
            this.$nextTick(() => {
                this.orgTree.refreshData();
                this.crudTable.refreshData();
            });
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
        /** 处理账户启用或禁用 */
        handleAccountCheck(record) {
            this.loading = true;
            this.curRecord = record;
            if (record.isEnabled === true) {
                this.curRecord.isEnabled = !record.isEnabled;
                this.disabledFormVisible = true;
            } else {
                this.curRecord.isEnabled = !record.isEnabled;
                this.enabledFormVisible = true;
            }
        },
        /** 处理重置密码 */
        handleResetPswd(record) {
            this.$confirm({
                title: '重置密码',
                content: '你确定要重置密码吗？',
                onOk: () => {
                    racAccountApi.resetSignInPswd(record.id).then(() => {
                        this.refreshTableData();
                    });
                },
            });
        },
        /** 处理修改密码 */
        handleChangePswd(record) {
            this.curRecord = record;
            this.changePswdFormVisible = true;
        },
        /**
         * 处理添加账户的事件
         */
        handleAdd(record) {
            const that = this;
            this.$showDialog(
                require('./add/Index.vue').default,
                {
                    data() {
                        return {
                            realmId: that.curRealmId,
                            orgId: that.curOrgId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshTableData();
                        },
                    },
                },
                {
                    title: '新建账号',
                    width: '60%',
                    footer: null,
                    destroyOnClose: true,
                    wrapClassName: 'account-add-dialog-wrap',
                }
            );
        },
        /**
         * 处理关联用户事件
         */
        handleManageUser(record) {
            const that = this;
            this.$showDialog(
                require('./ChooseUser.vue').default,
                {
                    data() {
                        return {
                            model: {
                                id: record.id,
                                userId: record.userId,
                            },
                        };
                    },
                    methods: {
                        callback(ro) {
                            that.refreshTableData();
                        },
                    },
                },
                {
                    title: '关联用户',
                }
            );
        },
        /**
         * 处理管理组织事件
         */
        handleManageOrg(record) {
            this.curRecord = record;
            this.manageOrgFormVisible = true;
        },
        /**
         * 处理管理角色事件
         */
        handleManageRole(record) {
            this.curRecord = record;
            this.manageRoleFormVisible = true;
        },
        /**
         * 处理映射账号事件
         */
        handleManageAccount(record) {
            this.curRecord = record;
            this.$showDrawer(
                require('./ManageAccountForm.vue').default,
                {
                    data() {
                        return {
                            account: record,
                        };
                    },
                },
                {
                    title: `账号(${record.signInName})的映射账号`,
                    width: '50%',
                }
            );
        },
        /**
         * 处理代理登录事件
         */
        handleAgentSignIn(record) {
            this.curRecord = record;
            this.agentSignInFormVisible = true;
        },
        /**
         * 处理编辑账户的事件
         */
        handleEdit(record) {
            this.curRecord = record;
            this.editForm.show(EditFormTypeDic.Modify, { ...record });
        },
        /**
         * 处理删除账户的事件
         */
        handleDel(record) {
            this.curRecord = record;
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>

<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
