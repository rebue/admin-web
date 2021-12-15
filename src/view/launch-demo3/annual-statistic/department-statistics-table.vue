<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="true"
            >
                <template #commands>
                    <a-row type="flex">
                        <a-col :span="15">
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="年度:">
                                    <a-input v-model="formInline.year"> </a-input>
                                </a-form-item>
                                <a-form-item>
                                    <a-button>查找</a-button
                                    ><a-button style="margin-left: 15px">导出</a-button></a-form-item
                                >
                            </a-form-model>
                        </a-col>

                        <a-col :span="14"> </a-col>
                    </a-row>
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';

export default {
    name: 'department-statistics-table',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|5-20': [
                        {
                            'id|+1': 10000000,

                            'achievementNo|10001-99999': 99999,
                            year: '@now(yyyy)',

                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            'workload|1-500': 500,
                            //status: '@pick(["审核中", "审核通过","审核未通过"])',
                            'department|+1': [
                                '党委办公室、校长办公室',
                                '党委组织部',
                                '党委宣传部',
                                '党委统战部',
                                '学生工作部（处）',
                                '党委教师工作部、人事处',
                                '教务处',
                                '科研处',
                                '财务处',
                                '审计处',
                                '国有资产管理处',
                                '武装部、后勤保卫处',
                                '基建处',
                                '离退休工作处',
                                '纪委办公室、监察室',
                                '工会',
                                '团委',
                                '图书馆',
                                '现代教育技术中心',
                                '学报编辑部',
                                '会计与审计学院',
                                '工商管理学院',
                                '计算机与信息工程学院',
                                '土木建筑工程学院',
                                '经济与贸易学院',
                                '旅游与公共管理学院',
                                '传媒学院',
                                '外国语与国际教育学院',
                                '教育学院',
                                '马克思主义学院',
                                '继续教育学院',
                            ],

                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            //applyTime: '@now("yyyy-MM-dd")',
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
                dataIndex: 'no',
                title: '序号',
                width: 80,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'year',
                title: '年份',
            },
            {
                dataIndex: 'department',
                title: '部门',
            },
            {
                dataIndex: 'workload',
                title: '工作量',
                ellipsis: true,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '修改',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '查看',

                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,

            formInline: {
                user: '',
                password: '',
                name: '',
                achievementName: '',
                startTime: '',
                endTime: '',
                status: '',
                year: '',
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        search() {
            console.log(this.api);
        },
    },
};
</script>

<style scoped></style>
