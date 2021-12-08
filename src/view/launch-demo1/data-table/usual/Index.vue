<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :query="{ orgId: curOrgId }"
                    :scrollX="600"
                    :defaultPagination="false"
                >
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                :ref="`orgTree.platform`"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
                            <div class="table-divider"></div>
                        </div>
                    </template>
                    <template #commands>
                        <a-form-model layout="inline">
                            <a-form-model-item label="开始与结束时间">
                                <a-range-picker
                                    :default-value="[
                                        moment('2021/08/31', dateFormat),
                                        moment('2021/12/31', dateFormat),
                                    ]"
                                    :format="dateFormat"
                                />
                            </a-form-model-item>
                            <a-form-model-item label="培训次数">
                                <a-input></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="显示前n条记录">
                                <a-input></a-input>
                            </a-form-model-item>
                        </a-form-model>
                    </template>
                </crud-table>
            </template>
        </base-manager>
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';
import moment from 'moment';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        updator: 'zzm',
                        updatedTime: '2021-12-01 16:39:00',
                        course: '计算机科学与技术',
                        startTime: '2021-12-04 16:39:00',
                        student: '章三',
                        before: 'xx',
                        after: 'xx',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
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
        // 初始化数据end
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 100,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'birth',
                title: '出生年月',
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'total',
                title: '培训次数',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     // icon: 'plus',
            //     title: '新建',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看详细',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            showOrg: false,
            curOrgId: undefined,
            moment,
            dateFormat: 'YYYY/MM/DD',
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
};
</script>
<style lang="less" scoped>
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
