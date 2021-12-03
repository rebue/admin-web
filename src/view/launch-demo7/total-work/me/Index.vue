<template>
    <div>
        <!-- <a-table :columns="columns" :data-source="data" bordered size="middle"
      :scroll="{ x: 'calc(200px + 50%)', y: 240 }" /> -->
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
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
        };
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
    },
};
</script>
