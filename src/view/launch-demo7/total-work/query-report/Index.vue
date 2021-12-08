<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row>
                        <a-col :span="5">
                            <div class="table-left">
                                <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData1" />
                                <div class="table-divider"></div>
                                <a-divider type="vertical" />
                                <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData2" />
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
                                :commands="tableCommands"
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
                    'list|1-20': [
                        {
                            teacher: '@cname',
                            teaching: '@integer(0,200)',
                            research: '@float(0,200,0,1)',
                            one: 0,
                            tow: 0,
                            three: 0,
                            four: 0,
                            'teaching-total': '@integer(0,200)',
                            'research-total': '@float(0,200,0,1)',
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
                dataIndex: 'teacher',
                title: '教师',
                width: 100,
                ellipsis: true,
            },
            {
                dataIndex: 'teaching',
                title: '2019年教学工作量',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'research',
                title: '2019年科研工作量',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'one',
                title: '',
                width: 50,
                ellipsis: true,
            },
            {
                dataIndex: 'tow',
                title: '',
                width: 50,
                ellipsis: true,
            },
            {
                dataIndex: 'three',
                title: '',
                width: 50,
                ellipsis: true,
            },
            {
                dataIndex: 'four',
                title: '',
                width: 50,
                ellipsis: true,
            },
            {
                dataIndex: 'teaching-total',
                title: '2019年-2019年教学工作量合计',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'research-total',
                title: '2019年-2019年科研工作量合计',
                width: 250,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '重新生成报表',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '清空报表',
                onClick: () => {
                    /**/
                },
            },
        ];

        const treeData1 = [
            {
                title: '2019年工作量报表',
                key: '11',
            },
            {
                title: '2015年至2017年三年工作量报表',
                key: '12',
            },
        ];
        const treeData2 = [
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
            treeData1,
            treeData2,
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
