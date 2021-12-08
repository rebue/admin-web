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
                    <a-row type="flex" style="margin-left: 20px">
                        <a-col style="margin-left: 20px">
                            <a-button>新增</a-button>
                            <a-button>删除</a-button>
                            <a-button>设置本年跨度时间</a-button>
                            <a-button>设置部门级别</a-button>
                        </a-col>
                    </a-row>
                </template>
                <template #left>
                    <div v-show="showOrg" class="table-left">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                        <div class="table-divider"></div>
                    </div>
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
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'user',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
        // eslint-disable-next-line no-undef
        OrgTree,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3': [
                        {
                            'parameterNo|+1': 45456,

                            'parameterName|+1': [
                                '被其他杂志转载',
                                '被《新华月报》，《新华文摘》转载',
                                '被《人大报刊复印资料》转载',
                            ],
                            // level: '@pick(["一级","二级","三级"])',
                            'parameterNumber|1-10': 10,
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
                dataIndex: 'parameterNo',
                title: '参数编号',
                width: '100',
            },
            {
                dataIndex: 'parameterName',
                title: '参数名称',
            },
            {
                dataIndex: 'parameterNumber',
                title: '参数量词',
                width: 100,
            },
        ];

        // this.tableActions = [
        //     {
        //         type: 'a',
        //         title: '编辑',
        //         onClick: record => this.handleEdit(record),
        //     },
        //     {
        //         type: 'confirm',
        //         title: '删除',
        //         confirmTitle: '你确定要删除本条记录吗?',
        //         onClick: record => this.handleDel(record),
        //     },
        //
        // ];

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
