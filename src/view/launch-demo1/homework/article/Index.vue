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
                        :defaultPagination="false"
                        :actions="tableActions"
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
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'articleTitle',
                title: '文章标题',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'describe',
                title: '文章内容',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '作者',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '编辑',
                    },
                    {
                        type: 'confirm',
                        title: '删除',
                        confirmTitle: '你确定要删除本条记录吗?',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
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
