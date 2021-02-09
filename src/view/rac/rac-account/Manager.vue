<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="domain-tabs" :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :showKeywords="true"
                        :ref="'crudTable.' + domain.id"
                        :commands="tableCommands"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :expandable="true"
                    >
                        <template #left>
                            <div v-show="showOrg" class="table-left">
                                <org-tree
                                    :show.sync="showOrg"
                                    :domainId="curDomainId"
                                    @click="handleOrgMenuClick"
                                    @select="handleOrgTreeSelect"
                                />
                                <div class="table-divider"></div>
                            </div>
                        </template>
                        <template #editForm="{handleEditFormClose}">
                            <edit-form :ref="'editForm.' + domain.id" :width="640" @close="handleEditFormClose" />
                        </template>
                    </crud-table>
                </a-tab-pane>
            </a-tabs>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm';
import OrgTree from '../rac-org/Tree';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi, racAccountApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        OrgTree,
        CrudTable,
    },
    data() {
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'signInName',
                title: '登录名称',
                width: 120,
                fixed: 'left',
            },
            {
                dataIndex: 'nickname',
                title: '昵称',
                width: 160,
                ellipsis: true,
                customRender: (text, record) => {
                    return (
                        <fragment>
                            {record.signInNickname && record.signInNickname}
                            {record.wxNickname && (
                                <span>
                                    <br />
                                    {record.wxNickname + '(微信)'}
                                </span>
                            )}
                            {record.qqNickname && (
                                <span>
                                    <br />
                                    {record.qqNickname + '(QQ)'}
                                </span>
                            )}
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
                width: 80,
                fixed: 'right',
                customRender: (text, record) => {
                    return <a onClick={() => this.handleEdit(record)}>编辑</a>;
                },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAccountAdd,
            },
        ];

        return {
            loading: false,
            showOrg: false,
            curDomainId: '',
            curOrgId: undefined,
            domains: [],
            columns,
        };
    },
    computed: {
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
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(this.refreshTableData);
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
        /** 处理账户启用或禁用 */
        handleAccountCheck(record) {
            this.loading = true;
            console.log('record', record);
            racAccountApi.enable(record.id, !record.isEnabled).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加分组的事件
         */
        handleAccountAdd() {
            this.editForm.show(EditFormTypeDic.Add, { domainId: this.curDomainId });
        },
        /**
         * 处理编辑分组的事件
         */
        handleAccountEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除分组的事件
         */
        handleAccountDel(record) {
            this.loading = true;
            racAccountApi.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加账户的事件
         */
        handleAdd(record) {
            this.crudTable.expand(record.id);
            this.editForm.show(EditFormTypeDic.Add, { domainId: record.domainId, groupId: record.id });
        },
        /**
         * 处理编辑账户的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除账户的事件
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

<style lang="less" scoped>
.domain-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 20px;
    }
}
</style>
