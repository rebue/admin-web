// 编排考生
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :query="{ orgId: curOrg.id }"
                    :commands="tableCommands"
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
                dataIndex: 'grade',
                title: '年级',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'teathPoint',
                title: '教学点',
                ellipsis: true,
            },
            {
                dataIndex: 'majer',
                title: '专业',
                ellipsis: true,
            },
            {
                dataIndex: 'number',
                title: '序号',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'examQualification',
                title: '报考资格',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'examinationRoomSite',
                title: '考场地址',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'seatNum',
                title: '座位号',
                width: 150,
                fixed: 'right',
            },
            {
                dataIndex: 'shift',
                title: '班次',
                width: 150,
                fixed: 'right',
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '添加考生',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '移出考场',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '清空编排',
                onClick: this.handleAdd,
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
