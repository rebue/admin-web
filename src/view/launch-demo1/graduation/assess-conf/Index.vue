<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <div>
                        <a-button class="btn">刷新</a-button>
                        <a-button class="btn">编辑</a-button>
                        <a-button class="btn">复制</a-button>
                        <a-button class="btn">权限管理</a-button>
                        <a-button class="btn">删除</a-button>
                        <a-button class="btn">新增评分项目</a-button>
                    </div>
                    <a-divider />
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
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
                                :commands="tableCommands"
                                :rowSelection="{}"
                            >
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
                    'list|4': [
                        {
                            'content|+1': [
                                '作为班级选手(代表)参加跨班主题党日等活动一-次',
                                '作为选手(代表)参加党性讲堂、党性分析等班级 集体活动- -次',
                                '热心为班集体或他人服务，表现突出，得到公认',
                                '未参加党组织生活或党性分析活动一次',
                            ],
                            score: '+@integer(1,5)',
                            demo: '党性教育“制高点”',
                            use: '@pick(["是","否"])',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 4,
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
                dataIndex: 'content',
                title: '分项及内容',
                width: 400,
                ellipsis: true,
            },
            {
                dataIndex: 'score',
                title: '加分加值',
                width: 100,
                ellipsis: true,
            },
            {
                dataIndex: 'demo',
                title: '评分项目',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'use',
                title: '是否使用',
                width: 150,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '删除',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
        ];
        const treeData = [
            {
                title: '主体班学员“两点—线”量化考核表(90分)',
                key: '101',
                children: [
                    {
                        title: '党性教育“制高点”(30分)',
                        key: '102',
                    },
                    {
                        title: '纪律“底线”(30分)学习成果“亮点”(30分)',
                        key: '103',
                    },
                    {
                        title: '学习成果“亮点”(30分)',
                        key: '104',
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
.btn {
    margin-right: 10px;
}
</style>
