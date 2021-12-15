// 毕业证管理
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="4" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="19">
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
                        key: '1',
                        children: [
                            {
                                title: '公共管理',
                                key: '101',
                            },
                            {
                                title: '工商企业管理',
                                key: '102',
                            },
                            {
                                title: '经济管理',
                                key: '103',
                            },
                            {
                                title: '政治学',
                                key: '104',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '2',
                        children: [
                            {
                                title: '公共管理',
                                key: '201',
                            },
                            {
                                title: '工商企业管理',
                                key: '202',
                            },
                            {
                                title: '经济管理',
                                key: '203',
                            },
                            {
                                title: '政治学',
                                key: '204',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '3',
                        children: [
                            {
                                title: '公共管理',
                                key: '301',
                            },
                            {
                                title: '工商企业管理',
                                key: '302',
                            },
                            {
                                title: '经济管理',
                                key: '303',
                            },
                            {
                                title: '政治学',
                                key: '304',
                            },
                        ],
                    },
                    {
                        title: '2018',
                        key: '4',
                        children: [
                            {
                                title: '公共管理',
                                key: '401',
                            },
                            {
                                title: '工商企业管理',
                                key: '402',
                            },
                            {
                                title: '经济管理',
                                key: '403',
                            },
                            {
                                title: '政治学',
                                key: '404',
                            },
                        ],
                    },
                    {
                        title: '2017',
                        key: '5',
                        children: [
                            {
                                title: '公共管理',
                                key: '501',
                            },
                            {
                                title: '工商企业管理',
                                key: '502',
                            },
                            {
                                title: '经济管理',
                                key: '503',
                            },
                            {
                                title: '政治学',
                                key: '504',
                            },
                        ],
                    },
                    {
                        title: '2016',
                        key: '6',
                        children: [
                            {
                                title: '公共管理',
                                key: '601',
                            },
                            {
                                title: '工商企业管理',
                                key: '602',
                            },
                            {
                                title: '经济管理',
                                key: '603',
                            },
                            {
                                title: '政治学',
                                key: '604',
                            },
                        ],
                    },
                ],
            },
            {
                title: '中政大研究生',
                key: 'zzdyjs',
                children: [
                    {
                        title: '2021',
                        key: '7',
                        children: [
                            {
                                title: '公共管理',
                                key: '701',
                            },
                            {
                                title: '工商企业管理',
                                key: '702',
                            },
                            {
                                title: '经济管理',
                                key: '703',
                            },
                            {
                                title: '政治学',
                                key: '704',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '8',
                        children: [
                            {
                                title: '公共管理',
                                key: '801',
                            },
                            {
                                title: '工商企业管理',
                                key: '802',
                            },
                            {
                                title: '经济管理',
                                key: '803',
                            },
                            {
                                title: '政治学',
                                key: '804',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '9',
                        children: [
                            {
                                title: '公共管理',
                                key: '901',
                            },
                            {
                                title: '工商企业管理',
                                key: '902',
                            },
                            {
                                title: '经济管理',
                                key: '903',
                            },
                            {
                                title: '政治学',
                                key: '904',
                            },
                        ],
                    },
                    {
                        title: '2018',
                        key: '10',
                    },
                    {
                        title: '2017',
                        key: '11',
                    },
                    {
                        title: '2016',
                        key: '12',
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
                            'stuNum|100000000-200000000': 111111111,
                            name: '@cname',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            grade: '@pick(["2021"])',
                            sex: '@pick(["男","女"])',
                            'birthDate|+1': [
                                '1998-3-15',
                                '1999-5-23',
                                '1998-7-13',
                                '2000-4-26',
                                '1999-1-05',
                                '1999-7-24',
                                '2000-2-18',
                                '2000-5-02',
                                '1999-8-15',
                                '1999-10-02',
                                '2000-12-15',
                            ],
                            'shift|+1': [
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
                            'diplomaNum|1000000000-9999999999': 1111111111,
                            graduationYear: '2024',
                            fileRoute: '/data/nfs/student/images2021/1112352.jpg',
                            isGraduation: '@pick(["是","否"])',
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
                dataIndex: 'stuNum',
                title: '学号',

                width: 150,
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
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',

                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '生日',

                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',

                width: 150,
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',

                width: 150,
            },
            {
                dataIndex: 'graduationYear',
                title: '毕业年份',

                width: 150,
            },
            {
                dataIndex: 'fileRoute',
                title: '文件路径',

                width: 350,
            },
            {
                dataIndex: 'isGraduation',
                title: '毕业否',

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
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '生成2018级前毕业证',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
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
