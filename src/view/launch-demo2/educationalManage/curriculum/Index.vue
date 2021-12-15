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
                        <a-select default-value="2021" style="width: 120px" @change="handleChange">
                            <a-select-option value="2021">
                                2021
                            </a-select-option>
                            <a-select-option value="2020">
                                2020
                            </a-select-option>
                        </a-select>
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
                            'value3|+1': ['8:30', '15:00', '19:30', '17:00', '16:00'],
                            'value4|+1': ['11:30', '17:30', '21:30', '19:00', '18:00'],
                            'value5|+1': [
                                '传承和弘扬英家革命老区精神',
                                '体验式教学主题: “不忘初心，牢记使命”主题教育',
                                '专业技术人才成长',
                                '决定中国革命命运的湘江战役',
                                '教学总体布局',
                            ],
                            value6: '@cname()',
                            value7: '@integer(101,109)教室',
                            value8: '@cname()',
                            value9: '@cname()',
                            value10: '',
                            value11: '@pick(["线上评估", "不评估"])',
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
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '上课时间',
                ellipsis: true,
                width: 100,
            },
            {
                dataIndex: 'value4',
                title: '下课时间',
                ellipsis: true,
                width: 100,
            },
            {
                dataIndex: 'value5',
                title: '教学内容',
                width: 250,
            },
            {
                dataIndex: 'value6',
                title: '授课人',
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '地点',
                width: 150,
            },
            {
                dataIndex: 'value8',
                title: '主持人',
                width: 150,
            },
            {
                dataIndex: 'value9',
                title: '辅教人',
                width: 150,
            },
            {
                dataIndex: 'value10',
                title: '备注',
                width: 150,
            },
            {
                dataIndex: 'value11',
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
                title: '教学计划',
                key: '20181',
            },
            {
                title: '最新专题',
                key: '20182',
            },
            {
                title: '专题库',
                key: '20183',
                children: [
                    {
                        title: '市领导授课专题',
                        key: '20183-1',
                    },
                    {
                        title: '外聘专家教授授课专题',
                        key: '20183-2',
                        children: [
                            {
                                title: '专业技术人才成长',
                                key: '201831-1',
                            },
                            {
                                title: '决定中国革命命运的湘江战役',
                                key: '201831-2',
                            },
                        ],
                    },
                    {
                        title: '本校教师授课专题',
                        key: '20183-3',
                    },
                ],
            },
            {
                title: '剪贴簿',
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
