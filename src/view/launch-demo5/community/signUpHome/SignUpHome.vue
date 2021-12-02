<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :query="{ orgId: curOrgId }"
                    :scrollX="800"
                    :defaultPagination="true"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        this.api = {};
        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        name: '聚餐、游戏',
                        name1: '张三',
                        phone: '13512345678',
                        nub1: '80',
                        nub2: '12',
                        add: '足球场',
                        time: '2021-12-04 16:39:00 - 2021-12-04 18:39:00',
                    },
                    {
                        id: 2,
                        no: 2,
                        name: '户外拓展活动',
                        name1: '李四',
                        phone: '13512345678',
                        nub1: '20',
                        nub2: '7',
                        add: '美丽南方',
                        time: '2021-12-04 09:30:00 - 2021-12-05 17:00:00',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: dataSource.length,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
            },
            {
                dataIndex: 'name',
                title: '专题名称',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'xy',
                title: '负责人/联系方式',
                width: 110,
                customRender: (text, record) => {
                    return record.name1 + '/' + record.phone;
                },
            },
            {
                dataIndex: 'nub',
                title: '报名组数(总/当前)',
                width: 90,
                customRender: (text, record) => {
                    return record.nub1 + '/' + record.nub2;
                },
            },
            {
                dataIndex: 'time',
                title: '开放时间段',
                width: 220,
                ellipsis: true,
            },
            {
                dataIndex: 'add',
                title: '活动地址',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 120,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新建',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '导出',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '导入',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '加入',
                onClick: () => {
                    /**/
                },
            },
        ];
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        return {
            columns,
            showOrg: false,
            curOrgId: undefined,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
};
</script>
