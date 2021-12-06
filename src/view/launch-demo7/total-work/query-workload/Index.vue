<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-form-model layout="inline">
                        <a-row>
                            <a-form-model-item label="年份">
                                <a-select placeholder="请选择" style="width: 300px">
                                    <a-select-option value="2021">
                                        2021
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="职称">
                                <a-input />
                            </a-form-model-item>
                        </a-row>
                        <a-row>
                            <a-form-model-item label="职称级别">
                                <a-radio-group>
                                    <a-radio :value="1">
                                        中级
                                    </a-radio>
                                    <a-radio :value="2">
                                        初级
                                    </a-radio>
                                    <a-radio :value="3">
                                        正高级
                                    </a-radio>
                                    <a-radio :value="4">
                                        副高级
                                    </a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                        </a-row>
                        <a-row>
                            <a-form-model-item label="人员编制">
                                <a-radio-group>
                                    <a-radio :value="1">
                                        其他
                                    </a-radio>
                                    <a-radio :value="2">
                                        工勤人员
                                    </a-radio>
                                    <a-radio :value="3">
                                        参公人员
                                    </a-radio>
                                    <a-radio :value="4">
                                        事业专技术人员(专职教师)
                                    </a-radio>
                                    <a-radio :value="5">
                                        事业专技术人员(非专职教师)
                                    </a-radio>
                                    <a-radio :value="6">
                                        事业管理岗
                                    </a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                        </a-row>
                        <a-row>
                            <a-form-model-item label="部门">
                                <a-select placeholder="请选择" style="width: 200px">
                                    <a-select-option value="1">
                                        人事部
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="姓名">
                                <a-input />
                            </a-form-model-item>
                            <a-button class="btn">条讲清除</a-button>
                            <a-button class="btn">查找</a-button>
                            <a-button class="btn">导出</a-button>
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
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: 'year',
                title: '年份',
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
                title: '教务处',
                width: 150,
                dataIndex: 'dept',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'dept',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'dept',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'dept',
                        width: 50,
                    },
                ],
            },
            {
                title: '公培处',
                width: 150,
                dataIndex: 'train',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'train',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'train',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'train',
                        width: 50,
                    },
                ],
            },
            {
                title: '应急部',
                width: 150,
                dataIndex: 'emergency',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'emergency',
                        width: 50,
                    },
                ],
            },
            {
                title: '网络部',
                width: 150,
                dataIndex: 'network',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'network',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'network',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'network',
                        width: 50,
                    },
                ],
            },
            {
                title: '领导力',
                width: 150,
                dataIndex: 'leader',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'leader',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'leader',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'leader',
                        width: 50,
                    },
                ],
            },
            {
                title: '机关党委相关',
                width: 150,
                dataIndex: 'office',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'office',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'office',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'office',
                        width: 50,
                    },
                ],
            },
            {
                title: '人事处',
                width: 150,
                dataIndex: 'personnel',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'personnel',
                        width: 50,
                    },
                ],
            },
            {
                title: '业务指导处',
                width: 150,
                dataIndex: 'business',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'business',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'business',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'business',
                        width: 50,
                    },
                ],
            },
            {
                title: '学员处',
                width: 150,
                dataIndex: 'students',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'students',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'students',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'students',
                        width: 50,
                    },
                ],
            },
            {
                title: '总工作量',
                width: 150,
                dataIndex: 'total',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'total',
                        width: 50,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'total',
                        width: 50,
                    },
                    {
                        title: '小计',
                        dataIndex: 'total',
                        width: 50,
                    },
                ],
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
