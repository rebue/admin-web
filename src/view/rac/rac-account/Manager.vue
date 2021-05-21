<template>
    <fragment
        ><base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs class="domain-tabs" :activeKey="curDomainId" @change="handleDomainChanged">
                    <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                        <crud-table
                            :showKeywords="true"
                            :ref="`crudTable.${domain.id}`"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ domainId: curDomainId, orgId: curOrgId }"
                            :scrollX="600"
                            :ShowAllRecords="true"
                        >
                            <template #left>
                                <div v-show="showOrg" class="table-left">
                                    <org-tree
                                        :ref="`orgTree.${domain.id}`"
                                        :show.sync="showOrg"
                                        :domainId="domain.id"
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
        <manage-account-form :record="curRecord" :visible.sync="manageAccountFormVisible" @close="refreshTableData()" />
        <disabled-form :record="curRecord" :visible.sync="disabledFormVisible" @close="refreshTableData()" />
        <enabled-form :record="curRecord" :visible.sync="enabledFormVisible" @close="refreshTableData()" />
        <change-pswd-form :id="curRecordId" :visible.sync="changePswdFormVisible" @close="refreshTableData()" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm.vue';
import DisabledForm from './DisabledForm.vue';
import EnabledForm from './EnabledForm.vue';
import ChangePswdForm from './ChangePswdForm.vue';
import OrgTree from '../rac-org/Tree';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi, racAccountApi } from '@/api/Api';
import ManageAccountForm from './ManageAccountForm.vue';

export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
        EditForm,
        ChangePswdForm,
        OrgTree,
        DisabledForm,
        EnabledForm,
        ManageAccountForm,
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
                title: '登录名称',
                width: 150,
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
                width: 160,
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
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'isEnabled',
                align: 'center',
                title: '启用',
                width: 70,
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
                width: 240,
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
                type: 'a',
                title: '修改密码',
                onClick: record => this.handleChangePswd(record),
            },
            {
                type: 'a',
                title: '管理组织',
                onClick: record => this.handleManageAccount(record),
            },
        ];

        return {
            loading: false,
            changePswdFormVisible: false,
            manageAccountFormVisible: false,
            enabledFormVisible: false,
            disabledFormVisible: false,
            curRecordId: '',
            showOrg: false,
            curDomainId: '',
            curOrgId: undefined,
            domains: [],
            columns,
            curRecord: {},
            orgId: '',
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curDomainId][0];
        },
        orgTree() {
            return this.$refs['orgTree.' + this.curDomainId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    if (!this.curDomainId) this.curDomainId = this.domains[0].id;
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
        handleDomainChanged(domainId) {
            this.curDomainId = domainId;
            this.orgTree.refreshData();
            this.crudTable.refreshData();
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            console.log();
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.orgId = item.id;
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
        /** 处理修改密码 */
        handleChangePswd(record) {
            this.curRecordId = record.id;
            this.changePswdFormVisible = true;
        },
        /**
         * 处理添加账户的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.editForm.show(EditFormTypeDic.Add, {
                orgId: this.orgId,
                domainId: this.curDomainId,
                groupId: record.id,
            });
        },
        /**处理管理账户事件 */
        handleManageAccount(record) {
            this.curRecord = record;
            this.manageAccountFormVisible = true;
        },
        /**
         * 处理编辑账户的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, { ...record });
        },
        /**
         * 处理删除账户的事件
         */
        handleDel(record) {
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
.domain-tabs {
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
