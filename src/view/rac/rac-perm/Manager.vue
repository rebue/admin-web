<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs :activeKey="curRealmId" @change="handleRealmChanged">
                    <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                        <crud-table
                            :ref="`crudTable.${realm.id}`"
                            :commands="tableCommands"
                            :columns="columns"
                            :api="api"
                            :query="{ realmId: curRealmId }"
                            :scrollX="600"
                            :scrollY="600"
                            :expandable="true"
                            :defaultPagination="false"
                            @moveUp="handleMoveUp"
                            @moveDown="handleMoveDown"
                        >
                        </crud-table>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
        <perm-group-edit-form ref="permGroupEditForm" @success="handleEditFormClose" />
        <edit-form ref="editForm" @success="handleEditFormClose" />
        <manage-menu-form :perm="curRecord" :visible.sync="manageMenuFormVisible" />
        <urn-edit-form :record="curRecord" :visible.sync="edintLinkFormVisible" />
        <manager-command :width="750" :title="'权限命令'" :record="curRecord" :visible.sync="managerCommandVisible" />
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import CrudTable from '@/component/rebue/CrudTable.vue';
import PermGroupEditForm from '../rac-perm-group/EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import { racRealmApi, racPermGroupApi, racPermApi } from '@/api/Api';
import UrnEditForm from './UrnEditForm.vue';
import ManageMenuForm from './ManageMenuForm.vue';
import ManagerCommand from './ManagerCommand.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        PermGroupEditForm,
        CrudTable,
        UrnEditForm,
        ManageMenuForm,
        ManagerCommand,
    },
    data() {
        this.api = racPermApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 300,

                customRender: (text, record) => {
                    if (record.type === PermTreeNodeTypeDic.PermGroup) {
                        return (
                            <span>
                                <a-tag color="blue">
                                    分组
                                    <a-icon type="tags" />
                                </a-tag>
                                {{ text }}
                            </span>
                        );
                    } else if (record.type === PermTreeNodeTypeDic.Perm) {
                        return (
                            <fragment>
                                <a-tag color="blue">
                                    权限
                                    <a-icon type="tag" />
                                </a-tag>
                                {{ text }}
                            </fragment>
                        );
                    }
                },
            },
            {
                dataIndex: 'remark',
                title: '备注',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'isEnabled',
                align: 'center',
                title: '启用',
                width: 70,

                customRender: (text, record) => (
                    <a-switch
                        checked={record.isEnabled}
                        checkedChildren="启"
                        unCheckedChildren="禁"
                        onClick={() => this.handlePermCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,

                customRender: (text, record) => {
                    if (record.type === PermTreeNodeTypeDic.PermGroup) {
                        return (
                            <span>
                                <a onClick={() => this.handlePermGroupEdit(record)}>编辑</a>
                                <a-divider type="vertical" />
                                <a-popconfirm
                                    title="你确定要删除本条记录吗?"
                                    onConfirm={() => this.handlePermGroupDel(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a>删除</a>
                                </a-popconfirm>
                                <a-divider type="vertical" />
                                <a onClick={() => this.handleAdd(record)}>添加新权限</a>
                            </span>
                        );
                    } else if (record.type === PermTreeNodeTypeDic.Perm) {
                        return (
                            <span>
                                <a onClick={() => this.handleEdit(record)}>编辑</a>
                                <a-divider type="vertical" />
                                <a-popconfirm
                                    title="你确定要删除本条记录吗?"
                                    onConfirm={() => this.handleDel(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a>删除</a>
                                </a-popconfirm>
                                <a-divider type="vertical" />
                                <a onClick={() => this.handleMenuForm(record)}>菜单</a>
                                <a-divider type="vertical" />
                                <a onClick={() => this.handleUrnEditForm(record)}>链接</a>
                                <a-divider type="vertical" />
                                <a onClick={() => this.handleCommandEditForm(record)}>命令</a>
                            </span>
                        );
                    }
                },
            },
            {
                dataIndex: 'sort',
                align: 'center',
                title: '排序',
                width: 100,

                scopedSlots: { customRender: 'sort' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建分组',
                onClick: this.handlePermGroupAdd,
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            realms: [],
            columns,
            edintLinkFormVisible: false,
            manageMenuFormVisible: false,
            managerCommandVisible: false,
            curRecord: {},
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.permGroupEditForm = this.$refs.permGroupEditForm;
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = ro.extra.list;
                    if (!this.curRealmId) this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理改变领域的事件
         */
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
        },
        /** 处理权限启用或禁用 */
        handlePermCheck(record) {
            this.loading = true;
            if (record.type === PermTreeNodeTypeDic.PermGroup) {
                if (!record.isEnabled) {
                    racPermGroupApi.enable(record.id, !record.isEnabled).finally(() => {
                        this.refreshTableData();
                    });
                }
                if (record.isEnabled) {
                    racPermGroupApi.disable(record.id, !record.isEnabled).finally(() => {
                        this.refreshTableData();
                    });
                }
            } else if (record.type === PermTreeNodeTypeDic.Perm) {
                if (!record.isEnabled) {
                    racPermApi.enable(record.id, !record.isEnabled).finally(() => {
                        this.refreshTableData();
                    });
                }
                if (record.isEnabled) {
                    racPermApi.disable(record.id, !record.isEnabled).finally(() => {
                        this.refreshTableData();
                    });
                }
            }
        },
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            if (record.type === PermTreeNodeTypeDic.PermGroup)
                racPermGroupApi.moveUp(record.id).finally(() => {
                    this.refreshTableData();
                });
            else if (record.type === PermTreeNodeTypeDic.Perm)
                racPermApi.moveUp(record.id).finally(() => {
                    this.refreshTableData();
                });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            if (record.type === PermTreeNodeTypeDic.PermGroup)
                racPermGroupApi.moveDown(record.id).finally(() => {
                    this.refreshTableData();
                });
            else if (record.type === PermTreeNodeTypeDic.Perm)
                racPermApi.moveDown(record.id).finally(() => {
                    this.refreshTableData();
                });
        },
        /**
         * 处理添加分组的事件
         */
        handlePermGroupAdd() {
            this.permGroupEditForm.show(EditFormTypeDic.Add, { realmId: this.curRealmId });
        },
        /**
         * 处理编辑分组的事件
         */
        handlePermGroupEdit(record) {
            this.permGroupEditForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除分组的事件
         */
        handlePermGroupDel(record) {
            this.loading = true;
            racPermGroupApi.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加权限的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.editForm.show(EditFormTypeDic.Add, { realmId: record.realmId, groupId: record.id });
        },
        /**
         * 处理编辑权限的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理菜单的事件
         */
        handleMenuForm(record) {
            this.curRecord = record;
            this.manageMenuFormVisible = true;
        },
        /**
         * 处理权限链接的事件
         */
        handleUrnEditForm(record) {
            this.curRecord = record;
            this.edintLinkFormVisible = true;
        },
        /**
         * 处理权限命令的事件
         */
        handleCommandEditForm(record) {
            this.curRecord = record;
            this.managerCommandVisible = true;
        },
        /**
         * 处理删除权限的事件
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
