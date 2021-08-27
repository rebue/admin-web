<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs :activeKey="curRealmId" @change="handleRealmChanged">
                    <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                        <crud-table
                            :ref="`crudTable.${realm.id}`"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ realmId: curRealmId }"
                            :scrollX="600"
                            :defaultPagination="false"
                        >
                        </crud-table>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>

        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-menus-form :curApp.sync="curApp" :visible.sync="manageMenusFormVisible" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import { racAppApi } from '@/api/Api';
import ManageMenusForm from './ManageMenusForm.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
        ManageMenusForm,
    },
    data() {
        this.api = racAppApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                scopedSlots: { customRender: 'serial' },
                width: 50,
                fixed: 'left',
            },
            {
                dataIndex: 'name',
                title: '名称',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'id',
                title: '编码',
                width: 180,
            },
            {
                dataIndex: 'isAdd',
                title: '是否接入统一应用平台',
                width: 180,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popconfirm
                        title={record.isAdd ? '确认移除统一应用平台?' : '确认接入统一应用平台？'}
                        visible={record.addVisible}
                        onVisibleChange={visible => {
                            this.handleAddVisibleChange(visible, record);
                        }}
                        onConfirm={() => {
                            this.confirmAdd(record);
                        }}
                    >
                        <a-switch checked={record.isAdd} checked-children="是" un-checked-children="否"></a-switch>
                    </a-popconfirm>
                ),
            },
            {
                dataIndex: 'isEnabled',
                title: '是否在应用平台启用',
                width: 180,
                ellipsis: true,
                customRender: (text, record) => (
                    <a-popconfirm
                        title={record.isEnabled ? '确认在应用平台禁用？' : '确认在应用平台启用？'}
                        visible={record.enabledVisible}
                        onVisibleChange={visible => {
                            this.handleEnableVisibleChange(visible, record);
                        }}
                        onConfirm={() => {
                            this.confirmEnable(record);
                        }}
                    >
                        <a-switch checked={record.isEnabled} checked-children="是" un-checked-children="否"></a-switch>
                    </a-popconfirm>
                ),
            },
            {
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 160,
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
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '菜单',
                onClick: record => this.handleMenus(record),
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        confirmAdd(record) {
            //发起请求
            setTimeout(() => {
                this.$set(record, 'isAdd', !record.isAdd);
            });
        },
        // 	显示隐藏的回调
        handleAddVisibleChange(visible, record) {
            this.$set(record, 'addVisible', visible);
        },
        confirmEnable(record) {
            //发起请求
            setTimeout(() => {
                this.$set(record, 'isEnabled', !record.isEnabled);
            });
        },
        // 	显示隐藏的回调
        handleEnableVisibleChange(visible, record) {
            this.$set(record, 'enabledVisible', visible);
        },
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = ro.extra.list;
                    this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /**
         * 处理添加应用的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除应用的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理应用菜单的事件
         */
        handleMenus(record) {
            this.curApp = record;
            this.manageMenusFormVisible = true;
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
