<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="false"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                    >
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>
<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import CrudTable from '@/component/rebue/CrudTable.vue';

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
                            name: '@cname',
                            year: '@pick(["2021","2020","2019","2018","2017"])',
                            department: '@pick(["教工部", "后勤部"])',
                            dept: '@integer(0,200)',
                            train: '@integer(0,200)',
                            emergency: '@integer(0,200)',
                            network: '@integer(0,200)',
                            leader: '@float(0,200,1,1)',
                            office: '@float(0,200,1,1)',
                            personnel: '@integer(0,200)',
                            business: '@integer(0,200)',
                            students: '@float(0,200,1,1)',
                            total: '@integer(1,200)',
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
                dataIndex: 'year',
                title: '年份',
                width: 80,
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '部门',
                width: 100,
                ellipsis: true,
            },
            {
                title: '教务处',
                width: 240,
                dataIndex: 'dept',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'dept',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '公培处',
                width: 240,
                dataIndex: 'train',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'train',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '应急部',
                width: 240,
                dataIndex: 'emergency',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'emergency',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '网络部',
                width: 240,
                dataIndex: 'network',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'network',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '领导力',
                width: 240,
                dataIndex: 'leader',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'leader',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '机关党委相关',
                width: 240,
                dataIndex: 'office',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'office',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '人事处',
                width: 240,
                dataIndex: 'personnel',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'personnel',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '业务指导处',
                width: 240,
                dataIndex: 'business',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'business',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '学员处',
                width: 240,
                dataIndex: 'students',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'students',
                        width: 80,
                        ellipsis: true,
                    },
                ],
            },
            {
                title: '总工作量',
                width: 240,
                dataIndex: 'total',
                ellipsis: true,
                children: [
                    {
                        title: '计酬',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '不计酬',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
                    },
                    {
                        title: '小计',
                        dataIndex: 'total',
                        width: 80,
                        ellipsis: true,
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
