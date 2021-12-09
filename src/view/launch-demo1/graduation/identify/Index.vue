<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
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
                                :row-selection="rowSelection"
                            >
                                <template #commands>
                                    <a-form-model layout="inline">
                                        <a-form-model-item>
                                            <a-button>设置鉴定模块</a-button>
                                        </a-form-model-item>
                                        <a-form-model-item>
                                            <a-select default-value="lucy" style="width: 120px">
                                                <a-select-option value="lucy"> 毕业鉴定 </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item>
                                            <a-select default-value="lucy" style="width: 120px">
                                                <a-select-option value="lucy"> 批量打印 </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item>
                                            <a-button>填写班级学习内容</a-button>
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
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    props: {
        /** 是否显示checkbox */
        rowSelection: {
            type: Object,
            default: null,
        },
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            status: '未填',
                            'group|+1': 100,
                            name: '@cname()',
                            sex: '@pick(["男","女"])',
                            post: '@pick(["班长","副班长","学习委员"])',
                            grade: '@pick(["1班","2班","3班"])',
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
                dataIndex: 'status',
                title: '状态',
                width: 80,
                ellipsis: true,
            },
            {
                dataIndex: 'group',
                title: '组号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 80,
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

        const treeData = [
            {
                title: '所有学期',
                key: '100',
            },
            {
                title: '2021年秋季学期',
                key: '101',
                children: [
                    {
                        title: '防范化解重大风险能力和突发公共事件应急能力提升专题研讨班',
                        key: '101-1',
                    },
                    {
                        title: '开班临时测试(测试需要)',
                        key: '101-2',
                    },
                    {
                        title: '全区党校(行政院校)系统师资培训班(第21期)',
                        key: '101-3',
                    },
                    {
                        title: '全区党校(行政院校)系统师资培训班（第22期)',
                        key: '101-4',
                    },
                    {
                        title: '全区非公企业党组织书记专题研讨班',
                        key: '101-5',
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
