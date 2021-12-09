<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
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
    name: 'ComparisonResults',
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
                            className:
                                '@pick(["第33期青年干部班", "第33期青年干部班","第四期县处级公务员任职培训班","第55期县处级领导干部进修一班","第十期市、县（市、区）党校师资培训班"])',

                            'grade|50-99': 100,
                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            evaluationPeriod:
                                '@pick(["学员论坛时间范围", "班级推荐文章和评委","学习部确认文章","评委评分","汇总评比结果"])',
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
                const dataSource = mockList.list.sort(function(a, b) {
                    return parseInt(b.grade) - parseInt(a.grade); //相当于sort()中的a-b
                });
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
                title: '排名',
                width: '80',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'title',
                title: '文章标题',
                width: '300',
            },
            {
                dataIndex: 'grade',
                title: '分数',
                width: '100',
            },
            {
                dataIndex: 'author',
                title: '作者',
                width: '200',
            },
            {
                dataIndex: 'className',
                title: '班级名称',
                width: '200',
            },
            {
                dataIndex: 'evaluationPeriod',
                title: '评比期',
                width: '200',
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '删除',
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
