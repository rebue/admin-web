<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="必修课"></a-tab-pane>
                    <a-tab-pane :key="2" tab="选修课"></a-tab-pane>
                    <a-tab-pane :key="3" tab="周五大讲堂"></a-tab-pane>
                </a-tabs>
                <a-form-model layout="inline">
                    <a-form-model-item>
                        <a-select default-value="lucy" style="width: 120px">
                            <a-select-option value="lucy">
                                2021年秋季学期
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-select default-value="lucy">
                            <a-select-option value="lucy">
                                01中青年干部培训一班（第45期）
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
                <crud-table
                    ref="crudTable"
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
                            <a-form-model-item>
                                <a-range-picker
                                    :default-value="[
                                        moment('2021/08/31', dateFormat),
                                        moment('2021/12/31', dateFormat),
                                    ]"
                                    :format="dateFormat"
                                />
                            </a-form-model-item>
                            <a-form-model-item>
                                <a-button type="primary" class="btn">查询</a-button>
                                <a-button type="primary" class="btn">打印</a-button>
                                <a-button type="primary" class="btn">导出班级评课Excel</a-button>
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
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 150,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 150,
            },
            {
                dataIndex: 'apm',
                title: '午别',
                width: 150,
            },
            {
                dataIndex: 'course',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'teacher',
                title: '任课教师',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'total',
                title: '评委人数',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'percent',
                title: '评课率',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'undo',
                title: '未评课',
                width: 150,
                ellipsis: true,
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
.btn {
    margin-right: 10px;
}
</style>
