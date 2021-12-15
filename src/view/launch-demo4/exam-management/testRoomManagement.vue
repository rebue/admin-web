// 考场管理
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
                            examRoomAddress:
                                '@pick(["崇信园一楼研讨室", "教学中心201教室", "教学中心202教室", "教学中心203教室", "教学中心204教室", "教学中心205教室", "教学中心206教室"])',
                            'examRoomNum|1-20': 1,
                            'examRoomPeople|25-40': 25,
                            'layoutPeople|25-40': 30,
                            examPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
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
                dataIndex: 'examRoomAddress',
                title: '考场地址',

                width: 150,
            },
            {
                dataIndex: 'examRoomNum',
                title: '考场编号',

                width: 150,
            },
            {
                dataIndex: 'examRoomPeople',
                title: '考场人数',

                width: 150,
            },
            {
                dataIndex: 'layoutPeople',
                title: '实际编排人数',

                width: 150,
            },
            {
                dataIndex: 'examPoint',
                title: '考点',

                width: 250,
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
            {
                buttonType: 'primary',
                title: '复制',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '粘贴',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '实际人数',
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
