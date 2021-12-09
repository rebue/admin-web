// 各科成绩
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="马克思主义基础理论研究(科学社会主义)"></a-tab-pane>
                    <a-tab-pane :key="2" tab="马克思主义基础理论研究(哲学经济学)"></a-tab-pane>
                    <a-tab-pane :key="3" tab="录入不同"></a-tab-pane>
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
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '101-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '101-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '101-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '101-4',
                                    },
                                ],
                            },
                            {
                                title: '第二学期',
                                key: '102',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '102-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '102-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '102-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '102-4',
                                    },
                                ],
                            },
                            {
                                title: '第三学期',
                                key: '103',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '103-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '103-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '103-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '103-4',
                                    },
                                ],
                            },
                            {
                                title: '第四学期',
                                key: '104',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '104-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '104-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '104-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '104-4',
                                    },
                                ],
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
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '201-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '201-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '201-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '201-4',
                                    },
                                ],
                            },
                            {
                                title: '第二学期',
                                key: '202',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '202-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '202-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '202-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '202-4',
                                    },
                                ],
                            },
                            {
                                title: '第三学期',
                                key: '203',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '203-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '203-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '203-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '203-4',
                                    },
                                ],
                            },
                            {
                                title: '第四学期',
                                key: '204',
                                children: [
                                    {
                                        title: '公共管理',
                                        key: '204-1',
                                    },
                                    {
                                        title: '经济管理',
                                        key: '204-2',
                                    },
                                    {
                                        title: '马克思主义中国化研究',
                                        key: '204-3',
                                    },
                                    {
                                        title: '中共党史与党的建设',
                                        key: '204-4',
                                    },
                                ],
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
                            'stuNum|100000000-200000000': 111111111,
                            'achievement1|30-50': 30,
                            'achievement2|30-50': 30,
                            'homeworkScore|10-20': 20,
                            'attendanceScore|0-10': 0,
                            'subjectAchievement|70-100': 75,
                            'makeUpExamAchievement|75-100': 100,
                            'allMakeUpExamAchievement|100-150': 100,
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
                dataIndex: 'stuNum',
                title: '学号',

                width: 150,
            },
            {
                dataIndex: 'achievement1',
                title: '卷面成绩1',

                width: 150,
            },
            {
                dataIndex: 'achievement2',
                title: '卷面成绩2',

                width: 150,
            },
            {
                dataIndex: 'homeworkScore',
                title: '作业分数',

                width: 150,
            },
            {
                dataIndex: 'attendanceScore',
                title: '考勤分数',

                width: 150,
            },
            {
                dataIndex: 'subjectAchievement',
                title: '科目成绩',

                width: 150,
            },
            {
                dataIndex: 'makeUpExamAchievement',
                title: '补考成绩',

                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement',
                title: '总补考成绩',

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
        onChange(e) {
            console.log(`checked = ${e.target.checked}`);
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
