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
                    :defaultPagination="true"
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
                    :defaultPagination="true"
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
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|21-25': [
                        {
                            'id|+1': 10000000,
                            batchName: '流程短信',
                            sex: '@pick(["男", "女"])',
                            sendName: '@cname',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            // lastModifiedTime: '@date("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
                            sendTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            TimingTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            mobile: '',
                            // ["校(院)领导","行政部"]
                            department: '@pick(["行政部", "校（院）领导"])',
                            work: '@pick(["常务副校长，常务副院长", "副校长，副院长","普通教师"])',
                            timing: '@pick(["是", "否"])',
                            'sendPlatform|+1': ['default', 'platform', 'ops'],
                            'number|1-10': 10,

                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
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
                dataIndex: 'batchName',
                title: '批次名称',
                fixed: 'left',
                width: 200,
            },
            {
                dataIndex: 'sendTime',
                title: '发送时间',
                fixed: 'left',
                width: 180,
            },
            {
                dataIndex: 'timing',
                title: '是否定时',
                width: 150,
            },
            {
                dataIndex: 'TimingTime',
                title: '定时时间',
                ellipsis: true,
                width: 180,
            },
            {
                dataIndex: 'status',
                title: '状态分析',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '号码数',
                ellipsis: true,
                width: 100,
            },
            {
                dataIndex: 'sendName',
                title: '发送人',
                width: 100,
            },
            {
                dataIndex: 'sendPlatform',
                title: '发送平台',
                width: 100,
            },
            {
                dataIndex: 'accountNumber',
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
