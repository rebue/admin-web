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
    name: 'ClassFund',
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
                    'list|5': [
                        {
                            'id|+1': 10000000,

                            className: '@pick(["计算机应用基础", "软件工程","java程序设计", "设计模式","高等数学"])',

                            'classFund|500-1000': 1000,
                            'officeCost|500-1000': 1000,
                            'dataFee|500-1000': 1000,
                            'postCost|500-1000': 1000,
                            'trafficCost|500-1000': 1000,
                            'fieldCost|500-1000': 1000,
                            'foodCost|500-1000': 1000,
                            'stayCost|500-1000': 1000,
                            sum: '',
                        },
                    ],
                });
                // 数据列表在这里设置
                for (let i = 0; i < mockList.list.length; i++) {
                    mockList.list[i].sum =
                        mockList.list[i].officeCost +
                        mockList.list[i].dataFee +
                        mockList.list[i].postCost +
                        mockList.list[i].trafficCost +
                        mockList.list[i].fieldCost +
                        mockList.list[i].stayCost +
                        mockList.list[i].foodCost +
                        mockList.list[i].classFund;
                }
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
                dataIndex: 'className',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'classFund',
                title: '办班讲课费',
                width: 150,
            },
            {
                dataIndex: 'officeCost',
                title: '办班办公费',
                width: 150,
            },
            {
                dataIndex: 'dataFee',
                title: '办班资料费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'postCost',
                title: '办班邮电费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'trafficCost',
                title: '办班交通费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'fieldCost',
                title: '办班场地费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'foodCost',
                title: '培训伙食费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'stayCost',
                title: '培训住宿费',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'sum',
                title: '合计',
                ellipsis: true,
                width: 150,
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
