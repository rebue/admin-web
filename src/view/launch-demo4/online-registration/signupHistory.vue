// 报考历史
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
                            <crud-table
                                ref="crudTable"
                                :query="{ orgId: curOrg.id }"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
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
                                title: '中共广西区委党校',
                                key: '101',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '2',
                        children: [
                            {
                                title: '广西区委党校',
                                key: '201',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '3',
                        children: [
                            {
                                title: '百色市委党校',
                                key: '301',
                            },
                            {
                                title: '广西区委党校',
                                key: '302',
                            },
                            {
                                title: '北海市委党校',
                                key: '303',
                            },
                            {
                                title: '桂林市委党校',
                                key: '304',
                            },
                            {
                                title: '河池市委党校',
                                key: '305',
                            },
                            {
                                title: '贺州市委党校',
                                key: '306',
                            },
                            {
                                title: '来宾市委党校',
                                key: '307',
                            },
                            {
                                title: '柳州市委党校',
                                key: '308',
                            },
                            {
                                title: '梧州市委党校',
                                key: '309',
                            },
                            {
                                title: '玉林市委党校',
                                key: '310',
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
                            grade: '@pick(["2021"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            name: '@cname',
                            sex: '@pick(["男", "女"])',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            birthData: '@date',
                            nativePlace: '@province',
                            culture: '@pick(["本科","大专"])',
                            teachMajor:
                                '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","物流管理","体育教育","物理学","日语"])',
                            gradSchool:
                                '@pick(["钦州学院","玉林师范学院","广西师范大学","广西民族大学","钦州学院","广西大学","中南民族大学","北京邮电大学","广西农业职业技术大学"])',
                            gradData: '2021-06-29',
                            workData: '@date',
                            'diplomaNum|0000000000000001-90000000000000000': 111111111111111,
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

                width: 200,
            },
            {
                dataIndex: 'major',
                title: '专业',

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
                dataIndex: 'teachMajor',
                title: '所学专业',

                width: 150,
            },
            {
                dataIndex: 'gradSchool',
                title: '毕业院校',

                width: 250,
            },
            {
                dataIndex: 'gradData',
                title: '毕业时间',

                width: 150,
            },
            {
                dataIndex: 'workData',
                title: '工作时间',

                width: 150,
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',

                width: 250,
            },
            {
                dataIndex: 'partyData',
                title: '入党时间',

                width: 150,
            },
            {
                dataIndex: 'workPlace',
                title: '工作地点',

                width: 200,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 60,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,
            showOrg: false,
            curOrg: '',
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs['orgTree.platform'];
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
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
