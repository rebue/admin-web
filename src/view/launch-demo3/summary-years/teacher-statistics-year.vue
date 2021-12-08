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
                                <a-form-item label="开始年份:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="结束年份:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-left: 30px;margin-top: 3px">
                            <a-button>查找</a-button>
                            <a-button style="margin-left: 10px">导出</a-button>
                            <a-button style="margin-left: 10px">条件清除</a-button>
                        </a-col>
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
    name: 'teacher-statistics-year',
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
                            'workload|500-2000': 1500,
                            status: '@pick(["专职教师", "非专职教师",])',
                            department: '@pick(["行政部", "教研部","计算机一班", "计算机二班","GC班"])',
                            //workloadTask: '@ctitle',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
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
                dataIndex: 'status',
                title: '专职非专职',
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
