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
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-30': [
                        {
                            'id|+1': 10000000,
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            // "accountId|1-1000000": 193201,
                            updator: '@cname()',
                            updatedTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            student: '@cname()',
                            startTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            course: '@pick(["锁定", "启用"])',
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list || [
                    {
                        id: 1,
                        // no: 1,
                        updator: 'zzm',
                        updatedTime: '2021-12-01 16:39:00',
                        course: '计算机科学与技术',
                        startTime: '2021-12-04 16:39:00',
                        student: '章三',
                        before: 'xx',
                        after: 'xx',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
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
