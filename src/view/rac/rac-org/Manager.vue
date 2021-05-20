<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <a-tabs class="domain-tabs" :activeKey="curDomainId" @change="handleDomainChanged">
                <a-tab-pane v-for="domain in domains" :key="domain.id" :tab="domain.name">
                    <crud-table
                        :ref="`crudTable.${domain.id}`"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :query="{ domainId: curDomainId }"
                        :scrollX="600"
                        :expandable="true"
                    >
                        <template #editForm="{ handleEditFormClose }">
                            <edit-form :ref="`editForm.${domain.id}`" @close="handleEditFormClose" />
                        </template>
                    </crud-table>
                </a-tab-pane>
            </a-tabs>
            <manager-account-transfer-form
                :record="curRecord"
                :curOrgName="curOrgName"
                :visible.sync="addToOrgVisible"
                @close="refreshTableData()"
            />
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racDomainApi } from '@/api/Api';
import { racOrgApi } from '@/api/Api';
import { OrgTypeDic } from '@/dic/OrgTypeDic';
import ManagerAccountTransferForm from './ManagerAccountTransferForm.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
        CrudTable,
        ManagerAccountTransferForm,
    },
    data() {
        this.api = racOrgApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                width: 250,
                fixed: 'left',
            },
            {
                dataIndex: 'orgType',
                title: '组织类型',
                width: 90,
                customRender: text => OrgTypeDic.getName(text),
            },
            {
                dataIndex: 'remark',
                title: '备注',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 300,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建根组织',
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
                title: '添加子组织',
                onClick: record => this.handleAddChild(record),
            },
            {
                type: 'a',
                title: '管理账户',
                onClick: this.handleAddToOrg,
            },
        ];

        return {
            loading: false,
            curDomainId: '',
            domains: [],
            columns,
            addToOrgVisible: false,
            curRecord: {},
            curOrgName: '',
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
        refreshData() {
            this.loading = true;
            racDomainApi
                .listAll()
                .then(ro => {
                    this.domains = ro.extra.list;
                    this.curDomainId = this.domains[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleDomainChanged(domainId) {
            this.curDomainId = domainId;
        },
        /**
         * 处理添加组织的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                domainId: this.curDomainId,
            });
        },
        /**将用户添加到组织中 */
        handleAddToOrg(record) {
            this.addToOrgVisible = true;
            this.curOrgName = record.name;
            this.curRecord = record;
        },
        /**
         * 处理编辑组织的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除组织的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        /**
         * 处理添加子组织的事件
         */
        handleAddChild(record) {
            this.loading = true;
            this.editForm.show(EditFormTypeDic.Add, {
                domainId: this.curDomainId,
                parentId: record.id,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.domain-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
