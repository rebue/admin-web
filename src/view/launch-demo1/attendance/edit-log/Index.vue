<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
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
            {
                dataIndex: 'no',
                title: '序号',
                width: 150,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'updator',
                title: '修改人',
                width: 150,
            },
            {
                dataIndex: 'updatedTime',
                title: '修改时间',
                width: 150,
            },
            {
                dataIndex: 'course',
                title: '哪门课',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: ' 上课时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'student',
                title: '哪位学员',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'before',
                title: '修改前',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'after',
                title: '修改后',
                width: 150,
                ellipsis: true,
            },
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
<style lang="less" scoped>
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
