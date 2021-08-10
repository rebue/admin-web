<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs :activeKey="curRealmId" @change="handleRealmChanged">
                    <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                        <crud-table
                            :ref="`crudTable.${realm.id}`"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ realmId: curRealmId }"
                            :scrollX="600"
                            :defaultPagination="false"
                            @moveUp="handleMoveUp"
                            @moveDown="handleMoveDown"
                        >
                        </crud-table>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-perm-form :role.sync="curRole" :visible.sync="managePermFormVisible" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi, racRoleApi } from '@/api/Api';
import ManagePermForm from './ManagePermForm.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
        ManagePermForm,
    },
    data() {
        this.api = racRoleApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
                fixed: 'left',
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
                        onClick={() => this.handleRoleCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 170,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
            {
                dataIndex: 'sort',
                align: 'center',
                title: '排序',
                width: 100,
                fixed: 'right',
                scopedSlots: { customRender: 'sort' },
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
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '管理权限',
                        onClick: record => this.handleManagePerm(record),
                    },
                ],
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            realms: [],
            columns,
            managePermFormVisible: false,
            curRole: {},
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
        },
        /** 处理角色启用或禁用 */
        handleRoleCheck(record) {
            this.loading = true;
            if (record.isEnabled) {
                this.api.enable(record.id, !record.isEnabled).finally(() => {
                    this.refreshTableData();
                });
            }
            if (!record.isEnabled) {
                this.api.disable(record.id, !record.isEnabled).finally(() => {
                    this.refreshTableData();
                });
            }
        },
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            this.api.moveUp(record).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            this.api.moveDown(record).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加角色的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**
         * 处理编辑角色的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除角色的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理管理权限的事件
         */
        handleManagePerm(record) {
            this.curRole = record;
            this.managePermFormVisible = true;
        },
        /**
         * 关闭时触发
         */
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
