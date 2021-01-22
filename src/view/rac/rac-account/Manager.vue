<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :ref="'crudTable.' + domain.id"
                        :commands="tableCommands"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :expandable="true"
                        :pagination="true"
                    >
                        <template #editForm="slotProps">
                            <org-edit-form
                                :ref="'orgEditForm.' + domain.id"
                                :width="640"
                                @close="slotProps.handleEditFormClose"
                            />
                            <edit-form
                                :ref="'editForm.' + domain.id"
                                :width="640"
                                @close="slotProps.handleEditFormClose"
                            />
                        </template>
                    </crud-table>
                </a-tab-pane>
            </a-tabs>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgEditForm from '../rac-org/EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi, racOrgApi, racAccountApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        OrgEditForm,
        CrudTable,
    },
    data() {
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
                fixed: 'left',
                customRender: (text, record) => {
                    return (
                        <fragment>
                            <a-tag color="blue">
                                用户
                                <a-icon type="tag" />
                            </a-tag>
                            {{ text }}
                        </fragment>
                    );
                },
            },
            {
                dataIndex: 'remark',
                title: '备注',
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
                        onClick={() => this.handleAccountCheck(record)}
                    />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,
                fixed: 'right',
                customRender: (text, record) => {
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
                        </span>
                    );
                },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleOrgAdd,
            },
        ];

        return {
            loading: false,
            curDomainId: '',
            domains: [],
            columns,
        };
    },
    computed: {
        orgEditForm() {
            return this.$refs['orgEditForm.' + this.curDomainId][0];
        },
        editForm() {
            return this.$refs['editForm.' + this.curDomainId][0];
        },
        crudTable() {
            return this.$refs['crudTable.' + this.curDomainId][0];
        },
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    if (!this.curDomainId) this.curDomainId = this.domains[0].id;
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
        handleDomainChanged(domainId) {
            this.curDomainId = domainId;
        },
        /** 处理用户启用或禁用 */
        handleAccountCheck(record) {
            this.loading = true;
            racAccountApi.enable(record.id, !record.isEnabled).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加分组的事件
         */
        handleOrgAdd() {
            this.orgEditForm.show(EditFormTypeDic.Add, { domainId: this.curDomainId });
        },
        /**
         * 处理编辑分组的事件
         */
        handleOrgEdit(record) {
            this.orgEditForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除分组的事件
         */
        handleOrgDel(record) {
            this.loading = true;
            racOrgApi.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加用户的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.editForm.show(EditFormTypeDic.Add, { domainId: record.domainId, groupId: record.id });
        },
        /**
         * 处理编辑用户的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除用户的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
    },
};
</script>
