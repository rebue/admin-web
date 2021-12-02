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
                    :rowSelection="{}"
                >
                    <template #commands>
                        <div style="width: 100%;">
                            <div style="float: left">年第{{ moth }}周[{{ startTime }}至{{ endTime }}]</div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'curriculum',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'term',
                title: '课程名称',
                width: 150,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '课程类型',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'startTime',
                title: '周授课老师',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '课程开始时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupCode',
                title: '课程结束时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupStartTime',
                title: '课时',
                width: 150,
                ellipsis: true,
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
                // icon: 'plus',
                title: '同步',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '选课',
            },
        ];

        return {
            columns,
            formInline: {
                name: '',
                user: '',
            },
            moth: 37,
            startTime: '2021-12-8',
            endTime: '2021-12-15',
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onPanelChange(value, mode) {
            console.log(value, mode);
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
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
