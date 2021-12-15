//数据查询
<template>
    <div>
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
                            <crud-table
                                ref="crudTable"
                                :commands="tableCommands"
                                :columns="columns"
                                :api="api"
                                :query="{ orgId: curOrgId }"
                                :scrollX="800"
                                :defaultPagination="true"
                                :showKeywords="true"
                            >
                            </crud-table>
                        </a-col>
                    </a-row>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';

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
                            'num|100000-900000': 111111,
                            title:
                                '@pick(["后勤服务中心举办消防知识宣传讲座","2020级中共党史党建专业在职研究生班举行党史学习交流研讨会","院举办全区退役军人工作专题研修班","财务处组织开展我为教职工办实事解难题联合主题党日活动","固定资产卡片信息变更申请表","促党建提业务强队伍----网络培训部党支部开展党建理论和业务工作学习","注重学习教育宣传，营造干事创业氛围","业务指导工作处党支部开展“缅怀革命先烈、追寻英雄精神”主题党日活动"])',
                            author: '@cname',
                            department:
                                '@pick(["教工部",  "市县党校", "区纪检组", "跟班学习离职", "校-院领导", "办公室", "监控室"])',
                            'date|+1': [
                                '2021-01-22 04:58:38',
                                '2021-12-09 14:19:44',
                                '2021-11-13 10:52:31',
                                '2021-08-08 15:17:22',
                                '2021-5-15 16:36:46',
                                '2021-08-18 09:07:54',
                                '2021-11-23 10:52:32',
                                '2021-04-03 11:28:25',
                                '2021-05-06 08:00:05',
                                '2021-02-01 10:52:35',
                                '2021-12-01 12:34:25',
                            ],
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
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'num',
                title: '编号',
                width: 200,
            },
            {
                dataIndex: 'title',
                title: '标题',
                width: 800,
            },
            {
                dataIndex: 'author',
                title: '稿件作者',
                width: 200,
            },
            {
                dataIndex: 'department',
                title: '来文处室(单位)',
                width: 200,
            },
            {
                dataIndex: 'date',
                title: '来文时间',
                width: 200,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '流程',
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
            showOrg: false,
            curOrgId: undefined,
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
