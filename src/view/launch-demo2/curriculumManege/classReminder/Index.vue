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
                    :showKeywords="true"
                    :query="{ orgId: curOrgId }"
                >
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
                    'list|1-20': [
                        {
                            value1: '@pick(["必修课", "选修课"])',
                            value2:
                                '@pick(["【温馨提示】主体班授课提醒：2017年11月23日上午是您（刘慧玲老师）主讲的“发展全域旅游，建设旅游强区”专题课", "【温馨提示】主体班授课提醒：2017年11月23日下午是您（罗文峰老师）主讲的“新时代法治政府建设”专题课"])',
                            value3: '@pick(["经济学教研部", "法学教研部"])',
                            value4: '@cname()',
                            'value5|1-10000000000': 1932010000,
                            'value6|1-10000000000': 1932010000,
                            value7: '@date("yyyy-MM-dd hh:mm:ss")',
                            value8: '@date("yyyy-MM-dd hh:mm:ss")',
                            value9: '@pick(["发生成功", "发生失败"])',
                            value10: '@pick(["自动发送"])',
                            'value11|0-1': 1,
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
                title: '课程类型',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '提醒内容',
                width: 200,
                ellipsis: true,
            },
            {
                dataIndex: 'value3',
                title: '教师部门',
                width: 150,
            },
            {
                dataIndex: 'value4',
                title: '教师姓名',
                width: 150,
            },
            {
                dataIndex: 'value5',
                title: '教师电话',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'value6',
                title: '发送电话',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'value7',
                title: '发送时间',
                width: 200,
            },
            {
                dataIndex: 'value8',
                title: '结果时间',
                width: 200,
            },
            {
                dataIndex: 'value9',
                title: '发送结果',
                width: 150,
            },
            {
                dataIndex: 'value10',
                title: '发送类型',
                width: 150,
            },
            {
                dataIndex: 'value11',
                title: '重复次数',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     icon: 'plus',
            //     title: '新建',
            //     onClick: this.handleAdd,
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '手动提醒',
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
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
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
}
</style>
