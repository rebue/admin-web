<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
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
                title: '课程或活动',
                width: 150,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '课程日期',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'startTime',
                title: '上课刷卡时间',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '下课刷卡时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupCode',
                title: '状态',
                width: 150,
                ellipsis: true,
            },
        ];

        this.tableCommands = [];

        this.tableActions = [
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '查看班级课程',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '查看学员宿舍',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置班级编码',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置网上报名注册码',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
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
