// 招生指标
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
            <edit-form ref="editForm" @close="handleEditFormClose" />
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        EditForm,
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
                                key: '302',
                            },
                            {
                                title: '桂林市委党校',
                                key: '302',
                            },
                            {
                                title: '河池市委党校',
                                key: '302',
                            },
                            {
                                title: '贺州市委党校',
                                key: '302',
                            },
                            {
                                title: '来宾市委党校',
                                key: '302',
                            },
                            {
                                title: '柳州市委党校',
                                key: '302',
                            },
                            {
                                title: '梧州市委党校',
                                key: '302',
                            },
                            {
                                title: '玉林市委党校',
                                key: '302',
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
                            teachPointNum: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            majorNum: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            'admissionIndex|40-50': 1,
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
                dataIndex: 'teachPointNum',
                title: '教学点编号',
            },
            {
                dataIndex: 'majorNum',
                title: '专业编号',
            },
            {
                dataIndex: 'admissionIndex',
                title: '录取指标',
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
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 处理添加领域的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑领域的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        handleEditFormClose() {
            // this.refreshTableData();
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
