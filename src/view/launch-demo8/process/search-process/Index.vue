//流程查询
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5">
                        <a-tree
                            v-model="checkedKeys"
                            :auto-expand-parent="autoExpandParent"
                            :default-selected-keys="selectedKeys"
                            :default-checked-keys="checkedKeys"
                            :default-expanded-keys="expandedKeys"
                            :tree-data="treeData"
                            @check="onCheck"
                            :defaultExpandAll="true"
                        />
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" tab="流程列表">
                                <a-col>
                                    <crud-table
                                        ref="crudTable"
                                        :commands="tableCommands"
                                        :columns="columns"
                                        :api="api"
                                        :query="{ orgId: curOrgId }"
                                        :scrollX="800"
                                        :defaultPagination="true"
                                        :rowSelection="{}"
                                        :showKeywords="true"
                                    >
                                    </crud-table>
                                </a-col>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="流程统计" force-render> 流程统计 </a-tab-pane>
                            <a-tab-pane key="3" tab="审批统计">
                                <a-col>
                                    <base-manager ref="baseManager">
                                        <template #managerCard>
                                            <div style="float: left">
                                                <a-select
                                                    :default-value="process[0]"
                                                    style="width: 100px; margin-right: 15px"
                                                    @change="handleProvinceChange"
                                                >
                                                    <a-select-option v-for="process in process" :key="process">
                                                        {{ process }}
                                                    </a-select-option>
                                                </a-select>
                                                <a-select
                                                    :default-value="approver[0]"
                                                    style="width: 80px"
                                                    @change="handleProvinceChange"
                                                >
                                                    <a-select-option v-for="approver in approver" :key="approver">
                                                        {{ approver }}
                                                    </a-select-option>
                                                </a-select>
                                            </div>
                                            <crud-table
                                                ref="crudTable"
                                                :columns="columns03"
                                                :api="api"
                                                :query="{ orgId: curOrgId }"
                                                :scrollX="800"
                                                :defaultPagination="true"
                                                :rowSelection="{}"
                                                :showKeywords="true"
                                            >
                                            </crud-table>
                                        </template>
                                    </base-manager>
                                </a-col>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';

const process = ['流程环节', '流程环节2', '流程环节3'];
const approver = ['审批人', '审批人2', '审批人3'];
export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            process: '网上发布(部门新闻)',
                            title:
                                '@pick(["后勤服务中心举办消防知识宣传讲座","2020级中共党史党建专业在职研究生班举行党史学习交流研讨会","院举办全区退役军人工作专题研修班","财务处组织开展我为教职工办实事解难题联合主题党日活动","固定资产卡片信息变更申请表","促党建提业务强队伍----网络培训部党支部开展党建理论和业务工作学习","注重学习教育宣传，营造干事创业氛围","业务指导工作处党支部开展“缅怀革命先烈、追寻英雄精神”主题党日活动"])',
                            state: '@pick(["运行","完成"])',
                            initiator: '@cname',
                            startDate: '@datetime',
                            endDate: '@datetime',
                            'num|1+': 1,
                            approver: '@cname',
                            process03: '@pick(["拟稿","送办","校办领导批示","处室审阅","处室会签"])',
                            'handleNum|0-300': 1,
                            'handleTime|1-5.1-9': 1.1,
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
        const treeData = [
            {
                title: '办公管理',
                key: '1',
                children: [
                    {
                        title: '网上发布',
                        key: '101',
                    },
                    {
                        title: '邀请函',
                        key: '102',
                    },
                    {
                        title: '接待审批流程',
                        key: '103',
                    },
                    {
                        title: '收文办理(校内呈文)',
                        key: '104',
                    },
                    {
                        title: '发文办理(红头文件)',
                        key: '105',
                    },
                    {
                        title: '网上发布',
                        key: '106',
                    },
                ],
            },
            {
                title: '行政管理',
                key: '2',
                children: [
                    {
                        title: '文印登记',
                        key: '201',
                    },
                ],
            },
        ];

        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     width: 50,
            // },
            {
                dataIndex: 'process',
                title: '流程',
                width: 200,
            },
            {
                dataIndex: 'title',
                title: '标题',
                width: 800,
            },
            {
                dataIndex: 'state',
                title: '状态',
                width: 200,
            },
            {
                dataIndex: 'initiator',
                title: '发起人',
                width: 200,
            },
            {
                dataIndex: 'startDate',
                title: '启动时间',
                width: 250,
            },
            {
                dataIndex: 'endDate',
                title: '结束时间',
                width: 250,
            },
        ];
        const columns03 = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'num',
                title: '序号',
                width: 200,
            },
            {
                dataIndex: 'approver',
                title: '审批人',
                width: 150,
            },
            {
                dataIndex: 'process03',
                title: '流程环节',
                width: 200,
            },
            {
                dataIndex: 'handleNum',
                title: '办理数量',
                width: 200,
            },
            {
                dataIndex: 'handleTime',
                title: '平均办理时长(小时)',
                width: 200,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '表单',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.api = {
            page,
            listAll: page,
            list: page,
        };
        return {
            expandedKeys: ['2021', '20211'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            columns,
            columns03,
            showOrg: false,
            curOrgId: undefined,
            process,
            approver,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 新增事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 编辑事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 删除事件
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
    watch: {
        checkedKeys(val) {
            console.log('onCheck', val);
        },
    },
};
</script>

<style type="text/css">
.ant-row {
    background-color: #ffffff;
}
</style>
