<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <div><a-button>查看</a-button></div>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="false"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                        :rowSelection="{}"
                    >
                        <template #commands>
                            <a-form-model layout="inline">
                                <a-form-model-item>
                                    <a-select default-value="lucy" style="width: 150px">
                                        <a-select-option value="lucy">
                                            2021年秋季学期
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item>
                                    <a-select default-value="lucy" style="width: 250px">
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
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            status: '未填',
                            'report|0-100': 0,
                            name: '@cname()',
                            semester: '2021年秋季学期',
                            post: '@pick(["班长","副班长","学习委员"])',
                            grade: '全区党校（行政院校）系统师咨培训班（第22期）',
                            'graduation|0-100': 0,
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
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
                dataIndex: 'name',
                title: '姓名',
                width: 80,
                ellipsis: true,
            },
            {
                dataIndex: 'grade',
                title: '班级',
                width: 300,
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
