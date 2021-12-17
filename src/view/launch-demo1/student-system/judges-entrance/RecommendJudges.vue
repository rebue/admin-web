<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex" :gutter="20">
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :defaultPagination="true"
                            :rowSelection="{}"
                        >
                        </crud-table>
                    </a-col>
                    <a-col :span="6" style="margin-top: 50px;border: 1px solid #ededed;">
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
                    </a-col>
                </a-row>
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
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|20': [
                        {
                            'id|+1': 10000000,
                            name: '@cname',
                            scoringElements: '@pick(["观点新颖", "见解独特","表达严谨缜密"])',
                            startTime: '@date("yyyy-MM-dd HH:mm:ss")',
                            endTime: '2021年秋学期',
                            'phone|11': '@character("number")',
                            status: '@pick(["正在进行", "未开始","已结束"])',
                            examine: '@pick(["审核通过", "审核未通过"])',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });

            return p;
        };

        this.api = {
            page,
            listAll: page,
            list: page,
        };
        const columns = [
            {
                dataIndex: 'name',
                title: '学员',
                width: 100,
            },
            {
                dataIndex: 'scoringElements',
                title: '评分要素',
                width: 250,
            },
            {
                dataIndex: 'phone',
                title: '电话号码',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '评比期',
                width: 200,
                ellipsis: true,
            },
            {
                dataIndex: 'examine',
                title: '审核',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,

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
