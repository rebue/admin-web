// 录取管理
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
                ellipsis: true,
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
            },
            {
                dataIndex: 'teachPointNum',
                title: '教学点',
                ellipsis: true,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
            },
            {
                dataIndex: 'number',
                title: '序号',
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
            },
            {
                dataIndex: 'totalScore',
                title: '总成绩',
                ellipsis: true,
            },
            {
                dataIndex: 'admission',
                title: '录取',
                ellipsis: true,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                ellipsis: true,
            },
            {
                dataIndex: 'id',
                title: '身份证号',
                ellipsis: true,
            },
            {
                dataIndex: 'birthDate',
                title: '出生时间',
                ellipsis: true,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                ellipsis: true,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                ellipsis: true,
            },
            {
                dataIndex: 'majorStudied',
                title: '所学专业',
                ellipsis: true,
            },
            {
                dataIndex: 'graduationSchool',
                title: '毕业院校',
                ellipsis: true,
            },
            {
                dataIndex: 'graduationDate',
                title: '毕业时间',
                ellipsis: true,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                ellipsis: true,
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
                title: '保存',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '全部',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '录取',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '未录取',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '转专业',
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
