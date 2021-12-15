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
                                <a-form-item label="职称管理:">
                                    <a-input v-model="formInline.name"></a-input>
                                </a-form-item>
                                <a-form-item label="级别:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            --请选择--
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

                        <a-col style="margin-top: 5px">
                            <a-button>查找</a-button><a-button style="margin-left: 15px">添加</a-button>
                            <a-button style="margin-left: 15px">条件清空</a-button>
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
    name: 'department-statistics-year',
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
                    'list|6': [
                        {
                            'id|+1': 10000000,

                            'post|+1': ['教师', '教师', '教师', '教师', '行政主任', '行政副主任'],
                            'level|+1': ['一级', '二级', '三级'],
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
                title: '编号',
                width: 80,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'post',
                title: '职务',
            },
            {
                dataIndex: 'level',
                title: '级别',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: '150',
                scopedSlots: { customRender: 'action' },
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
