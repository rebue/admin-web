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
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
            },
            {
                dataIndex: 'nfmc',
                title: '年份名称',
                fixed: 'left',
            },
            {
                dataIndex: 'nf',
                title: '年份',
                fixed: 'left',
            },
            {
                dataIndex: 'gzsj',
                title: '全年工作时间（天）',
                fixed: 'left',
            },
            {
                dataIndex: 'gzl',
                title: '全校教学平均工作量（课时）',
                width: 230,
            },
            {
                dataIndex: 'sj',
                title: '教学工作量统计起始日期',
                width: 230,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 120,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        nfmc: '2018年',
                        nf: '2018',
                        gzsj: '1358',
                        gzl: '3678',
                        sj: '2018-11-13',
                    },
                    {
                        id: 2,
                        no: 2,
                        nfmc: '2017年',
                        nf: '2017',
                        gzsj: '5678',
                        gzl: '5678',
                        sj: '2017-11-13',
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

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
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
                title: '删除',
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
         * 新增事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 编辑事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 删除事件
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
