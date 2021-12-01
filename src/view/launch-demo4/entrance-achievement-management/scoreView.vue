// 报名录入
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="false">
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
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                ellipsis: true,
            },
            {
                dataIndex: 'firstFraction',
                title: '一次录入分数',
                ellipsis: true,
            },
            {
                dataIndex: 'secondFraction',
                title: '二次录入分数',
                ellipsis: true,
            },
            {
                dataIndex: 'totalScore',
                title: '总分',
                ellipsis: true,
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
