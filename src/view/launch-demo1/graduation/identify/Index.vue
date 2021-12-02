<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :columns="columns"
                    :api="api"
                    :query="{ orgId: curOrgId }"
                    :scrollX="600"
                    :defaultPagination="false"
                    :row-selection="rowSelection"
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
                    <template #commands>
                        <a-form-model layout="inline" :model="formInline">
                            <a-form-model-item>
                                <a-select default-value="lucy" style="width: 120px" @change="handleTermChange">
                                    <a-select-option value="lucy">
                                        毕业鉴定
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item>
                                <a-select default-value="lucy" style="width: 120px" @change="handleTermChange">
                                    <a-select-option value="lucy">
                                        批量打印
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <div class="btn-group">
                                <a-button type="primary" class="btn">设置鉴定模块</a-button>
                                <a-button type="primary" class="btn">填写班级学习内容</a-button>
                            </div>
                        </a-form-model>
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
    props: {
        /** 是否显示checkbox */
        rowSelection: {
            type: Object,
            default: null,
        },
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'status',
                title: '状态',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'group',
                title: '组号',
                width: 150,
                fixed: 'left',
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
                ellipsis: true,
            },
            {
                dataIndex: 'post',
                title: '班级职务',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'grade',
                title: '班级',
                width: 150,
                ellipsis: true,
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
.btn-group {
    float: left;
}
.btn {
    margin: 0 10px 0 10px;
}
</style>
