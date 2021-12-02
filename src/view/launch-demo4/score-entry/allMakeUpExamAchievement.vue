// 总补考成绩
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="目录1"></a-tab-pane>
                    <a-tab-pane :key="2" tab="目录2"></a-tab-pane>
                </a-tabs>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
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
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement1',
                title: '总补考成绩1',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement2',
                title: '总补考成绩2',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'usualAchievement',
                title: '平时成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'attendanceAchievement',
                title: '考勤成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'achievement',
                title: '卷面成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'makeUpExamAchievement',
                title: '补考成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'subjectAchievement',
                title: '科目成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 60,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '编辑未录入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '编辑全部',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清空成绩',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '发布成绩',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
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
