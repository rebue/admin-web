<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="true">
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
                            updator: '@cname',
                            updateTime: '@integer(2018,2021)-@date(MM-dd hh:mm:ss)',
                            target: '@cname',
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
                dataIndex: 'updator',
                title: '修改人',
                width: 150,
            },
            {
                dataIndex: 'updateTime',
                title: '修改时间',
                width: 150,
            },
            {
                dataIndex: 'target',
                title: '修改学员',
                width: 150,
            },
        ];

        return {
            columns,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {},
};
</script>
