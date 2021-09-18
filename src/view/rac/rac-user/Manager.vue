<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    :showKeywords="true"
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :showHierarchical="false"
                >
                </crud-table>
            </template>
        </base-manager>
        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-account-form
            ref="manageOrgForm"
            :user="curRecord"
            :visible.sync="manageOrgFormVisible"
            @close="handleEditFormClose"
        />

        <disabled-form :record="curRecord" :visible.sync="disabledFormVisible" @close="handleEditFormClose" />
        <enabled-form :record="curRecord" :visible.sync="enabledFormVisible" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm.vue';
import DisabledForm from './DisabledForm.vue';
import EnabledForm from './EnabledForm.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racUserApi } from '@/api/Api';
import ManageAccountForm from './ManageAccountForm.vue';

export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
        EditForm,
        DisabledForm,
        EnabledForm,
        ManageAccountForm,
    },
    data() {
        this.api = racUserApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'realName',
                title: '用户名称',
                width: 120,
                fixed: 'left',
            },
            {
                dataIndex: 'idCard',
                title: '身份证号',
                ellipsis: true,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                customRender: (text, record) => <span>{record.sex == 1 ? '男' : '女'}</span>,
            },
            {
                dataIndex: 'mobile',
                title: '手机号码',
                ellipsis: true,
            },
            {
                dataIndex: 'email',
                title: '电子邮箱',
                ellipsis: true,
            },

            {
                dataIndex: 'isEnabled',
                align: 'center',
                title: '启用',
                width: 70,
                fixed: 'right',
                customRender: (text, record) => (
                    <a-switch
                        checked={record.isEnabled}
                        checkedChildren="启"
                        unCheckedChildren="禁"
                        onClick={() => this.handleUserCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 180,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            // {
            //     type: 'more',
            //     items: [
            //         {
            //             type: 'a',
            //             title: '管理账号',
            //             onClick: record => this.handleManageAccount(record),
            //         },
            //     ],
            // },
        ];

        return {
            loading: false,
            manageOrgFormVisible: false,
            enabledFormVisible: false,
            disabledFormVisible: false,
            curRealmId: '',
            curOrgId: undefined,
            realms: [],
            columns,
            curRecord: {},
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable'];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.manageOrgForm = this.$refs.manageOrgForm;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /** 处理用户启用或禁用 */
        handleUserCheck(record) {
            this.loading = true;
            this.curRecord = record;
            if (record.isEnabled === true) {
                this.curRecord.isEnabled = !record.isEnabled;
                this.disabledFormVisible = true;
            } else {
                this.curRecord.isEnabled = !record.isEnabled;
                this.enabledFormVisible = true;
            }
        },

        /**
         * 处理添加用户的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.editForm.show(EditFormTypeDic.Add, {
                orgId: this.curOrgId,
                realmId: this.curRealmId,
                groupId: record.id,
                isTester: false,
            });
        },
        /**
         * 处理管理组织事件
         */
        handleManageAccount(record) {
            this.curRecord = record;
            this.manageOrgFormVisible = true;
        },
        /**
         * 处理编辑用户的事件
         */
        handleEdit(record) {
            this.curRecord = record;
            this.editForm.show(EditFormTypeDic.Modify, { ...record });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>

<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
