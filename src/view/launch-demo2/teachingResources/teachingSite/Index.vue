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
                    :query="{ orgId: curOrgId }"
                >
                    <template #keywordsLeft>
                        <label style="width: 100px; line-height: 30px; text-align: right;">选择学期：</label>
                        <a-select default-value="2021" style="width: 120px" @change="handleChange">
                            <a-select-option value="2021">
                                2021
                            </a-select-option>
                            <a-select-option value="2020">
                                2020
                            </a-select-option>
                        </a-select>
                    </template>
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
// import OrgTree from '../../../rac/rac-org/Tree.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
        // OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            value1: '@pick(["101教室","102教室","103教室","104教室"])',
                            value2: '@pick(["建筑物"])',
                            'value3|1-10': 10,
                            'value4|1-1000': 1000,
                            'value5|1-10000000000': 10000000000,
                            value6: '10.141.163.220',
                            value7: '',
                            value8: '',
                            value9: '',
                            value10: '',
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
                title: '场地名称',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '场地类型',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '楼号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '房号',
                width: 150,
            },
            {
                dataIndex: 'value5',
                title: '电话',
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '设备',
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '位置',
                width: 150,
            },
            {
                dataIndex: 'value8',
                title: '面积',
                width: 150,
            },
            {
                dataIndex: 'value9',
                title: '管理员',
                width: 150,
            },
            {
                dataIndex: 'value10',
                title: '座位',
                width: 150,
            },
            {
                dataIndex: 'value11',
                title: '顺序',
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
                title: '教室',
                key: '20181',
                children: [
                    {
                        title: '101教室',
                        key: '20181-1',
                    },
                    {
                        title: '102教室',
                        key: '20181-2',
                    },
                    {
                        title: '103教室',
                        key: '20181-3',
                    },
                    {
                        title: '104教室',
                        key: '20181-4',
                    },
                    {
                        title: '105教室',
                        key: '20181-5',
                    },
                    {
                        title: '106教室',
                        key: '20181-6',
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
            curOrgId: undefined,
            treeData,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        handleChange() {
            //
        },
        refreshData() {
            this.loading = true;
            // racRealmApi
            //     .listAll()
            //     .then(ro => {
            //         this.realms = ro.extra.list;
            //         this.curRealmId = this.realms[0].id;
            //     })
            //     .finally(() => (this.loading = false));
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
