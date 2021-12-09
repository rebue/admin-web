// 课程信息
<template>
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
                title: '2021',
                key: '1',
                children: [
                    {
                        title: '中共党史与党的建设',
                        key: '101',
                        children: [
                            {
                                title: '第一学期',
                                key: '101-1',
                            },
                            {
                                title: '第二学期',
                                key: '101-2',
                            },
                            {
                                title: '第三学期',
                                key: '101-3',
                            },
                            {
                                title: '第四学期',
                                key: '101-4',
                            },
                            {
                                title: '第五学期',
                                key: '101-5',
                            },
                        ],
                    },
                    {
                        title: '经济管理',
                        key: '102',
                        children: [
                            {
                                title: '第一学期',
                                key: '102-1',
                            },
                            {
                                title: '第二学期',
                                key: '102-2',
                            },
                            {
                                title: '第三学期',
                                key: '102-3',
                            },
                            {
                                title: '第四学期',
                                key: '102-4',
                            },
                            {
                                title: '第五学期',
                                key: '102-5',
                            },
                        ],
                    },
                    {
                        title: '马克思主义中国化研究',
                        key: '103',
                        children: [
                            {
                                title: '第一学期',
                                key: '103-1',
                            },
                            {
                                title: '第二学期',
                                key: '103-2',
                            },
                            {
                                title: '第三学期',
                                key: '103-3',
                            },
                            {
                                title: '第四学期',
                                key: '103-4',
                            },
                            {
                                title: '第五学期',
                                key: '103-5',
                            },
                        ],
                    },
                    {
                        title: '宪法与行政法',
                        key: '104',
                        children: [
                            {
                                title: '第一学期',
                                key: '104-1',
                            },
                            {
                                title: '第二学期',
                                key: '104-2',
                            },
                            {
                                title: '第三学期',
                                key: '104-3',
                            },
                            {
                                title: '第四学期',
                                key: '104-4',
                            },
                            {
                                title: '第五学期',
                                key: '104-5',
                            },
                        ],
                    },
                    {
                        title: '公共管理',
                        key: '105',
                        children: [
                            {
                                title: '第一学期',
                                key: '105-1',
                            },
                            {
                                title: '第二学期',
                                key: '105-2',
                            },
                            {
                                title: '第三学期',
                                key: '105-3',
                            },
                            {
                                title: '第四学期',
                                key: '105-4',
                            },
                            {
                                title: '第五学期',
                                key: '105-5',
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
                        title: '中共党史与党的建设',
                        key: '201',
                        children: [
                            {
                                title: '第一学期',
                                key: '201-1',
                            },
                            {
                                title: '第二学期',
                                key: '201-2',
                            },
                            {
                                title: '第三学期',
                                key: '201-3',
                            },
                            {
                                title: '第四学期',
                                key: '201-4',
                            },
                            {
                                title: '第五学期',
                                key: '201-5',
                            },
                        ],
                    },
                    {
                        title: '经济管理',
                        key: '202',
                        children: [
                            {
                                title: '第一学期',
                                key: '202-1',
                            },
                            {
                                title: '第二学期',
                                key: '202-2',
                            },
                            {
                                title: '第三学期',
                                key: '202-3',
                            },
                            {
                                title: '第四学期',
                                key: '202-4',
                            },
                            {
                                title: '第五学期',
                                key: '202-5',
                            },
                        ],
                    },
                    {
                        title: '马克思主义中国化研究',
                        key: '203',
                        children: [
                            {
                                title: '第一学期',
                                key: '203-1',
                            },
                            {
                                title: '第二学期',
                                key: '203-2',
                            },
                            {
                                title: '第三学期',
                                key: '203-3',
                            },
                            {
                                title: '第四学期',
                                key: '203-4',
                            },
                            {
                                title: '第五学期',
                                key: '203-5',
                            },
                        ],
                    },
                    {
                        title: '宪法与行政法',
                        key: '204',
                        children: [
                            {
                                title: '第一学期',
                                key: '204-1',
                            },
                            {
                                title: '第二学期',
                                key: '204-2',
                            },
                            {
                                title: '第三学期',
                                key: '204-3',
                            },
                            {
                                title: '第四学期',
                                key: '204-4',
                            },
                            {
                                title: '第五学期',
                                key: '204-5',
                            },
                        ],
                    },
                    {
                        title: '公共管理',
                        key: '205',
                        children: [
                            {
                                title: '第一学期',
                                key: '205-1',
                            },
                            {
                                title: '第二学期',
                                key: '205-2',
                            },
                            {
                                title: '第三学期',
                                key: '205-3',
                            },
                            {
                                title: '第四学期',
                                key: '205-4',
                            },
                            {
                                title: '第五学期',
                                key: '205-5',
                            },
                        ],
                    },
                ],
            },
            {
                title: '2019',
                key: '3',
                children: [
                    {
                        title: '中共党史与党的建设',
                        key: '301',
                        children: [
                            {
                                title: '第一学期',
                                key: '301-1',
                            },
                            {
                                title: '第二学期',
                                key: '301-2',
                            },
                            {
                                title: '第三学期',
                                key: '301-3',
                            },
                            {
                                title: '第四学期',
                                key: '301-4',
                            },
                            {
                                title: '第五学期',
                                key: '301-5',
                            },
                        ],
                    },
                    {
                        title: '经济管理',
                        key: '302',
                        children: [
                            {
                                title: '第一学期',
                                key: '302-1',
                            },
                            {
                                title: '第二学期',
                                key: '302-2',
                            },
                            {
                                title: '第三学期',
                                key: '302-3',
                            },
                            {
                                title: '第四学期',
                                key: '302-4',
                            },
                            {
                                title: '第五学期',
                                key: '302-5',
                            },
                        ],
                    },
                    {
                        title: '马克思主义中国化研究',
                        key: '303',
                        children: [
                            {
                                title: '第一学期',
                                key: '303-1',
                            },
                            {
                                title: '第二学期',
                                key: '303-2',
                            },
                            {
                                title: '第三学期',
                                key: '303-3',
                            },
                            {
                                title: '第四学期',
                                key: '303-4',
                            },
                            {
                                title: '第五学期',
                                key: '303-5',
                            },
                        ],
                    },
                    {
                        title: '宪法与行政法',
                        key: '304',
                        children: [
                            {
                                title: '第一学期',
                                key: '304-1',
                            },
                            {
                                title: '第二学期',
                                key: '304-2',
                            },
                            {
                                title: '第三学期',
                                key: '304-3',
                            },
                            {
                                title: '第四学期',
                                key: '304-4',
                            },
                            {
                                title: '第五学期',
                                key: '304-5',
                            },
                        ],
                    },
                    {
                        title: '公共管理',
                        key: '305',
                        children: [
                            {
                                title: '第一学期',
                                key: '305-1',
                            },
                            {
                                title: '第二学期',
                                key: '305-2',
                            },
                            {
                                title: '第三学期',
                                key: '305-3',
                            },
                            {
                                title: '第四学期',
                                key: '305-4',
                            },
                            {
                                title: '第五学期',
                                key: '305-5',
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
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            semester: '@pick(["第一学期","第二学期","第三学期","第四学期"])',
                            curriculumName:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            examForm: '@pick(["闭卷","开卷"])',
                            remarks: '@cname',
                            printLabel: '@pick(["打印",""])',
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
                dataIndex: 'remarks',
                title: '备注',
                width: 150,
            },
            {
                dataIndex: 'printLabel',
                title: '打印座位标签',
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
                title: '导入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导入模板',
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
