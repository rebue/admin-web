<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600"> </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import CrudTable from './levelCrudTable.vue';
import BaseManager from '@/component/rebue/BaseManager';
import { racDicApi } from '@/api/Api';
export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
    },
    data() {
        this.api = racDicApi;
        const columns = [
            {
                title: '配置内容',
                dataIndex: 'name',
            },
            {
                title: '配置项',
                dataIndex: 'dicItemValue',
                scopedSlots: { customRender: 'dicItemValue' },
            },
            {
                title: '备注',
                dataIndex: 'remark',
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
        onCellChange(key, dataIndex, value) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
            }
        },
        onDelete(key) {
            const dataSource = [...this.dataSource];
            this.dataSource = dataSource.filter(item => item.key !== key);
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
