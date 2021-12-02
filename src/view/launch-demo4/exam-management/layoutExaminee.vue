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
                    :rowSelection="{}"
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
                dataIndex: 'teathPoint',
                title: '教学点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'majer',
                title: '专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examQualification',
                title: '报考资格',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examinationRoomSite',
                title: '考场地址',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'seatNum',
                title: '座位号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
                width: 150,
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
                title: '移出考场',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
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
