//成绩计算设置页面二
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
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            semester: '@pick(["第一学期","第二学期","第三学期","第四学期"])',
                            curriculumName:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            examForm: '@pick(["闭卷","开卷","论文"])',
                            checkProportion: '10%',
                            taskProportion: '30%',
                            surfaceProportion: '60%',
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
                dataIndex: 'major',
                title: '专业',
                width: 150,
            },
            {
                dataIndex: 'semester',
                title: '学期',
                width: 150,
            },
            {
                dataIndex: 'curriculumName',
                title: '课程名称',
                width: 250,
            },
            {
                dataIndex: 'examForm',
                title: '考核形式',
                width: 150,
            },
            {
                dataIndex: 'checkProportion',
                title: '考勤比例',
                width: 150,
            },
            {
                dataIndex: 'taskProportion',
                title: '作业比例',
                width: 150,
            },
            {
                dataIndex: 'surfaceProportion',
                title: '卷面比例',
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
                title: '计算',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '发布课程成绩',
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
