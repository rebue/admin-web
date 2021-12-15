// 成绩归档
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                    >
                    </crud-table>
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
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            'stuType|+1': [
                                '电子商务研究生',
                                '应用数学研究生',
                                '计算机科学研究生',
                                '软件技术研究生',
                                '汉语言文学研究生',
                                '财务管理研究生',
                                '通信工程研究生',
                                '国际经济法研究生',
                                '建筑学研究生',
                                '土木工程研究生',
                                '信息资源管理研究生',
                            ],
                            gradeName: '@pick(["2021"])',
                            remark: '@pick(["允许", "不允许"])',
                            entranceData: '2021-09-01',
                            graduationData: '2024-06-29',
                            gradeFile: '@pick(["是","否"])',
                            desc: '',
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
                dataIndex: 'stuType',
                title: '研究生类型',
            },
            {
                dataIndex: 'gradeName',
                title: '年级名称',
            },
            {
                dataIndex: 'remark',
                title: '允许报名',
            },
            {
                dataIndex: 'entranceData',
                title: '入学时间',
            },
            {
                dataIndex: 'graduationData',
                title: '毕业时间',
            },
            {
                dataIndex: 'gradeFile',
                title: '入学成绩归档',
            },
            {
                dataIndex: 'desc',
                title: '说明',
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 60,
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
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
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
    },
};
</script>
