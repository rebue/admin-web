<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-form-model layout="inline">
                        <a-row type="flex" justify="space-around" align="middle">
                            <a-col :span="12">
                                <a-form-model-item label="计划日期">
                                    开始
                                    <a-date-picker />
                                    结束
                                    <a-date-picker />
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item label="部门">
                                    <a-select placeholder="请选择" style="width: 300px">
                                        <a-select-option value="1">
                                            人事部
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item label="计划类型">
                                    <a-checkbox>
                                        日计划
                                    </a-checkbox>
                                    <a-checkbox>
                                        周计划
                                    </a-checkbox>
                                    <a-checkbox>
                                        月计划
                                    </a-checkbox>
                                    <a-checkbox>
                                        年计划
                                    </a-checkbox>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item label="统计类型">
                                    <a-select placeholder="请选择" style="width: 270px">
                                        <a-select-option value="1">
                                            按用户总结次数统计
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-button class="btn">提交</a-button>
                            <a-button class="btn">帮助</a-button>
                        </a-row>
                    </a-form-model>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="false"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="false"
                    >
                        <template #commands>
                            <p>计划总量统计结果：</p>
                        </template>
                    </crud-table>
                </template>
            </base-manager>
            <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'schedule-count',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },

    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'number',
                title: '序号',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '部门',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: 'type',
                title: '计划总结类型',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: 'count',
                title: '次数',
                width: 120,
                ellipsis: true,
            },
        ];

        return {
            columns,
            showOrg: false,
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
.btn-group {
    float: left;
}
.btn {
    margin: 0 10px 0 10px;
}
</style>
