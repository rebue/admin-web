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
                    :defaultPagination="false"
                >
                </crud-table>
            </template>
        </base-manager>
        <edit-form ref="editForm" @success="handleEditFormClose" configType="钉钉" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { oapConfig } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
    },
    data() {
        this.api = {
            listAll() {
                return oapConfig.getNacosConfig().then(ro => {
                    const data = ro.extra[0];
                    ro.extra.list = data;
                    return ro;
                });
            },
        };
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 100,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '名称',
            },
            {
                dataIndex: 'id',
                title: 'appid',
                ellipsis: true,
            },
            // {
            //     dataIndex: 'secret',
            //     title: 'appsecret',
            //     ellipsis: true,
            // },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,

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
         * 处理添加的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除的事件
         */
        handleDel(record) {
            this.loading = true;
            const configType = 'ding-talk';
            const data = {
                oldAppKey: record.id,
                configType,
            };
            oapConfig.setNacosDelConfig(data).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        /** 处理用户启用或禁用 */
        // handleUserCheck(record) {
        //     this.loading = true;
        //     this.curRecord = record;
        //     if (record.isEnabled === true) {
        //         this.curRecord.isEnabled = !record.isEnabled;
        //         this.disabledFormVisible = true;
        //     } else {
        //         this.curRecord.isEnabled = !record.isEnabled;
        //         this.enabledFormVisible = true;
        //     }
        //     const data = {
        //         id: record.id,
        //         isEnabled: record.isEnabled,
        //     };
        //     etlStrategyApi
        //         .enable(data)
        //         .then(() => console.log(1))
        //         .finally(() => (this.loading = false));
        // },
    },
};
</script>
