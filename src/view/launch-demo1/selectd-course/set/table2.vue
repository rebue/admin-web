<template>
    <fragment>
        <crud-table
            ref="crudTable"
            :showKeywords="true"
            :commands="tableCommands"
            :actions="tableActions"
            :columns="columns"
            :api="api"
            :scrollX="600"
            :defaultPagination="true"
            :rowSelection="{}"
        >
        </crud-table>
        <edit-form ref="editForm" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditFormTable2';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
export default {
    name: 'Manager',
    components: {
        CrudTable,
        EditForm,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'course|+1': 100,
                            'term|+1': 202100,
                            'date|': '2021-@date(MM-dd)',
                            time: '@time(hh:mm:ss)',
                            'courseNo|+1': 300,
                            'courseName|+1': [
                                '教学总体布局及其实施',
                                '高效班级学习团队建设',
                                '习近平总书记关于中国共产党历史的重要论述',
                                '《忠诚》一党性救育情景课 （录像救学）',
                                '深刻认识把握坚持以人民为中心的发展思想',
                            ],
                            'teacherNo|+1': 400,
                            teacher: '@cname()',
                            'classroomNo|+1': 500,
                            classroom: '',
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
                dataIndex: 'course',
                title: '排课编号',
                width: 150,
            },
            {
                dataIndex: 'term',
                title: '学期编号',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '日期',
                width: 150,
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 150,
            },
            {
                dataIndex: 'courseNo',
                title: '课程编号',
                width: 150,
            },
            {
                dataIndex: 'courseName',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'teacherNo',
                title: '教师编号',
                width: 150,
            },
            {
                dataIndex: 'teacher',
                title: '教师姓名',
                width: 150,
            },
            {
                dataIndex: 'classroomNo',
                title: '教室编号',
                width: 150,
            },
            {
                dataIndex: 'classroom',
                title: '教室名称',
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
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '添加选修课',
                onClick: this.handleAdd,
            },
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
        this.editForm = this.$refs.editForm;
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
        handleEditFormClose() {
            // this.refreshTableData();
        },
    },
};
</script>
