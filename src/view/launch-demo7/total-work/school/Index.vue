<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5">
                            <div class="table-left">
                                <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            </div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height:100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
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
                                            <a-button>打印</a-button>
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
                ellipsis: true,
            },
            {
                title: '教务处',
                width: 240,
                dataIndex: 'dept',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '公培处',
                width: 240,
                dataIndex: 'train',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '应急部',
                width: 240,
                dataIndex: 'emergency',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '网络部',
                width: 240,
                dataIndex: 'network',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '领导力',
                width: 240,
                dataIndex: 'leader',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '机关党委相关',
                width: 240,
                dataIndex: 'office',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '人事处',
                width: 240,
                dataIndex: 'personnel',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '业务指导处',
                width: 240,
                dataIndex: 'business',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '学员处',
                width: 240,
                dataIndex: 'students',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '总工作量',
                width: 240,
                dataIndex: 'total',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
        ];

        const treeData = [
            {
                title: '教工部',
                key: '101',
                children: [
                    {
                        title: '校(院)领导',
                        key: '101-1',
                    },
                    {
                        title: '办公室(业务指导工作处)',
                        key: '101-2',
                        children: [
                            {
                                title: '监控员',
                                key: '101-2-1',
                            },
                        ],
                    },
                    {
                        title: '组织人事',
                        key: '101-3',
                    },
                    {
                        title: '机关党委',
                        key: '101-4',
                    },
                    {
                        title: '财务处',
                        key: '101-5',
                    },
                    {
                        title: '资产管理处',
                        key: '101-6',
                    },
                    {
                        title: '学院工作处',
                        key: '101-7',
                    },
                ],
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
