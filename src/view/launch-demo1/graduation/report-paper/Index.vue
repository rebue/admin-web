<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="true"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="false"
                    >
                        <template #commands>
                            <a-form-model layout="inline">
                                <a-form-model-item>
                                    <a-select default-value="lucy" style="width: 120px">
                                        <a-select-option value="lucy">
                                            2021年秋季学期
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item>
                                    <a-select default-value="lucy" style="width: 120px">
                                        <a-select-option value="lucy">
                                            全区党校（行政院长）系统咨询
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <div class="btn-group">
                                    <a-button type="primary" class="btn">编辑</a-button>
                                    <a-button type="primary" class="btn">查看</a-button>
                                    <a-button type="primary" class="btn">批量录入分数</a-button>
                                </div>
                            </a-form-model>
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
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '班级',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'semester',
                title: '学期',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'report',
                title: '咨政报告评分',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'graduation',
                title: '毕业论文评分',
                width: 150,
                ellipsis: true,
            },
        ];

        return {
            columns,
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
