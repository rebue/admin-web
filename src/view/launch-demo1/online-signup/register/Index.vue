<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :query="{ orgId: curOrgId }"
                    :scrollX="600"
                    :defaultPagination="false"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                :ref="`orgTree.platform`"
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
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        OrgTree,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'birth',
                title: '出生年月',
                width: 150,
            },
            {
                dataIndex: 'idCard',
                title: '证件号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'cardId',
                title: '一卡通卡号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'class',
                title: '班级',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'company',
                title: '工作单位',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'flag',
                title: '可转入学籍',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'checker',
                title: '审核人',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'lastModifiedTime',
                title: '最后修改时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'lastChecker',
                title: '最后录入人',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'by',
                title: '到校交通方式',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'arriveTime',
                title: '交通到站时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'meet',
                title: '是否要接站',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '其他交通备注',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 250,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新建',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '打印',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '新生资料导入',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '报名人数统计',
                onClick: () => {
                    /**/
                },
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
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '审核',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            showOrg: false,
            curOrgId: undefined,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
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
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
};
</script>
<style lang="less" scoped>
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
