<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="false">
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
        this.api = racRealmApi;
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
