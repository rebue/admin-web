<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5">
                        <div class="table-left">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData">
                                <a-icon slot="area-chart" type="area-chart-o" />
                            </a-tree>
                        </div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                            <template #commands>
                                <a-form-model layout="inline">
                                    <a-form-model-item label="开始与结束时间">
                                        <a-range-picker
                                            :default-value="[
                                                moment('2021/08/31', dateFormat),
                                                moment('2021/12/31', dateFormat),
                                            ]"
                                            :format="dateFormat"
                                        />
                                    </a-form-model-item>
                                    <a-form-model-item label="培训次数">
                                        <a-input></a-input>
                                    </a-form-model-item>
                                    <a-form-model-item label="显示前n条记录">
                                        <a-input></a-input>
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
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import moment from 'moment';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '最常来的学员排名',
                key: '1',
                // children: [
                //     {
                //         title: '学员1',
                //         key: '101',
                //     },
                //     {
                //         title: '学员2',
                //         key: '102',
                //     },
                //     {
                //         title: '学员3',
                //         key: '103',
                //     },
                // ],
            },
            {
                title: '最常来的单位排名',
                key: '2',
                // children: [
                //     {
                //         title: '单位1',
                //         key: '201',
                //     },
                //     {
                //         title: '单位2',
                //         key: '202',
                //     },
                //     {
                //         title: '单位3',
                //         key: '203',
                //     },
                // ],
            },
            {
                title: '重点培养对象统计',
                key: '3',
                // children: [
                //     {
                //         title: '对象1',
                //         key: '301',
                //     },
                //     {
                //         title: '对象2',
                //         key: '302',
                //     },
                //     {
                //         title: '对象3',
                //         key: '303',
                //     },
                // ],
            },
            {
                title: '每人参加相同培训总次数排名',
                key: '4',
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                const mockList = require('mockjs').mock({
                    'list|20': [
                        {
                            name: '@cname()',
                            sex: '@pick(["男","女"])',
                            'birth|+1': ['1995-11', '1996-04', '1997-10', '1998-08'],
                            nation: '@pick(["汉族","壮族"])',
                            total: '@integer(1,9)',
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
        // 初始化数据end
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 100,
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
                dataIndex: 'nation',
                title: '民族',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'total',
                title: '培训次数',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     // icon: 'plus',
            //     title: '新建',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看详细',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            treeData,
            curOrgId: undefined,
            moment,
            dateFormat: 'YYYY/MM/DD',
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
