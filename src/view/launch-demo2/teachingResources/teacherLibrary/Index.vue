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
                            value1: '@pick(["院内教室（非编）"])',
                            value2: '@cname()',
                            'value3|1-100000000000000000': 12345679012345678,
                            value4: '@pick(["男", "女"])',
                            value5: '无',
                            value6: '@pick(["百色干部学院教室"])',
                            'value7|1-10000000000': 123456790,
                            value8: '@pick(["区内","区外"])',
                            value9: '@pick(["中国农业银行白色右江支行"])',
                            'value10|1-100000000000000000': 12345679012345678,
                            'value11|1-1000': 1234,
                            value12: '',
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
                title: '类型',
                width: 150,
            },
            {
                dataIndex: 'value2',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'value3',
                title: '身份证',
                width: 200,
            },
            {
                dataIndex: 'value4',
                title: '性别',
                ellipsis: true,
                width: 100,
            },
            {
                dataIndex: 'value5',
                title: '职称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value6',
                title: '单位职务',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value7',
                title: '联系电话',
                width: 150,
            },
            {
                dataIndex: 'value8',
                align: 'center',
                title: '所属区域',
                width: 150,
            },
            {
                dataIndex: 'value9',
                align: 'center',
                title: '开户行',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value10',
                align: 'center',
                title: '银行账号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'value11',
                align: 'center',
                title: '课薪标准(元)',
                width: 150,
            },
            {
                dataIndex: 'value12',
                align: 'center',
                title: '个人简介',
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
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
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
