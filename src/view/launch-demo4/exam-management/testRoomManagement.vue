// 考场管理
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
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
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'majer',
                title: '教学点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'courseName',
                title: '课程名称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examStartData',
                title: '考场地址',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examEndData',
                title: '考场编号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '考场人数',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '实际编排人数',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '考点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
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
                title: '复制',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '粘贴',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '实际人数',
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
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
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
