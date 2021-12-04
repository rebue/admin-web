<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    :api="api"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :scrollX="600"
                    :rowSelection="{}"
                    :showKeywords="false"
                    :defaultPagination="false"
                    style="overflow: scroll"
                >
                    <template #keywords>
                        <h4>批次查询</h4>
                    </template>
                </crud-table>
                <hr />
                <crud-table
                    :api="api"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :scrollX="600"
                    :rowSelection="{}"
                    :showKeywords="false"
                    :defaultPagination="false"
                    style="overflow: scroll"
                >
                    <template #keywords>
                        <h4>发送详情</h4>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAccountApi } from '@/api/Api';

export default {
    name: 'message-history',
    components: {
        BaseManager,
        CrudTable,
    },
    props: [],
    data() {
        this.api = racAccountApi;

        const columns = [
            {
                dataIndex: 'photo',
                title: '批次名称',
                fixed: 'left',
                width: 200,
            },
            {
                dataIndex: 'name2',
                title: '发送时间',
                fixed: 'left',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '是否定时',
                width: 150,
            },
            {
                dataIndex: 'mobile',
                title: '定时时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'GdMobile',
                title: '状态分析',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'department',
                title: '号码数',
                ellipsis: true,
                width: 100,
            },
            {
                dataIndex: 'work',
                title: '发送人',
                width: 100,
            },
            {
                dataIndex: 'work',
                title: '发送平台',
                width: 100,
            },
            {
                dataIndex: 'work',
                title: '发送账号',
                width: 150,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];
        const columns2 = [
            {
                dataIndex: 'photo',
                title: '自动编号',
                fixed: 'left',
                width: 200,
            },
            {
                dataIndex: 'name2',
                title: '姓名',
                fixed: 'left',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '手机号',
                width: 150,
            },
            {
                dataIndex: 'mobile',
                title: '发送结果',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'GdMobile',
                title: '发送时间',
                ellipsis: true,
                width: 150,
            },

            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     icon: 'plus',
            //     title: '新建',
            //     onClick: this.handleAdd,
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            columns2,
            showOrg: false,
        };
    },

    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
