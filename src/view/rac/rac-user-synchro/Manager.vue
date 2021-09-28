<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                >
                </crud-table>
            </template>
        </base-manager>
        <edit-form ref="editForm" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { etlStrategyApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
    },
    data() {
        this.api = etlStrategyApi;
        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     width: 50,
            //     fixed: 'left',
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'name',
                title: '名称',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'srcName',
                title: '来源',
                width: 140,
            },
            {
                dataIndex: 'dstName',
                title: '目的',
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
                        onClick={() => this.handleUserCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
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
            columns,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加领域的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑领域的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除领域的事件
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
        /** 处理用户启用或禁用 */
        handleUserCheck(record) {
            this.loading = true;
            this.curRecord = record;
            if (record.isEnabled === true) {
                this.curRecord.isEnabled = !record.isEnabled;
                this.disabledFormVisible = true;
            } else {
                this.curRecord.isEnabled = !record.isEnabled;
                this.enabledFormVisible = true;
            }
            const data = {
                id: record.id,
                isEnabled: record.isEnabled,
            };
            etlStrategyApi
                .modify(data)
                .then(() => console.log(1))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
