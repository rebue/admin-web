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
    name: 'Manager',
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
                title: '学期',
                width: 150,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '班级名称',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '开始时间',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '结束时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupCode',
                title: '网上报名注册码',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupStartTime',
                title: '网上报名开通时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupEndTime',
                title: '网上报名关闭时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'creator',
                title: '组织员',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'classId',
                title: '班级编码',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 140,
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
