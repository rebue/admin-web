<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="true"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                        :commands="tableCommands"
                        :query="{ orgId: curOrgId }"
                    >
                    </crud-table>
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
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|20': [
                        {
                            'homework|+1': 10000,
                            homeworkName: '@csentence(4,9)',
                            describe: '@cparagraph(1)',
                            time: '@date(yyyy-MM-dd hh:mm:ss)',
                            score: '@integer(0,100)',
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
                dataIndex: 'choose',
                title: '选择',
                width: 50,
                ellipsis: true,
            },
            {
                dataIndex: 'homework',
                title: '作业批次号',
                width: 60,
                ellipsis: true,
            },
            {
                dataIndex: 'homeworkName',
                title: '作业名称',
                width: 100,
                ellipsis: true,
            },
            {
                dataIndex: 'describe',
                title: '作业描述',
                width: 210,
                ellipsis: true,
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'score',
                title: '成绩',
                width: 60,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: () => {
                    /**/
                },
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

        return {
            columns,
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
    },
};
</script>
<style lang="less" scoped></style>
