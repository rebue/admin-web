// 成绩发布
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="平时成绩"></a-tab-pane>
                    <a-tab-pane :key="2" tab="卷面成绩"></a-tab-pane>
                    <a-tab-pane :key="3" tab="补考成绩"></a-tab-pane>
                    <a-tab-pane :key="4" tab="总补考成绩"></a-tab-pane>
                    <a-tab-pane :key="5" tab="课程成绩"></a-tab-pane>
                    <a-tab-pane :key="6" tab="综合成绩"></a-tab-pane>
                </a-tabs>
                <crud-table
                    ref="crudTable"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                ref="orgTree.platform"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
                            <div class="table-divider"></div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgTree from '@/view/rac/rac-org/Tree';
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
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
                            teachPoint: '@pick(["中国政法大学","广西区委党校"])',
                            achievementType: '平时成绩',
                            achievementState: '@pick(["已提交","未提交"])',
                            submitter: '@cname',
                            curriculum:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            inputType: '',
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
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 150,
            },
            {
                dataIndex: 'achievementType',
                title: '成绩类型',
                width: 150,
            },
            {
                dataIndex: 'achievementState',
                title: '成绩状态',
                width: 150,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                width: 150,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',
                width: 250,
            },
            {
                dataIndex: 'inputType',
                title: '录入类型',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '删除',
                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,
            showOrg: true,
            realm: {
                id: '1',
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            // this.$nextTick(this.refreshTableData);
        },
        handleAdd() {
            //
        },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
