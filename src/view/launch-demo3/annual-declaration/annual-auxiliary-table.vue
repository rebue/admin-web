<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :commands="tableCommands"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="600"
                :defaultPagination="false"
                :showKeywords="showKeywords"
            ></crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'annual-auxiliary-table',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
    },
    data() {
        this.api = racRealmApi;
        this.showKeywords = true;
        const columns = [
            {
                dataIndex: 'achievementNo',
                title: '填写人',
                width: 150,
                fixed: 'left',
            },

            {
                dataIndex: 'author',
                title: '作者',
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '辅助的工作',
                ellipsis: true,
            },
            {
                dataIndex: 'applyTime',
                title: '工作日期',
                ellipsis: true,
            },
            {
                dataIndex: 'state',
                title: '辅助的工作量',
                ellipsis: true,
            },
            {
                dataIndex: 'state',
                title: '添加时间',
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '修改',
                onClick: this.handleEdit,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '删除',
                onClick: this.handleDel,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新增',
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
            columns,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
};
</script>

<style scoped></style>
