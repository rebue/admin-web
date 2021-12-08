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
                    <a-row type="flex" style="margin-left: 20px">
                        <a-col>
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="部门名称:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                                <a-form-item label="排序级别:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-left: 20px">
                            <a-button>查询</a-button>
                            <a-button style="margin-left: 10px">条件清空</a-button>
                            <a-button style="margin-left: 10px">同步数据</a-button>
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
    name: 'DepartmentManagement',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
        // eslint-disable-next-line no-undef
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

                            level: '@pick(["一级","二级","三级"])',
                            department:
                                '@pick(["校（院）领导","办公室（业务指导工作处）","第十二期自治区管理干部培训班","机关党委"])',
                            createTime: '@dateTime',
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
                dataIndex: 'department',
                title: '部门名称',
            },
            {
                dataIndex: 'level',
                title: '部门排序级别',
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
            showOrg: false,
            realm: {
                id: 1,
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
