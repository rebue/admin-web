<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
                    <template #left>
                        <div
                            style="height: 100%;width: 200px;margin-top: 50px;border: 1px solid #000;margin-right: 10px; border-bottom:none; "
                        >
                            <div style="height: 20px;background-color: #e8e8e8">
                                <center>
                                    <div style="margin: 0 auto;">
                                        系统帮助
                                    </div>
                                </center>
                                <span>
                                    请点击评分要素列中的单元格，设置评委的评分要素
                                    <br />
                                    本次评比请推荐5个评委
                                    <br />
                                    推荐在“观点新颖、有独特的的见解’ 此项安排俩名评委
                                </span>
                            </div>
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
    name: 'RecommendJudges',
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
                title: '学员',
                width: 100,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '评分要素',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'startTime',
                title: '电话号码',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '评比期',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupCode',
                title: '审核',
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
                title: '添加',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '删除',
                onClick: () => {
                    /**/
                },
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
