<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="false"
            >
                <template #commands>
                    <a-row type="flex">
                        <a-col>
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
                        <a-col style="margin-top: 10px">
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
    name: 'school-statistics-year',
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
                    'list|1-7': [
                        {
                            'id|+1': 10000000,

                            'totalWorkload|3002-55555': 55555,
                            totalCostName: '@pick(["2021年费用汇总"])',
                            year: '@now("yyyy")',
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
                dataIndex: 'totalCostName',
                title: '总费用名称',
                width: 150,
            },
            {
                dataIndex: 'year',
                title: '年份',
                width: 150,
            },
            {
                dataIndex: 'totalWorkload',
                title: '总工作量',
                width: 140,
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
