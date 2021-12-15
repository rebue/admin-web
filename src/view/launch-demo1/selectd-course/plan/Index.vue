<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <h4>2021年秋季学期(2021-09-01 至 2021-12-31)学员网上选择选修课</h4>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                    :rowSelection="{}"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'courseName|+1': [
                                '教学总体布局及其实施',
                                '高效班级学习团队建设',
                                '习近平总书记关于中国共产党历史的重要论述',
                                '《忠诚》一党性救育情景课 （录像救学）',
                                '深刻认识把握坚持以人民为中心的发展思想',
                            ],
                            courseType: '@pick(["选修课"])',
                            teacher: '@cname()',
                            startTime: '2021-@integer(10,11)-@date(dd)',
                            length: '@integer(10,60)',
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
        // 初始化数据end
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'courseName',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'courseType',
                title: '课程类型',
                width: 150,
            },
            {
                dataIndex: 'teacher',
                title: '授课老师',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '课程开始时间',
                width: 150,
            },
            {
                dataIndex: 'length',
                title: '课时',
                width: 150,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     scopedSlots: { customRender: 'action' },
            // },
        ];
        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     // icon: 'plus',
            //     title: '添加选修课',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            // {
            //     type: 'a',
            //     title: '取消选修课',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];
        return {
            columns,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
    },
};
</script>
