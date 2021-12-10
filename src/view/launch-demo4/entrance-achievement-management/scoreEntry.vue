// 成绩录入
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs>
                        <a-tab-pane :key="1" tab="目录1"></a-tab-pane>
                        <a-tab-pane :key="2" tab="目录2"></a-tab-pane>
                        <a-tab-pane :key="3" tab="目录3"></a-tab-pane>
                    </a-tabs>
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
                            name: '@cname',
                            'admissionTicketNum|1000000000-9999999999': 1111111111,
                            'firstFraction|40-100': 1,
                            'secondFraction|40-100': 1,
                            totalScore: function() {
                                return this.firstFraction + this.secondFraction;
                            },
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
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                width: 150,
            },
            {
                dataIndex: 'firstFraction',
                title: '一次录入分数',
                width: 150,
            },
            {
                dataIndex: 'secondFraction',
                title: '二次录入分数',
                width: 150,
            },
            {
                dataIndex: 'totalScore',
                title: '总分',
                width: 150,
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
                title: '编辑未录入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '编辑全部',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清空成绩',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '提交成绩',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清除0分',
                onClick: this.handleAdd,
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
