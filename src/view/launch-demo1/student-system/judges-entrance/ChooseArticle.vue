<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex" :gutter="20">
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :rowSelection="{}"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                    <a-col :span="6" style="margin-top: 50px;border: 1px solid #ededed">
                        <div style="height: 20px;background-color: #e8e8e8">
                            <center>
                                <div style="margin: 0 auto;">
                                    系统帮助
                                </div>
                            </center>
                            <span>
                                本次评比请推荐5篇文章
                            </span>
                        </div>
                    </a-col>
                </a-row>
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
    name: 'ChooseArticle',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|10-20': [
                        {
                            'id|+1': 10000000,
                            'title|+1':
                                '@pick(["拓展“出彩”平台注重人文关怀——关于完善干部激励机制的思考",' +
                                '"关于加快推进广西“互联网”发展的初步思考","“—带一路”战略背景下广西新闻出版广播影视走出去的困境和路径探析","新常态下广西农业可持续发展思考","' +
                                '提升广西智库对决策影响力的探讨","确立多民族文化发展观弘扬广西多民族文化精神","从哲学思维视角谈广西贯彻落实“四个全面”战略布局","经济新常态下广西扩大消费需求途径的对策思考"])',
                            createTime: '@date("2021-MM-dd")',
                            author: '@cname',
                            'className|+1': [
                                '第6期自治区管理干部研修班',
                                '第33期中青年干部培训动',
                                '第55期县处级领导干部进修—班',
                                '第55期县处级领导干部进修二班',
                                '第27期少数民族领导干部培训班',
                                '第16期县处级女干部培训班',
                                '第4期县处级公务员任职培训班',
                                '第2期多（镇）长培训—班',
                                '第2期多（镇）长培训二班',
                                '第10期市、县（市、区）党校师资培训班',
                            ],
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            evaluationPeriod: '@pick(["评比初期", "评比中期","评比后期"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            // lastModifiedTime: '@date("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
                            // arriveTime: '@now("yyyy-MM-dd")',
                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
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
                dataIndex: 'title',
                title: '文章标题',
                width: 300,
            },
            {
                dataIndex: 'createTime',
                title: '文章提交时间',
                width: 150,
            },
            {
                dataIndex: 'author',
                title: '作者',
                width: 150,
            },
            {
                dataIndex: 'className',
                title: '班级',
                width: 150,
            },
            {
                dataIndex: 'evaluationPeriod',
                title: '评比期',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,

                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     // icon: 'plus',
            //     title: '查看',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            formInline: {
                name: '',
                user: '',
            },
            moth: 37,
            startTime: '2021-12-8',
            endTime: '2021-12-15',
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onPanelChange(value, mode) {
            console.log(value, mode);
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
