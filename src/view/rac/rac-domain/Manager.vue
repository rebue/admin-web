<template>
    <base-manager ref="baseManager">
        <template v-slot:crudTable>
            <crud-table
                ref="crudTable"
                :commands="tableCommands"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :pagination="false"
            >
                <template v-slot:editForm="slotProps">
                    <edit-form
                        ref="editForm"
                        :width="640"
                        :visible="slotProps.editFormVisible"
                        :editFormType="slotProps.editFormType"
                        :model.sync="slotProps.model"
                        @close="slotProps.handleEditFormClose"
                    />
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi } from '@/api/Api';

const columns = [
    {
        dataIndex: 'no',
        title: '#',
        scopedSlots: { customRender: 'serial' },
        width: 50,
    },
    {
        dataIndex: 'id',
        title: '编码',
        width: 140,
    },
    {
        dataIndex: 'name',
        title: '名称',
        width: 150,
    },
    {
        dataIndex: 'remark',
        title: '备注',
        ellipsis: true,
    },
    {
        dataIndex: 'action',
        title: '操作',
        width: 150,
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
    },
    data() {
        this.api = racDomainApi;
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: () => this.$refs.editForm.show(EditFormTypeDic.Add, {}),
            },
        ];
        this.tableActions = [
            { type: 'a', title: '编辑', onClick: record => this.$refs.editForm.show(EditFormTypeDic.Modify, record) },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.$refs.crudTable.handleDel(record),
            },
        ];
        return {
            columns,
        };
    },
    methods: {},
};
</script>
<style lang="less" scoped></style>
