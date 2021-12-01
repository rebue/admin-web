// 学员档案
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
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
                dataIndex: 'stuNum',
                title: '学号',
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
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'group',
                title: '小组',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'classDuties',
                title: '班级职务',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workUnit',
                title: '工作单位',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'duties',
                title: '职务',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'rank',
                title: '职级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '手机',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'telephone',
                title: '电话',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'zipCode',
                title: '邮编',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'partyDate',
                title: '入党时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'cultureDegree',
                title: '文化程度',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'id',
                title: '身份证号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                ellipsis: true,
                width: 150,
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
                title: '导入系统用户',
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
