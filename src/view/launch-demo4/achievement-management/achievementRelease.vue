// 成绩发布
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs>
                        <a-tab-pane :key="1" tab="平时成绩"></a-tab-pane>
                        <a-tab-pane :key="2" tab="卷面成绩"></a-tab-pane>
                        <a-tab-pane :key="3" tab="补考成绩"></a-tab-pane>
                        <a-tab-pane :key="4" tab="总补考成绩"></a-tab-pane>
                        <a-tab-pane :key="5" tab="课程成绩"></a-tab-pane>
                        <a-tab-pane :key="6" tab="综合成绩"></a-tab-pane>
                    </a-tabs>
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
                                title: '第一学期',
                                key: '101',
                            },
                            {
                                title: '第二学期',
                                key: '102',
                            },
                            {
                                title: '第三学期',
                                key: '103',
                            },
                            {
                                title: '第四学期',
                                key: '104',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '2',
                        children: [
                            {
                                title: '第一学期',
                                key: '201',
                            },
                            {
                                title: '第二学期',
                                key: '202',
                            },
                            {
                                title: '第三学期',
                                key: '203',
                            },
                            {
                                title: '第四学期',
                                key: '204',
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
                        key: '3',
                        children: [
                            {
                                title: '第一学期',
                                key: '301',
                            },
                            {
                                title: '第二学期',
                                key: '302',
                            },
                            {
                                title: '第三学期',
                                key: '303',
                            },
                            {
                                title: '第四学期',
                                key: '304',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '4',
                        children: [
                            {
                                title: '第一学期',
                                key: '401',
                            },
                            {
                                title: '第二学期',
                                key: '402',
                            },
                            {
                                title: '第三学期',
                                key: '403',
                            },
                            {
                                title: '第四学期',
                                key: '404',
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
                            teachPoint: '@pick(["中国政法大学","广西区委党校"])',
                            achievementType: '平时成绩',
                            achievementState: '@pick(["已提交","未提交"])',
                            submitter: '@cname',
                            curriculum:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            inputType: '',
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
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 150,
            },
            {
                dataIndex: 'achievementType',
                title: '成绩类型',
                width: 150,
            },
            {
                dataIndex: 'achievementState',
                title: '成绩状态',
                width: 150,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                width: 150,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',
                width: 250,
            },
            {
                dataIndex: 'inputType',
                title: '录入类型',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '删除',
                onClick: record => this.handleEdit(record),
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
