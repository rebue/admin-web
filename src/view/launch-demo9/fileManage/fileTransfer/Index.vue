<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                    :showKeywords="false"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|20': [
                        {
                            value1: '@pick(["党务工作（01）"])',
                            value2: '@pick(["永久（Y）"])',
                            value3: '@pick(["公开（GK）"])',
                            value4: '@pick(["06（党群工作部）"])',
                            'value5|1-10': 1,
                            'value6|1-20': 1,
                            value7:
                                '@pick(["关于档案教学化建设项目须知","档案宣传语","关于档案学习宣传月各单位执行通知"])',
                            value8: '-',
                            value9: '1',
                            value10: '党群工作部',
                            value11: '2020',
                            // value5: '@pick(["人力资源部"])',
                            // 'value6|1-100000': 1,
                            // value7: '@pick(["档案"])',
                            // value8: '@pick(["档案"])',
                            // value9: '@date("yyyy-MM-dd")',
                            // value10: '@pick(["档案"])',
                            // value11: '@date("yyyy-MM-dd")',
                            // value12: '@date("yyyy-MM-dd")',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
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
                dataIndex: 'value1',
                title: '分类号',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '保管期限',
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '密级',
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '归档部门',
                width: 150,
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '在库份数',
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '提名',
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '档号',
                width: 250,
            },
            {
                dataIndex: 'value8',
                title: '页数',
                width: 150,
            },
            {
                dataIndex: 'value9',
                title: '全宗号',
                width: 150,
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '责任者',
                width: 150,
            },
            {
                dataIndex: 'value11',
                title: '年度',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                scopedSlots: { customRender: 'action' },
            },
        ];
        const treeData = [
            {
                title: '某某某全宗',
                key: '20211',
                children: [
                    {
                        title: '文书档案（2020年）',
                        key: '20211-1',
                        children: [
                            {
                                title: '【2020】文书档案项目',
                                key: '20211-1-1',
                            },
                        ],
                    },
                    {
                        title: '基建档案（2020年）',
                        key: '20211-2',
                        children: [
                            {
                                title: '【2020】基建档案项目',
                                key: '20211-2-1',
                            },
                        ],
                    },
                    {
                        title: '文书档案',
                        key: '20211-3',
                        children: [
                            {
                                title: '【2020】2020年',
                                key: '20211-3-1',
                            },
                        ],
                    },
                ],
            },
        ];
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '自动组合',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '加入已有盒',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '目录打印',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '清楚档号',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '组建',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '复制',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '粘贴',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '提交',
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
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: true,
            treeData,
        };
    },
    mounted() {
        //
    },
    methods: {
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /**
         * 处理添加应用的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除应用的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api
                .delById(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 处理应用菜单的事件
         */
        handleMenus(record) {
            this.curApp = record;
            this.manageMenusFormVisible = true;
        },
        handleEditFormClose() {
            this.refreshTableData();
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
    .ant-card-body {
        width: 200px;
        overflow: auto;
        padding: 0;
    }
}
</style>
