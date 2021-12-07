<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="true"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                        :query="{ orgId: curOrgId }"
                    >
                    </crud-table>
                </template>
            </base-manager>
            <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'number|+1': 10000,
                            articleTitle: '@csentence(5,10)',
                            describe: '@cparagraph(2)',
                            time: '@date(yyyy-mm-dd hh:mm:ss)',
                            name: '@cname()',
                        },
                    ],
                });
                // 数据列表在这里设置
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
                dataIndex: 'number',
                title: '文章编号',
                width: 70,
                ellipsis: true,
            },
            {
                dataIndex: 'articleTitle',
                title: '文章标题',
                width: 80,
                ellipsis: true,
            },
            {
                dataIndex: 'describe',
                title: '文章内容',
                width: 260,
                ellipsis: true,
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 80,
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '作者',
                width: 60,
                ellipsis: true,
            },
        ];

        return {
            columns,
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
    },
};
</script>
