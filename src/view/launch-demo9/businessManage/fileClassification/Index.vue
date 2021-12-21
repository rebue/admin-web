<template>
    <div>
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
            <edit-form ref="editForm" @close="handleEditFormClose" />
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import EditForm from './EditForm';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
        EditForm,
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
                            value1: '@pick(["企业通用分类"])',
                            value2: '@pick(["BFL"])',
                            value3: '@pick(["永久"])',
                            'value4|1-10': 1,
                            value5: '@pick(["档案"])',
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
                title: '档案分类名称',
            },
            {
                dataIndex: 'value2',
                title: '档案分类编码',
            },
            {
                dataIndex: 'value3',
                title: '保管期限',
            },
            {
                dataIndex: 'value4',
                title: '序号',
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '备注',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 110,

                scopedSlots: { customRender: 'action' },
            },
        ];
        const treeData = [
            {
                title: '乐山市委',
                key: '1',
            },
            {
                title: '某某某全宗',
                key: '2',
                children: [
                    {
                        title: '文书档案',
                        key: '2-1',
                    },
                    {
                        title: '基建档案',
                        key: '2-2',
                    },
                    {
                        title: '永中',
                        key: '2-3',
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
                title: '新增分类',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导入',
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
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
        this.editForm = this.$refs.editForm;
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
