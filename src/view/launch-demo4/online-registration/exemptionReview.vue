// 免试资格审核
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    :showKeywords="true"
                    ref="crudTable"
                    :query="{ orgId: curOrg.id }"
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
import request from '@/util/request';

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
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 140,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
            },
            {
                dataIndex: 'examQualifications',
                title: '报考资格',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'ExemptExamQualifications',
                title: '免试资格',
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
                dataIndex: 'classes',
                title: '班次',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'major',
                title: '专业',
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
                dataIndex: 'nation',
                title: '民族',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'phone',
                title: '电话',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'post',
                title: '职务',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'postLevel',
                title: '职级',
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
                dataIndex: 'workCity',
                title: '工作所在城市',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'workCompany',
                title: '工作单位',
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
                title: '保存',
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
        ];

        return {
            columns,
            showOrg: false,
            curOrg: '',
        };
    },
    mounted() {
        this.crudTable = this.$refs['orgTree.platform'];
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleOrgMenuClick(item) {
            this.curOrg = item;
            this.refreshTableData();
            //
        },
        handleOrgTreeSelect(item) {
            this.curOrg = item;
            //
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
