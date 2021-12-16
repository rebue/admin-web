<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5" style="overflow:auto">
                        <a-tree show-icon :defaultExpandAll="true" :tree-data="treeData">
                            <a-icon slot="clock-circle" type="clock-circle-o" />
                        </a-tree>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="true"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
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
                    'list|20': [
                        {
                            term: '@date(2021年)@cword("秋")季学期',
                            'class|+1': [
                                '第1期中青年干部培训一班',
                                '第2期全区党校(行政院校)系统师资培训班',
                                '第3期全区党校(行政院校)系统师资培训班',
                                '第4期全区党校(行政院校)系统师资培训班',
                                '第5期中青年干部培训二班班',
                                '第6期县处级领导干部进修班',
                            ],
                            activate: '@pick(["课程"])',
                            'date|+1':
                                '@pick(["2021-09-08","2021-11-05","2021-10-11","2021-09-22"])@pick(["上午","下午"])',
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
                dataIndex: 'no',
                title: '序号',
                width: 150,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'term',
                title: '学期',
                width: 150,
            },
            {
                dataIndex: 'class',
                title: '班级',
                width: 200,
            },
            {
                dataIndex: 'activate',
                title: '课程或活动',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '日期',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 250,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '新建',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看考勤记录',
                onClick: () => {
                    /**/
                },
            },
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
                        title: '第1期中青年干部培训一班',
                        key: '101-2',
                    },
                    {
                        title: '第2期全区党校(行政院校)系统师资培训班',
                        key: '101-4',
                    },
                    {
                        title: '第3期全区党校(行政院校)系统师资培训班',
                        key: '101-3',
                    },
                    {
                        title: '第4期全区党校(行政院校)系统师资培训班',
                        key: '101-5',
                    },
                    {
                        title: '第5期中青年干部培训二班班',
                        key: '101-6',
                    },
                    {
                        title: '第6期县处级领导干部进修班',
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
