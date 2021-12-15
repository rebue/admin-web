<template>
    <fragment>
        <crud-table
            ref="crudTable"
            :showKeywords="false"
            :columns="columns"
            :api="api"
            :scrollX="600"
            :defaultPagination="true"
            :rowSelection="{}"
        />
    </fragment>
</template>

<script>
import CrudTable from '@/component/rebue/CrudTable.vue';
export default {
    name: 'Manager',
    components: {
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'date|': '2021-@integer(10,11)-@date(dd)',
                            'courseName|+1': [
                                '教学总体布局及其实施',
                                '高效班级学习团队建设',
                                '习近平总书记关于中国共产党历史的重要论述',
                                '《忠诚》一党性救育情景课 （录像救学）',
                                '深刻认识把握坚持以人民为中心的发展思想',
                            ],
                            teacher: '@cname()',
                            total: '@integer(20,80)',
                            members: '',
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
            // {
            //     dataIndex: 'no',
            //     title: '序号',
            //     width: 150,
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'date',
                title: '上课日期',
                width: 100,
            },
            {
                dataIndex: 'courseName',
                title: '选修课名称',
                width: 100,
            },
            {
                dataIndex: 'teacher',
                title: '任课教师',
                width: 100,
            },
            {
                dataIndex: 'total',
                title: '选课人数',
                width: 100,
            },
            {
                dataIndex: 'members',
                title: '学员详细',
                width: 100,
            },
        ];

        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
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
<style lang="less" scoped>
.btn {
    margin-right: 10px;
}
</style>
