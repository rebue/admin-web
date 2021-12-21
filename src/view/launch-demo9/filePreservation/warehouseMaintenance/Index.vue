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
                            value1: '@pick(["1区","2区","3区"])',
                            'value2|1-2': 1,
                            'value3|1-2': 1,
                            'value4|+1': 1,
                            value5: '@pick(["no1","no2","no3"])',
                            'value6|1-10': 1,
                            'value7|1-10': 1,
                            'value8|1-1000': 1,
                            'value9|1-10': 1,
                            'value10|1-1000': 1,
                            value11: '',
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
                title: '所属区域',
                width: 100,
            },
            {
                dataIndex: 'value2',
                title: '密集架类型',
                width: 120,
            },
            {
                dataIndex: 'value3',
                title: '单双面选择',
                width: 120,
            },
            {
                dataIndex: 'value4',
                title: '列编号',
                width: 100,
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '列名称',
                width: 100,
            },
            {
                dataIndex: 'value6',
                title: '密集架类型',
                width: 120,
            },
            {
                dataIndex: 'value7',
                title: '节数',
                width: 100,
            },
            {
                dataIndex: 'value8',
                title: '节长度',
                width: 100,
            },
            {
                dataIndex: 'value9',
                title: '层数',
                width: 100,
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '层高',
                width: 100,
            },
            {
                dataIndex: 'value11',
                title: '备注',
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
                title: '全宗',
                key: '20211',
                children: [
                    {
                        title: '档案库',
                        key: '20211-1',
                        children: [
                            {
                                title: '库房内区域',
                                key: '20211-1-1',
                                children: [
                                    {
                                        title: '密集架列no1',
                                        key: '20211-1-1-1',
                                        children: [
                                            {
                                                title: 'A面',
                                                key: '20211-1-1-1-1',
                                            },
                                            {
                                                title: 'B面',
                                                key: '20211-1-1-1-2',
                                            },
                                        ],
                                    },
                                    {
                                        title: '密集架列no2',
                                        key: '20211-1-1-2',
                                    },
                                    {
                                        title: '密集架列no3',
                                        key: '20211-1-1-3',
                                    },
                                ],
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
                title: '批量增加',
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '原信息维护',
                onClick: record => this.handleEdit(record),
            },
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
