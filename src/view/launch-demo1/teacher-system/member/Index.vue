<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline">
                    <a-form-model-item label="选择学期">
                        <a-select default-value="lucy" style="width: 180px">
                            <a-select-option value="lucy">
                                2021年秋季学期
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-select default-value="lucy" style="width: 250px">
                            <a-select-option value="lucy">
                                第1期中青年干部培训一班
                            </a-select-option>
                            <a-select-option value="2">
                                第2期全区党校(行政院校)系统师资培训班
                            </a-select-option>
                            <a-select-option value="3">
                                第3期全区党校(行政院校)系统师资培训班
                            </a-select-option>
                            <a-select-option value="4">
                                第4期全区党校(行政院校)系统师资培训班
                            </a-select-option>
                            <a-select-option value="5">
                                第5期中青年干部培训二班班
                            </a-select-option>
                            <a-select-option value="5">
                                第6期县处级领导干部进修班
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
                <a-row type="flex">
                    <a-col :span="5">
                        <div class="table-left">
                            <a-tree
                                :defaultExpandAll="true"
                                show-icon
                                :tree-data="treeData"
                                :default-selected-keys="['101']"
                            >
                                <a-icon slot="team" type="team" />
                            </a-tree>
                        </div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs>
                            <a-tab-pane :key="1" tab="考勤统计"></a-tab-pane>
                            <a-tab-pane :key="2" tab="评课统计"></a-tab-pane>
                        </a-tabs>
                        <div>考勤情况</div>
                        <a-row type="flex" style="margin: 20px 0;padding: 20px;background:#ededed">
                            <a-col :flex="1"> 正常：<a-button type="link">20 </a-button> </a-col>
                            <a-col :flex="1"> 迟到：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 早退：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 请假：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 缺勤：<a-button type="link">0</a-button> </a-col>
                        </a-row>
                        <div>出勤情况</div>

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
                            :rowSelection="{}"
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
// import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        const treeData = [
            {
                title: '中青年干部培训班一班',
                key: '1',
                children: [
                    {
                        title: '于磊',
                        key: '101',
                    },
                    {
                        title: '陆娟',
                        key: '102',
                    },
                    {
                        title: '苏霞',
                        key: '103',
                    },
                    {
                        title: '蒋军',
                        key: '104',
                    },
                    {
                        title: '万涛',
                        key: '105',
                    },
                    {
                        title: '史洋',
                        key: '106',
                    },
                    {
                        title: '曹杰',
                        key: '107',
                    },
                    {
                        title: '刘娟',
                        key: '108',
                    },
                    {
                        title: '钱刚',
                        key: '109',
                    },
                    {
                        title: '谭丽',
                        key: '1010',
                    },
                ],
            },
            // {
            //     title: '中青年干部培训班二班',
            //     key: '2',
            //     children: [
            //         {
            //             title: '班级1',
            //             key: '201',
            //         },
            //         {
            //             title: '班级2',
            //             key: '202',
            //         },
            //         {
            //             title: '班级3',
            //             key: '203',
            //         },
            //     ],
            // },
        ];

        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                const mockList = require('mockjs').mock({
                    'list|20': [
                        {
                            activate: '报到',
                            'student|+1':
                                '于磊' ||
                                treeData[0].children.map(v => {
                                    return v.title;
                                }),
                            // inTime: '@date(yyyy-MM-dd hh:mm:ss)',
                            // outTime: '@date(yyyy-MM-dd hh:mm:ss)',
                            'inTime|+1': [
                                '2021-12-17 08:25',
                                '2021-12-16 08:13',
                                '2021-12-15 08:30',
                                '2021-12-14 08:29',
                                '2021-12-13 08:27',
                                '2021-12-12 08:20',
                            ],
                            'outTime|+1': [
                                '2021-12-17 11:45',
                                '2021-12-16 11:35',
                                '2021-12-15 11:31',
                                '2021-12-14 11:50',
                                '2021-12-13 11:37',
                                '2021-12-12 11:40',
                            ],
                            type: '@pick(["刷卡","录入","修改"])',
                            way: '刷卡',
                            status: '正常',
                            desc: '',
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
                width: 80,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'activate',
                title: '课程或活动',
                width: 150,
            },
            {
                dataIndex: 'student',
                title: '学员',
                width: 150,
            },
            {
                dataIndex: 'inTime',
                title: '进入时间',
                width: 200,
            },

            {
                dataIndex: 'outTime',
                title: '离开时间',
                width: 200,
                ellipsis: true,
            },
            {
                dataIndex: 'way',
                title: '考勤方式',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'status',
                title: '状态',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '备注',
                width: 150,
                ellipsis: true,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 250,
            //     scopedSlots: { customRender: 'action' },
            // },
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
            // {
            //     type: 'a',
            //     title: '查看考勤',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        return {
            columns,
            treeData,
            checkedKeys: [],
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
