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
                        :commands="tableCommands"
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
                dataIndex: 'choose',
                title: '选择',
                width: 150,
            },
            {
                dataIndex: 'homework',
                title: '作业批次',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'homeworkName',
                title: '作业名称',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'describe',
                title: '作业描述',
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
                dataIndex: 'score',
                title: '成绩',
                width: 150,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '删除',
                onClick: () => {
                    /**/
                },
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
<style lang="less" scoped></style>
