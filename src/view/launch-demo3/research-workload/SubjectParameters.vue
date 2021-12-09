<template>
    <base-manager>
        <template #managerCard>
            <a-row type="flex">
                <a-col :span="5">
                    <div v-show="showOrg" class="table-left">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                        <div class="table-divider"></div>
                    </div>
                </a-col>
                <a-col :span="1">
                    <a-divider type="vertical" style="height:100%"></a-divider>
                </a-col>
                <a-col :span="18">
                    <crud-table
                        ref="crudTable"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="300"
                        :defaultPagination="false"
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

export default {
    name: 'SubjectParameters',
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
                    'list|7': [
                        {
                            'id|+1': 122823,

                            'parameter|+1': [
                                'A 高等院校，其他学校',
                                'B 中国社会科学院',
                                'C 省、市社会科学院',
                                'D 各级党校',
                                'E 军队系统（包括地方军队院校）',
                                'F 各级党改单位',
                                'G 其他',
                            ],
                            // level: '@pick(["一级","二级","三级"])',
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
                dataIndex: 'parameter',
                title: '参数值',
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

<style scoped>
.btn {
    margin-right: 10px;
}
</style>
