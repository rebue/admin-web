// 报名录入
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow:auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height:100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
                            <crud-table
                                ref="crudTable"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
                            ></crud-table>
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
                        key: '20211',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '20211-1',
                            },
                            {
                                title: '中共党史与党的建设',
                                key: '20211-2',
                            },
                            {
                                title: '经济管理',
                                key: '20211-3',
                            },
                            {
                                title: '马克思主义中国化研究',
                                key: '20211-4',
                            },
                            {
                                title: '宪法与行政法',
                                key: '20211-5',
                            },
                            {
                                title: '公共管理',
                                key: '20211-6',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '20201',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '20201-1',
                            },
                            {
                                title: '中共党史与党的建设',
                                key: '20201-2',
                            },
                            {
                                title: '经济管理',
                                key: '20201-3',
                            },
                            {
                                title: '马克思主义中国化研究',
                                key: '20201-4',
                            },
                            {
                                title: '宪法与行政法',
                                key: '20201-5',
                            },
                            {
                                title: '公共管理',
                                key: '20201-6',
                            },
                        ],
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
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            'number|1-100': 1,
                            name: '@cname',
                            sex: '@pick(["男","女"])',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            birthData: '@date',
                            nativePlace: '@province',
                            culture: '@pick(["本科","大专"])',
                            majorStudied: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            gradSchool:
                                '@pick(["桂林电子科技大学","广西民族大学","广西师范大学","广西农业职业技术大学","北京大学","南昌理工大学","清华大学"])',
                            gradTime: '@date',
                            workTime: '@date',
                            'diplomaNum|100000000000-1000000000000': 100000000000,
                            political: '@pick(["群众","共青团员","中共党员"])',
                            partyData: '@date',
                            workPlace: '@city',
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
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',

                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',

                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',

                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',

                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',

                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',

                width: 250,
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',

                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',

                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',

                width: 150,
            },
            {
                dataIndex: 'majorStudied',
                title: '所学专业',

                width: 150,
            },
            {
                dataIndex: 'gradSchool',
                title: '毕业院校',

                width: 250,
            },
            {
                dataIndex: 'gradTime',
                title: '毕业时间',

                width: 150,
            },
            {
                dataIndex: 'workTime',
                title: '工作时间',

                width: 150,
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',

                width: 150,
            },
            {
                dataIndex: 'political',
                title: '政治面貌',

                width: 150,
            },
            {
                dataIndex: 'partyData',
                title: '入党时间',

                width: 150,
            },
            {
                dataIndex: 'workPlace',
                title: '工作所在地',

                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新增',
                //onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
                //onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                //onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '查看',
                //onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                //onClick: record => this.handleDel(record),
            },
        ];

        return {
            columns,
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
        //
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
