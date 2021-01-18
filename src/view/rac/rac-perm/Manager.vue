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
                        :isTree="true"
                        :pagination="false"
                    >
                        <template #editForm="slotProps">
                            <perm-group-edit-form
                                :ref="'permGroupEditForm.' + domain.id"
                                :width="640"
                                @close="slotProps.handleEditFormClose"
                            />
                            <perm-edit-form
                                :ref="'permEditForm.' + domain.id"
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
import PermGroupEditForm from '../rac-perm-group/EditForm';
import PermEditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi } from '@/api/Api';
import { racPermApi } from '@/api/Api';
import { racPermGroupApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        PermEditForm,
        PermGroupEditForm,
        CrudTable,
    },
    data() {
        this.api = racPermApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
                fixed: 'left',
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
                ellipsis: true,
            },
            {
                dataIndex: 'isEnabled',
                align: 'center',
                title: '启用',
                width: 70,
                fixed: 'right',
                customRender: (text, record) => (
                    <a-switch checked={record.isEnabled} checkedChildren="启" unCheckedChildren="禁" />
                ),
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,
                fixed: 'right',
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
                                <a onClick={() => this.handlePermAdd(record)}>添加新权限</a>
                            </span>
                        );
                    } else if (record.type === PermTreeNodeTypeDic.Perm) {
                        return (
                            <span>
                                <a onClick={() => this.handlePermEdit(record)}>编辑</a>
                                <a-divider type="vertical" />
                                <a-popconfirm
                                    title="你确定要删除本条记录吗?"
                                    onConfirm={() => this.handlePermDel(record)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <a>删除</a>
                                </a-popconfirm>
                                <a-divider type="vertical" />
                                <a click="domain.onClick(record)">菜单</a>
                                <a-divider type="vertical" />
                                <a click="domain.onClick(record)">链接</a>
                                <a-divider type="vertical" />
                                <a click="domain.onClick(record)">命令</a>
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
                fixed: 'right',
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
            curDomainId: '',
            domains: [],
            columns,
        };
    },
    computed: {
        permGroupEditForm() {
            return this.$refs['permGroupEditForm.' + this.curDomainId][0];
        },
        permEditForm() {
            return this.$refs['permEditForm.' + this.curDomainId][0];
        },
        crudTable() {
            return this.$refs['crudTable.' + this.curDomainId][0];
        },
    },
    watch: {},
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
        /**
         * 处理添加分组的事件
         */
        handlePermGroupAdd() {
            this.permGroupEditForm.show(EditFormTypeDic.Add, { domainId: this.curDomainId });
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
         * 处理添加分组的事件
         */
        handlePermAdd(record) {
            console.log(record);
            this.crudTable.expand(record.id);
            this.permEditForm.show(EditFormTypeDic.Add, { domainId: record.domainId, groupId: record.id });
        },
        /**
         * 处理编辑分组的事件
         */
        handlePermEdit(record) {
            this.permEditForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除分组的事件
         */
        handlePermDel(record) {
            this.loading = true;
            racPermApi.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
    },
};
</script>
