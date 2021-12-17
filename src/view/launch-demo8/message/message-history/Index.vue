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
                    :api="ap"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns2"
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
                            name: '@cname',
                            msg: '@pick(["200","400","500"])',
                            createTime: '@now(yyyy-MM-dd HH:mm:ss)',
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
        //批量发送
        this.ap = {
            page,
            listAll: page,
            list: page,
        };

        const columns = [
            {
                dataIndex: 'batchName',
                title: '批次名称',

                width: 200,
            },
            {
                dataIndex: 'sendTime',
                title: '发送时间',

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
            //
            //     scopedSlots: { customRender: 'action' },
            // },
        ];
        const columns2 = [
            {
                dataIndex: 'no',
                title: '自动编号',
                width: 100,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'mobile',
                title: '手机号',
                width: 150,
                customRender: function() {
                    const numArray = [
                        '139',
                        '138',
                        '137',
                        '136',
                        '135',
                        '134',
                        '159',
                        '158',
                        '157',
                        '150',
                        '151',
                        '152',
                        '188',
                        '187',
                        '182',
                        '183',
                        '184',
                        '178',
                        '130',
                        '131',
                        '132',
                        '156',
                        '155',
                        '186',
                        '185',
                        '176',
                        '133',
                        '153',
                        '189',
                        '180',
                        '181',
                        '177',
                    ];
                    let str = Math.random();
                    str = Math.round(str * numArray.length);

                    const strMobile = numArray[str] + '' + Math.round(Math.random() * 99999999) + '';
                    return strMobile;
                },
            },
            {
                dataIndex: 'msg',
                title: '发送结果',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'createTime',
                title: '发送时间',
                ellipsis: true,
                width: 150,
            },

            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //
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
