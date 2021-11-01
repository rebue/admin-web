<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs class="realm-tabs" :activeKey="curRealmId" @change="handleRealmChanged">
                    <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                        <crud-table
                            :showKeywords="true"
                            :ref="`crudTable.${realm.id}`"
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
        <unlock-form :record="curRecord" :visible.sync="enabledFormVisible" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgTree from '../rac-org/Tree';
import { racRealmApi, racAccountApi, racSignInUnlockApi } from '@/api/Api';
import UnlockForm from './UnlockForm.vue';

export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
        OrgTree,
        UnlockForm,
    },
    data() {
        this.api = racSignInUnlockApi;
        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     width: 50,
            //     fixed: 'left',
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'signInName',
                title: '登录账号',
                width: 120,
                fixed: 'left',
                customRender: (text, record) => (
                    <a-popover title={(record.signInName || record.signInMobile || record.signInEmail) + '详情'}>
                        {record.signInName || record.signInMobile || record.signInEmail}
                        <template slot="content">
                            <p>账户ID：{record.id}</p>
                            <p>账户名：{record.signInName}</p>
                            <p>手机号：{record.signInMobile}</p>
                            <p>邮箱：{record.signInEmail}</p>
                            <p>账户昵称：{record.signInNickname}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'nickname',
                title: '昵称',
                width: 100,
                ellipsis: true,
                customRender: (text, record) => {
                    //FIXME 在编辑的时候，昵称输入框删除完之后会报错，浏览窗口动不了
                    return (
                        <fragment>
                            {record.signInNickname}
                            {record.wxNickname && (
                                <span>
                                    <br />
                                    {record.wxNickname + '(微信昵称)'}
                                </span>
                            )}
                            {record.qqNickname && (
                                <span>
                                    <br />
                                    {record.qqNickname + '(QQ昵称)'}
                                </span>
                            )}
                        </fragment>
                    );
                },
            },
            {
                dataIndex: 'lockReason',
                title: '锁定原因',
                ellipsis: true,
            },
            {
                dataIndex: 'lockDatetime',
                title: '锁定时间',
                width: 165,
                ellipsis: true,
            },
            {
                dataIndex: 'autoUnlockDatetime',
                title: '自动解锁时间',
                width: 165,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 100,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'confirm',
                title: '解锁',
                confirmTitle: '你确定要解锁该账户吗?',
                onClick: record => this.handleAccountCheck(record),
            },
        ];

        return {
            loading: false,
            showOrg: false,
            curRealmId: '',
            curOrgId: undefined,
            enabledFormVisible: false,
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
        /** 处理账户解锁 */
        handleAccountCheck(record) {
            this.loading = true;
            this.curRecord = record;
            this.enabledFormVisible = true;
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
