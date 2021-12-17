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
            },
            {
                dataIndex: 'name',
                title: '教学管理部门',
            },
            {
                dataIndex: 'lx',
                title: '工作量类型',
            },
            {
                dataIndex: 'dm',
                title: '类型代码',
            },
            {
                dataIndex: 'gzl',
                title: '仅统计计酬工作量',
                ellipsis: true,
            },
            {
                dataIndex: 'bm',
                title: '负责部门',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 120,

                scopedSlots: { customRender: 'action' },
            },
        ];

        const page = function() {
            const p = new Promise((resolve, reject) => {
                const mockList = require('mockjs').mock({
                    'list|8': [
                        {
                            'id|+1': 1,
                            'noe|+1': 1,
                            'name|+1': [
                                '教务处',
                                '公培处',
                                '应急部',
                                '网络部',
                                '党性教育情景课研究部',
                                '人事处',
                                '业务指导处',
                            ],
                            lx: '部门工作量',
                            'dm|+1': 1,
                            gzl: '@pick(["是"," "])',
                            bm: '@name',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
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
