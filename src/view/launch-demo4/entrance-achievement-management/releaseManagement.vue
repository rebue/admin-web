// 发布管理
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
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                ellipsis: true,
            },
            {
                dataIndex: 'achievementType',
                title: '成绩状态',
                ellipsis: true,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                ellipsis: true,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',
                ellipsis: true,
            },
            {
                dataIndex: 'inputType',
                title: '录入类型',
                ellipsis: true,
            },
            {
                dataIndex: 'majoe',
                title: '专业',
                ellipsis: true,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
            },
            {
                dataIndex: 'signUpDate',
                title: '提交时间',
                ellipsis: true,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '同步成绩到报名系统',
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
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
    },
};
</script>
