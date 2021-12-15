// 网上报名配置
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :commands="tableCommands"
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
                    'list|3-10': [
                        {
                            'id|+1': 10000000,
                            'type|+1': [
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
                            gradeName: '2021',
                            remark: '@pick(["允许","不允许"])',
                            startTime: '2021-03-30 23:59:00',
                            endTime: '2021-05-30 23:59:00',
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
                dataIndex: 'type',
                title: '研究生类型',
                width: 200,
            },
            {
                dataIndex: 'gradeName',
                title: '年级名称',
                width: 150,
            },
            {
                dataIndex: 'remark',
                title: '允许报名',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '入学报名开始时间',
                width: 200,
            },
            {
                dataIndex: 'endTime',
                title: '入学报名结束时间',
                width: 200,
            },
            {
                dataIndex: 'desc',
                title: '说明',
                width: 300,
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
                title: '同步配置到报名库',
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
