// 学籍变动
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
                    :rowSelection="{}"
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
                dataIndex: 'stuOriginalNum',
                title: '学员原编号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'changeType',
                title: '变动类型',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'changeDate',
                title: '变动时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'changeSemester',
                title: '变动学期',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'group',
                title: '小组',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'classDuties',
                title: '班级职务',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'company',
                title: '工作单位',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'duties',
                title: '职务',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'postLevel',
                title: '职级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '手机',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'telephone',
                title: '电话',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'zipCode',
                title: '邮编',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                ellipsis: true,
                width: 150,
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
                title: '学员增加',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '学员减少',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '学员新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '转学学员以前成绩',
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
