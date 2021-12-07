<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="部门审核表">
                            <div>
                                <a-row>
                                    <a-col :span="5">
                                        <div class="table-left">
                                            <a-tree
                                                class="ant-card-body"
                                                :defaultExpandAll="true"
                                                :tree-data="treeData"
                                            />
                                            <div class="table-divider"></div>
                                        </div>
                                    </a-col>
                                    <a-col :span="19">
                                        <crud-table
                                            ref="crudTable"
                                            :showKeywords="false"
                                            :columns="columns"
                                            :api="api"
                                            :query="{ orgId: curOrgId }"
                                            :scrollX="600"
                                            :defaultPagination="true"
                                        >
                                            <template #commands>
                                                <a-form-model layout="inline">
                                                    <a-form-model-item>
                                                        <a-button>导出</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-button>审核通过</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-button>审核不通过</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-select default-value="lucy" style="width: 120px">
                                                            <a-select-option value="lucy"> 2021年 </a-select-option>
                                                        </a-select>
                                                    </a-form-model-item>
                                                </a-form-model>
                                            </template>
                                        </crud-table>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="职称审核表" force-render>
                            <div>
                                <a-row>
                                    <a-col :span="5">
                                        <div class="table-left">
                                            <a-tree
                                                class="ant-card-body"
                                                :defaultExpandAll="true"
                                                :tree-data="treeData"
                                            />
                                            <div class="table-divider"></div>
                                        </div>
                                    </a-col>
                                    <a-col :span="19">
                                        <crud-table
                                            ref="crudTable"
                                            :showKeywords="false"
                                            :columns="columns"
                                            :api="api"
                                            :query="{ orgId: curOrgId }"
                                            :scrollX="600"
                                            :defaultPagination="true"
                                        >
                                            <template #commands>
                                                <a-form-model layout="inline">
                                                    <a-form-model-item>
                                                        <a-button>导出</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-button>审核通过</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-button>审核不通过</a-button>
                                                    </a-form-model-item>
                                                    <a-form-model-item>
                                                        <a-select default-value="lucy" style="width: 120px">
                                                            <a-select-option value="lucy"> 2021年 </a-select-option>
                                                        </a-select>
                                                    </a-form-model-item>
                                                </a-form-model>
                                            </template>
                                        </crud-table>
                                    </a-col>
                                </a-row>
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

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },

    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            name: '@cname',
                            dept: '@integer(0,200)',
                            train: '@integer(0,200)',
                            emergency: '@integer(0,200)',
                            network: '@integer(0,200)',
                            leader: '@float(0,200,1,1)',
                            office: '@float(0,200,1,1)',
                            personnel: '@integer(0,200)',
                            business: '@integer(0,200)',
                            students: '@float(0,200,1,1)',
                            total: '@integer(1,200)',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        const columns = [
            {
                dataIndex: 'name',
                title: '姓名',
                width: 80,
                fixed: 'left',
            },
            {
                title: '教务处',
                width: 240,
                dataIndex: 'dept',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'dept',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'dept',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'dept',
                        width: 80,
                    },
                ],
            },
            {
                title: '公培处',
                width: 240,
                dataIndex: 'train',

                children: [
                    {
                        title: '计酬',
                        dataIndex: 'train',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'train',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'train',
                        width: 80,
                    },
                ],
            },
            {
                title: '应急部',
                width: 240,
                dataIndex: 'emergency',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'emergency',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'emergency',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'emergency',
                        width: 80,
                    },
                ],
            },
            {
                title: '网络部',
                width: 240,
                dataIndex: 'network',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'network',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'network',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'network',
                        width: 80,
                    },
                ],
            },
            {
                title: '领导力',
                width: 240,
                dataIndex: 'leader',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'leader',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'leader',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'leader',
                        width: 80,
                    },
                ],
            },
            {
                title: '机关党委相关',
                width: 240,
                dataIndex: 'office',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'office',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'office',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'office',
                        width: 80,
                    },
                ],
            },
            {
                title: '人事处',
                width: 240,
                dataIndex: 'personnel',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'personnel',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'personnel',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'personnel',
                        width: 80,
                    },
                ],
            },
            {
                title: '业务指导处',
                width: 240,
                dataIndex: 'business',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'business',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'business',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'business',
                        width: 80,
                    },
                ],
            },
            {
                title: '学员处',
                width: 240,
                dataIndex: 'students',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'students',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'students',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'students',
                        width: 80,
                    },
                ],
            },
            {
                title: '总工作量',
                width: 240,
                dataIndex: 'total',
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'total',
                        width: 80,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'total',
                        width: 80,
                    },
                    {
                        title: '小计',
                        dataIndex: 'total',
                        width: 80,
                    },
                ],
            },
        ];
        const treeData = [
            {
                title: '离退休人员',
                key: '101',
            },
            {
                title: '党史党建教研部',
                key: '102',
            },
            {
                title: '哲学教研部(社会学教研部)',
                key: '103',
            },
            {
                title: '经济学教研部',
                key: '104',
            },
            {
                title: '公共管理教研部',
                key: '105',
            },
            {
                title: '文史教研部',
                key: '106',
            },
            {
                title: '法学教研部',
                key: '107',
            },
        ];

        return {
            columns,
            treeData,
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
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    width: 200px;
    overflow: scroll;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
