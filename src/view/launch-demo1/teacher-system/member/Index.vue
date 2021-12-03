<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline">
                    <a-form-model-item label="选择学期">
                        <a-select default-value="lucy" style="width: 180px">
                            <a-select-option value="lucy">
                                2021年秋季学期
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-select default-value="lucy" style="width: 250px">
                            <a-select-option value="lucy">
                                中青年干部培训一班（第45期）
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
                <a-row>
                    <a-col :span="5">
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
                    </a-col>
                    <a-col :span="19">
                        <a-tabs>
                            <a-tab-pane :key="1" tab="考勤统计"></a-tab-pane>
                            <a-tab-pane :key="2" tab="评课统计"></a-tab-pane>
                        </a-tabs>
                        <div>考勤情况</div>
                        <a-row type="flex" style="margin: 20px 0;padding: 20px;background:#ededed">
                            <a-col :flex="1"> 正常：<a-button type="link">61 </a-button> </a-col>
                            <a-col :flex="1"> 迟到：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 早退：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 请假：<a-button type="link">0</a-button> </a-col>
                            <a-col :flex="1"> 缺勤：<a-button type="link">0</a-button> </a-col>
                        </a-row>
                        <div>出勤情况</div>

                        <crud-table
                            ref="crudTable"
                            :showKeywords="true"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="false"
                            :rowSelection="{}"
                        >
                            <!-- <template #left>
                                
                            </template> -->
                        </crud-table>
                    </a-col>
                </a-row>
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

export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        OrgTree,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'activate',
                title: '课程或活动',
                width: 150,
            },
            {
                dataIndex: 'student',
                title: '学员',
                width: 150,
            },
            {
                dataIndex: 'inTime',
                title: '进入时间',
                width: 150,
            },

            {
                dataIndex: 'outTime',
                title: '离开时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'outTime',
                title: '考勤方式',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'status',
                title: '状态',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '备注',
                width: 150,
                ellipsis: true,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 250,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
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
            // {
            //     type: 'a',
            //     title: '查看考勤',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        return {
            columns,
            showOrg: false,
            curOrgId: undefined,
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
