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
    name: 'school-statistics-table',
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
                    'list|5-12': [
                        {
                            'id|+1': 10000000,

                            'achievementNo|10001-99999': 99999,
                            year: '@pick(["2021"])',

                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            'workload|500-15000': 12000,
                            'expenseName|+1': [
                                '国家社科基金（含艺术学、教育学）项目',
                                '国家社科基金后期资助项目',
                                '国家自然基金软科学项目',
                                '教育部人文社会科学重点研究基地一般项目',
                                '教育部人文社会科学研究项目',
                                '教育部哲学社会科学研究后期资助项目',
                                '教育部新世纪优秀人才支持计划项目',
                                '教育部高等学校全国优秀博士学位论文作者专项资金资助项目',
                                '教育部高等学校博士学科点专项科研基金课题',
                                '中国博士后科学基金特别资助项目',
                                '国家社科基金重点预目',
                                '国家社科基金中华学术外译项目',
                            ],
                            department: '@pick(["行政部", "教研部","计算机一班", "计算机二班","GC班"])',
                            //workloadTask: '@ctitle',
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
                dataIndex: 'expenseName',
                title: '总费用名称',
            },
            {
                dataIndex: 'year',
                title: '年份',
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
