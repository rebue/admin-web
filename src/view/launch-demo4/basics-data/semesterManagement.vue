// 学期管理
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="3" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="20">
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
                        </a-col>
                    </a-row>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '党校研究生',
                key: 'dxyjs',
                children: [
                    {
                        title: '2021',
                        key: '101',
                    },
                    {
                        title: '2020',
                        key: '102',
                    },
                    {
                        title: '2019',
                        key: '103',
                    },
                    {
                        title: '2018',
                        key: '104',
                    },
                    {
                        title: '2017',
                        key: '105',
                    },
                    {
                        title: '2016',
                        key: '106',
                    },
                ],
            },
            {
                title: '中政大研究生',
                key: 'zzdyjs',
                children: [
                    {
                        title: '2021',
                        key: '201',
                    },
                    {
                        title: '2020',
                        key: '202',
                    },
                    {
                        title: '2019',
                        key: '203',
                    },
                    {
                        title: '2018',
                        key: '204',
                    },
                    {
                        title: '2017',
                        key: '205',
                    },
                    {
                        title: '2016',
                        key: '206',
                    },
                ],
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            semesterName: '@pick(["第一学期", "第二学期", "第三学期", "第四学期", "第五学期"])',
                            semesterAlias:
                                '@pick(["2021年秋季学期", "2021年春季学期","2022年春季学期","2022年秋季学期","2023年春季学期","2023年秋季学期"])',
                            'semesterNum|1-10': 1,
                            startDate: '@date',
                            endDate: '@date',
                            remarks: '@pick(["是","否"])',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
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
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'semesterName',
                title: '学期名称',
                width: 150,
            },
            {
                dataIndex: 'semesterAlias',
                title: '学期别名',
                width: 250,
            },
            {
                dataIndex: 'semesterNum',
                title: '学期编号',
                width: 150,
            },
            {
                dataIndex: 'startDate',
                title: '开始日期',
                width: 150,
            },
            {
                dataIndex: 'endDate',
                title: '结束日期',
                width: 150,
            },
            {
                dataIndex: 'remarks',
                title: '备注',
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];

        return {
            columns,
            showOrg: true,
            realm: {
                id: '1',
            },
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

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
