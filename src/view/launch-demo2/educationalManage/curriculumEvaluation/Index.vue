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
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            value1: '2021-@date("MM-dd")',
                            value2: '@pick(["一", "二", "三", "四", "五"])',
                            value3: '@pick(["上午","下午"])',
                            'value4|+1': [
                                '传承和弘扬英家革命老区精神',
                                '体验式教学主题: “不忘初心，牢记使命”主题教育',
                                '专业技术人才成长',
                                '决定中国革命命运的湘江战役',
                                '教学总体布局',
                            ],
                            value5: '@cname()',
                            value6: '@pick(["至诚园服务台","会议中心报告厅","201教室","304教室","105教室"])',
                            value7: '@pick(["不评估"])',
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
                title: '日期',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '星期',
                ellipsis: true,
                width: 70,
            },
            {
                dataIndex: 'value3',
                title: '午别',
                ellipsis: true,
                width: 70,
            },
            {
                dataIndex: 'value4',
                title: '教学内容',
                width: 200,
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
                title: '评估问卷',
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
