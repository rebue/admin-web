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
        <edit-form ref="editForm" @close="handleEditFormClose" />
    </fragment>
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
                // 数据列表在这里设置
                const dataSource = [
                    {
                        value1: '2021-10-12',
                        value2: '一',
                        value3: '上午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-12',
                        value2: '一',
                        value3: '下午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-13',
                        value2: '二',
                        value3: '上午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-13',
                        value2: '二',
                        value3: '下午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-14',
                        value2: '三',
                        value3: '上午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-14',
                        value2: '三',
                        value3: '下午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-15',
                        value2: '四',
                        value3: '上午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-15',
                        value2: '四',
                        value3: '下午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-16',
                        value2: '五',
                        value3: '上午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                    {
                        value1: '2021-10-16',
                        value2: '五',
                        value3: '下午',
                        value4: '报到',
                        value5: '学员工作处',
                        value6: '至诚院服务台',
                        value7: '',
                    },
                ];
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
                title: '日期',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '星期',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '午别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '教学内容',
                width: 150,
            },
            {
                dataIndex: 'value5',
                title: '授课人',
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '地点',
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '主持人',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 100,

                scopedSlots: { customRender: 'action' },
            },
        ];
        const treeData = [
            {
                title: '2021年秋季学期',
                key: '20183',
                children: [
                    {
                        title: '市领导授课专题',
                        key: '20183-1',
                    },
                    {
                        title: '外聘专家教授授课专题',
                        key: '20183-2',
                    },
                    {
                        title: '本校教师授课专题',
                        key: '20183-3',
                    },
                ],
            },
            {
                title: '2020年秋季学期',
                key: '20184',
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
        this.crudTable = this.$refs.crudTable;
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
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
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
}
</style>
