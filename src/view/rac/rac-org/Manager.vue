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
                            :query="{ realmId: curRealmId, deep: true }"
                            :scrollX="600"
                            :expandable="true"
                        >
                        </crud-table>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
        <edit-form ref="editForm" @success="handleEditFormClose" />
        <account-manage-form :record="curRecord" :curOrgName="curOrgName" :visible.sync="addToOrgVisible" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import { racOrgApi } from '@/api/Api';
import { OrgTypeDic } from '@/dic/OrgTypeDic';
import AccountManageForm from './AccountManageForm.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
        AccountManageForm,
    },
    data() {
        this.api = racOrgApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
            },
            {
                dataIndex: 'orgType',
                title: '组织类型',
                width: 90,
                customRender: text => OrgTypeDic.getName(text),
            },
            {
                dataIndex: 'fullName',
                title: '全称',
                ellipsis: true,
            },
            {
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 300,

                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建根组织',
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
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '添加子组织',
                onClick: record => this.handleAddChild(record),
            },
            {
                type: 'a',
                title: '管理账户',
                onClick: this.handleAddToOrg,
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            realms: [],
            columns,
            addToOrgVisible: false,
            curRecord: {},
            curOrgName: '',
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = ro.extra.list;
                    this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /**
         * 处理添加组织的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**将用户添加到组织中 */
        handleAddToOrg(record) {
            this.addToOrgVisible = true;
            this.curOrgName = record.name;
            this.curRecord = record;
        },
        /**
         * 处理编辑组织的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除组织的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加子组织的事件
         */
        handleAddChild(record) {
            this.loading = true;
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
                parentId: record.id,
                parentFullName: record.fullName,
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
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
