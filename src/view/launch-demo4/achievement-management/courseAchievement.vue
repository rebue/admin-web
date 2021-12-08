// 课程成绩
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="true">
                    <template #left>
                        <a-tabs>
                            <a-tab-pane :key="1" tab="目录1"></a-tab-pane>
                            <a-tab-pane :key="2" tab="目录2"></a-tab-pane>
                        </a-tabs>
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
                            name: '@cname',
                            'stuNum|100000000-200000000': 111111111,
                            'allMakeUpExamAchievement1|100-150': 100,
                            'homeworkAchievement|10-20': 20,
                            'attendanceAchievement|5-10': 0,
                            'achievement|30-40': 20,
                            'makeUpExamAchievement|40-60': 100,
                            'courseAchievement|80-100': 100,
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
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',
                width: 150,
            },
            {
                dataIndex: 'homeworkAchievement',
                title: '作业成绩',
                width: 150,
            },
            {
                dataIndex: 'attendanceAchievement',
                title: '考勤成绩',
                width: 150,
            },
            {
                dataIndex: 'achievement',
                title: '卷面成绩',
                width: 150,
            },
            {
                dataIndex: 'makeUpExamAchievement',
                title: '补考成绩',
                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement1',
                title: '总补考成绩',
                width: 150,
            },
            {
                dataIndex: 'courseAchievement',
                title: '课程成绩',
                width: 150,
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
