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
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            updator: '@cname()',
                            updatedTime: '@date(yyyy-MM-dd hh:mm:ss)',
                            course: '习近平总书记关于坚持和完善人民代表大会制度的重要思想(合班)',
                            startTime: '@date(yyyy-MM-dd hh:mm:ss)',
                            student: '@cname()',
                            before: '@pick(["（登记时间）正常","（登记时间）缺勤"])',
                            after: '@pick(["2021-11-8（登记时间）正常","2021-11-8（登记时间）事假"])',
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
