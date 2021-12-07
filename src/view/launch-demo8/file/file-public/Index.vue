//公有文档
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
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                ref="orgTree.platform"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
                            <div class="table-divider"></div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
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
                dataIndex: 'title',
                title: '标题',
                width: 150,
            },
            {
                dataIndex: 'useState',
                title: '使用状态',
                width: 150,
            },
            {
                dataIndex: 'degree',
                title: '重要程度',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '年度时间',
                width: 150,
            },
            {
                dataIndex: 'dep',
                title: '所属部门',
                width: 150,
            },
            {
                dataIndex: 'administrator',
                title: '管理人员',
                width: 150,
            },
            {
                dataIndex: 'sourceType',
                title: '来源类型',
                width: 150,
            },
            {
                dataIndex: 'businessType',
                title: '业务类型',
                width: 150,
            },
            {
                dataIndex: 'submitDate',
                title: '提交时间',
                width: 150,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                width: 150,
            },
            {
                dataIndex: 'visitsNum',
                title: '访问次数',
                width: 150,
            },
            {
                dataIndex: 'enclosureLength',
                title: '附件长度',
                width: 150,
            },
            {
                dataIndex: 'custom',
                title: '自定义属性',
                width: 150,
            },
            {
                dataIndex: 'keyword',
                title: '关键字',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '上传',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '按关键字添加',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '下载',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '文件夹权限',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '复制',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '粘贴',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
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
                type: 'a',
                title: '查看',
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
            realm: {
                id: '1',
            },
            visible: false,
            confirmLoading: false,
            showOrg: true,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            // this.$nextTick(this.refreshTableData);
        },
        handleAdd() {
            //
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
