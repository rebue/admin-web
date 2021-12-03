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
                    :defaultPagination="false"
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
                // 数据列表在这里设置
                const dataSource = [
                    {
                        value1: 'ABCD',
                        value2: '1',
                        value3: '永久',
                        value4: '公开',
                        value5: '人力资源部',
                        value6: '1-2020-00001',
                        value7: '0002',
                        value8: '档案',
                        value9: '档案',
                        value10: '2021-12-04',
                        value11: '档案',
                        value12: '2021-12-05',
                        value13: '2021-12-05',
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
            // {
            //     dataIndex: 'no',
            //     title: '序号',
            //     width: 70,
            //     fixed: 'left',
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'value1',
                title: '查看题名',
            },
            {
                dataIndex: 'value2',
                title: '分类号',
            },
            {
                dataIndex: 'value3',
                title: '保管期限',
            },
            {
                dataIndex: 'value4',
                title: '密级',
            },
            {
                dataIndex: 'value5',
                align: 'center',
                title: '归档部门',
            },
            {
                dataIndex: 'value6',
                title: '档号',
            },
            {
                dataIndex: 'value7',
                title: '查看号',
            },
            {
                dataIndex: 'value8',
                title: '查看人',
            },
            {
                dataIndex: 'value9',
                title: '查看单位',
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '查看时间',
            },
            {
                dataIndex: 'value11',
                title: '检查人',
            },
            {
                dataIndex: 'value12',
                title: '检查时间',
            },
            {
                dataIndex: 'value13',
                align: 'center',
                title: '检查盒日期',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
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
