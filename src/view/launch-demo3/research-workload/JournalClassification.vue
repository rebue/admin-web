<template>
    <base-manager>
        <template #managerCard>
            <a-row type="flex">
                <a-col :span="6">
                    <a-button class="btn">编辑</a-button>
                    <a-button class="btn">删除</a-button>
                    <a-dropdown class="btn">
                        <a-menu slot="overlay" @click="testBtn">
                            <a-menu-item key="1">
                                1st item
                            </a-menu-item>
                            <a-menu-item key="2">
                                2nd item
                            </a-menu-item>
                            <a-menu-item key="3">
                                3rd item
                            </a-menu-item>
                        </a-menu>
                        <a-button> 新增 <a-icon type="down" /> </a-button>
                    </a-dropdown>
                    <div v-show="showOrg" class="table-left" style="margin-top:10px">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                    </div>
                </a-col>
                <a-col :span="1">
                    <a-divider type="vertical" style="height:100%"></a-divider>
                </a-col>
                <a-col :span="17">
                    <crud-table
                        ref="crudTable"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="300"
                        :defaultPagination="true"
                    >
                        <template #commands>
                            <a-button class="btn">新增</a-button>
                            <a-button class="btn">删除</a-button>
                            <a-button class="btn">修改</a-button>
                            <a-button class="btn">课题默认所属时间</a-button>
                        </template>
                    </crud-table>
                </a-col>
            </a-row>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';
import OrgTree from '@/view/rac/rac-org/Tree';
import log from '../result-allocation/log';

export default {
    name: 'JournalClassification',
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
                    'list|5-20': [
                        {
                            'id|+1': 10000000,

                            examine: '@pick(["审核通过","审核未通过"])',
                            // level: '@pick(["一级","二级","三级"])',
                            'periodicalName|+1': [
                                '对外贸易',
                                '宏观经济管理',
                                '企业改革与管理',
                                '会计师',
                                '教与学',
                                '新课教育',
                                '科学与财富',
                                '数码设计',
                                '广西青年干部学院学报',
                                '好日子',
                                '当代广西',
                                '求是',
                                '学报',
                                '传承',
                            ],
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
                dataIndex: 'periodicalName',
                title: '期刊名称',
            },
            {
                dataIndex: 'createTime',
                title: '添加时间',
            },
            {
                dataIndex: 'examine',
                title: '审核',
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
        testBtn(v) {
            console.dir(v);
        },
    },
};
</script>

<style scoped>
.btn {
    margin-right: 10px;
}
</style>
