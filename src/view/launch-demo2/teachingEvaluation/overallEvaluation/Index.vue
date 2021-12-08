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
                    :showKeywords="true"
                    :scrollX="600"
                    :defaultPagination="true"
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
    name: 'OverallEvaluation',
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
                    'list|5-30': [
                        {
                            'id|+1': 551566,
                            year: '@now(yyyy)' + '度',
                            title: '@ctitle',

                            type: '@pick(["教学","比赛","创新"])',
                            effectiveTime: '@now(yyyy-MM-dd HH:mm:ss)',
                            'sum|1000-2000': 2000,
                            assessTime: '@now()',
                            createTime: '@now()',
                        },
                    ],
                });
                // 数据列表在这里设置
                // for (let i = 0; i < mockList.list.length; i++) {
                //
                // }
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
                dataIndex: 'year',
                title: '年度',
                width: 150,
            },
            {
                dataIndex: 'title',
                title: '标题',
                width: 150,
            },
            {
                dataIndex: 'type',
                title: '类型',
                width: 150,
            },
            {
                dataIndex: 'effectiveTime',
                title: '有效期',
                width: 180,
            },
            {
                dataIndex: 'sum',
                title: '总分值',
                width: 150,
            },
            {
                dataIndex: 'assessTime',
                title: '评估时间',
                width: 180,
            },
            {
                dataIndex: 'createTime',
                title: '生成时间',
                width: 180,
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
                icon: 'plus',
                title: '编辑',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
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
