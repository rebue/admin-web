// 成绩查询
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                ellipsis: true,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
            },
            {
                dataIndex: 'subject01',
                title: '科目一',
                ellipsis: true,
            },
            {
                dataIndex: 'achievement01',
                title: '成绩',
                ellipsis: true,
            },
            {
                dataIndex: 'subject02',
                title: '科目二',
                ellipsis: true,
            },
            {
                dataIndex: 'achievement02',
                title: '成绩',
                ellipsis: true,
            },
            {
                dataIndex: 'subject03',
                title: '科目三',
                ellipsis: true,
            },
            {
                dataIndex: 'achievement03',
                title: '成绩',
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '查询',
                onClick: this.handleAdd,
            },
        ];
        return {
            columns,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
    },
};
</script>
