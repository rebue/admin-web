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
    name: 'annual-reward-table',
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
                dataIndex: 'no',
                title: '自动序号',
                width: 100,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'achievementNo',
                title: '填报人',
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
                title: '奖励类型',
                ellipsis: true,
            },
            {
                dataIndex: 'achievementName',
                title: '科研奖励名单',
                ellipsis: true,
            },
            {
                dataIndex: 'applyTime',
                title: '科研奖励工作量',
                ellipsis: true,
            },
            {
                dataIndex: 'state',
                title: '系统时间',
                ellipsis: true,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '编辑',
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
