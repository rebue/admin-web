// 报名录入
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
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
                dataIndex: 'grade',
                title: '年级',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 140,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'id',
                title: '身份证号',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'Culture',
                title: '文化程度',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'majorStudied',
                title: '所学专业',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'gradSchool',
                title: '毕业院校',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'gradTime',
                title: '毕业时间',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'workTime',
                title: '工作时间',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'diplomaNum',
                title: '毕业证号',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'Political',
                title: '政治面貌',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'partyData',
                title: '入党时间',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'workPlace',
                title: '工作所在地',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '导出',
                onClick: this.handleAdd,
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
                title: '查看',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
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
