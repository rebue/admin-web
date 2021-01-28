<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="item in domains" :key="item.id" :tab="item.name">
                    <crud-table
                        :ref="'crudTable.' + item.id"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :defaultPagination="false"
                    >
                        <template #editForm="slotProps">
                            <edit-form
                                :ref="'editForm.' + item.id"
                                :width="640"
                                @close="slotProps.handleEditFormClose"
                            />
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
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi } from '@/api/Api';
import { racSysApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
    },
    data() {
        this.api = racSysApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                scopedSlots: { customRender: 'serial' },
                width: 50,
                fixed: 'left',
            },
            {
                dataIndex: 'name',
                title: '名称',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'id',
                title: '编码',
                width: 180,
            },
            {
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 130,
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
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    this.curDomainId = this.domains[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleDomainChanged(domainId) {
            this.curDomainId = domainId;
        },
        /**
         * 处理添加系统的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                domainId: this.curDomainId,
            });
        },
        /**
         * 处理编辑系统的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除系统的事件
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
