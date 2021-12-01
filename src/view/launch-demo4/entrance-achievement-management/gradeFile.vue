// 成绩归档
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
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
                dataIndex: 'name',
                title: '研究生类型',
                ellipsis: true,
            },
            {
                dataIndex: 'gradeName',
                title: '年级名称',
                ellipsis: true,
            },
            {
                dataIndex: 'remark',
                title: '允许报名',
                ellipsis: true,
            },
            {
                dataIndex: 'entranceData',
                title: '入学时间',
                ellipsis: true,
            },
            {
                dataIndex: 'graduationData',
                title: '毕业时间',
                ellipsis: true,
            },
            {
                dataIndex: 'gradeFile',
                title: '入学成绩归档',
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '说明',
                ellipsis: true,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 60,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
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
