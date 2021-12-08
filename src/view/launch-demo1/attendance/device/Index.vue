<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
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
    name: 'Manager',
    components: {
        BaseManager,
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
                            address: '@pick(["会议中心","学员俱乐部","图书馆大厅"])',
                            ip: '@ip()',
                            desc: '',
                            diabled: '@pick(["是","否"])',
                            isSignupDevice: '@pick(["是","否"])',
                            isData: '@pick(["是","否"])',
                            flag: '',
                            lastTime: '@date(yyyy-MM-dd hh:mm:ss)',
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
                dataIndex: 'no',
                title: '序号',
                width: 150,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'address',
                title: '地址',
                width: 150,
            },
            {
                dataIndex: 'ip',
                title: 'IP',
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '描述',
                width: 150,
            },
            {
                dataIndex: 'diabled',
                title: '禁用',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'isSignupDevice',
                title: '是登记机',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'isData',
                title: '是否统计考勤',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'flag',
                title: '标识1',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'lastTime',
                title: '上回连接时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 250,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '新增',
                onClick: () => {
                    /**/
                },
            },
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
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'more',
                title: '更多',
                items: [
                    {
                        type: 'a',
                        title: '测试连通',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '下载刷卡/纹日志到EUT',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '操作机器',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '查看监控日志',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '清空数据',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
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
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
    },
};
</script>
<style lang="less" scoped>
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
