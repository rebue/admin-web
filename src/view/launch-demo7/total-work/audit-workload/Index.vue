<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="部门审核表">
                            <div>
                                <crud-table
                                    ref="crudTable"
                                    :showKeywords="false"
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
                                    <template #commands>
                                        <a-form-model layout="inline">
                                            <a-form-model-item>
                                                <a-select default-value="lucy" style="width: 120px">
                                                    <a-select-option value="lucy"> 2021年 </a-select-option>
                                                </a-select>
                                            </a-form-model-item>
                                            <div class="btn-group">
                                                <a-button type="primary" class="btn">导出</a-button>
                                                <a-button type="primary" class="btn">审核通过</a-button>
                                                <a-button type="primary" class="btn">审核不通过</a-button>
                                            </div>
                                        </a-form-model>
                                    </template>
                                </crud-table>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="职称审核表" force-render>
                            <div>
                                <crud-table
                                    ref="crudTable2"
                                    :showKeywords="false"
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
                                    <template #commands>
                                        <a-form-model layout="inline">
                                            <a-form-model-item>
                                                <a-select default-value="lucy" style="width: 120px">
                                                    <a-select-option value="lucy"> 2021年 </a-select-option>
                                                </a-select>
                                            </a-form-model-item>
                                            <div class="btn-group">
                                                <a-button type="primary" class="btn">导出</a-button>
                                                <a-button type="primary" class="btn">审核通过</a-button>
                                                <a-button type="primary" class="btn">审核不通过</a-button>
                                            </div>
                                        </a-form-model>
                                    </template>
                                </crud-table>
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </base-manager>
            <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
        </fragment>
    </div>
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
                dataIndex: 'name',
                title: '姓名',
                width: 120,
                ellipsis: true,
            },
            {
                title: '教务处',
                width: 150,
                dataIndex: 'dept',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'dept',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'dept',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'dept',
                        width: 50,
                    },
                ],
            },
            {
                title: '公培处',
                width: 150,
                dataIndex: 'train',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'train',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'train',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'train',
                        width: 50,
                    },
                ],
            },
            {
                title: '应急部',
                width: 150,
                dataIndex: 'emergency',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                ],
            },
            {
                title: '网络部',
                width: 150,
                dataIndex: 'network',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'network',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'network',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'network',
                        width: 50,
                    },
                ],
            },
            {
                title: '领导力',
                width: 150,
                dataIndex: 'leader',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'leader',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'leader',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'leader',
                        width: 50,
                    },
                ],
            },
            {
                title: '机关党委相关',
                width: 150,
                dataIndex: 'office',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'office',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'office',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'office',
                        width: 50,
                    },
                ],
            },
            {
                title: '人事处',
                width: 150,
                dataIndex: 'personnel',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                ],
            },
            {
                title: '业务指导处',
                width: 150,
                dataIndex: 'business',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'business',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'business',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'business',
                        width: 50,
                    },
                ],
            },
            {
                title: '学员处',
                width: 150,
                dataIndex: 'students',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'students',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'students',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'students',
                        width: 50,
                    },
                ],
            },
            {
                title: '总工作量',
                width: 150,
                dataIndex: 'total',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'total',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'total',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'total',
                        width: 50,
                    },
                ],
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
        /** 切换面板的回调 */
        callback(activeKey) {
            console.log(activeKey);
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
