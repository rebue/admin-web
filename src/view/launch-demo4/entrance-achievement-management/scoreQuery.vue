// 成绩查询
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div style="float:left;margin-top:4px">
                    <a-input placeholder="姓名" style="width:200px;margin-right:20px" />
                    <a-input placeholder="准考证号" style="width:200px;margin-right:20px" />
                </div>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
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
                            'admissionTicketNum|1000000000-9999999999': 1111111111,
                            name: '@cname',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            subject01:
                                '@pick(["政治理论","马克思主义基础理论","马克思主义政治经济学原理","时长经济理论","现代管理学","国民经济管理"])',
                            'achievement01|0-100': 1,
                            subject02:
                                '@pick(["政治理论","马克思主义基础理论","马克思主义政治经济学原理","时长经济理论","现代管理学","国民经济管理"])',
                            'achievement02|0-100': 1,
                            subject03:
                                '@pick(["政治理论","马克思主义基础理论","马克思主义政治经济学原理","时长经济理论","现代管理学","国民经济管理"])',
                            'achievement03|0-100': 1,
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
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                width: 250,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',
                width: 150,
            },
            {
                dataIndex: 'subject01',
                title: '科目一',
                width: 250,
            },
            {
                dataIndex: 'achievement01',
                title: '成绩',
                width: 150,
            },
            {
                dataIndex: 'subject02',
                title: '科目二',
                width: 250,
            },
            {
                dataIndex: 'achievement02',
                title: '成绩',
                width: 150,
            },
            {
                dataIndex: 'subject03',
                title: '科目三',
                width: 250,
            },
            {
                dataIndex: 'achievement03',
                title: '成绩',
                width: 150,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '查询',
                onClick: this.handleAdd,
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
