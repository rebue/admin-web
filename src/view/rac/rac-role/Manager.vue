<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :ref="`crudTable.${domain.id}`"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :defaultPagination="false"
                        @moveUp="handleMoveUp"
                        @moveDown="handleMoveDown"
                    >
                        <template #editForm="{handleEditFormClose}">
                            <edit-form :ref="`editForm.${domain.id}`" :width="640" @close="handleEditFormClose" />
                        </template>
                    </crud-table>
                </a-tab-pane>
            </a-tabs>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi, racRoleApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
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
                width: 130,
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
        ];

        return {
            loading: false,
            curDomainId: '',
            domains: [],
            columns,
        };
    },
    computed: {
        editForm() {
            return this.$refs['editForm.' + this.curDomainId][0];
        },
        crudTable() {
            return this.$refs['crudTable.' + this.curDomainId][0];
        },
    },
    mounted() {
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
        },
        /** 处理角色启用或禁用 */
        handleRoleCheck(record) {
            this.loading = true;
            this.api.enable(record.id, !record.isEnabled).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            this.api.moveUp(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            this.api.moveDown(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加角色的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                domainId: this.curDomainId,
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
    },
};
</script>
