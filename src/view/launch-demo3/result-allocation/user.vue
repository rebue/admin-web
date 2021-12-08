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
                                <a-form-item label="关键字:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                                <a-form-item label="职称:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="权限:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="是否配置:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-left: 20px">
                            <a-button>查询</a-button>
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
                    'list|5-20': [
                        {
                            'id|+1': 10000000,

                            'achievementNo|10001-99999': 99999,
                            year: '@now(yyyy)',
                            name: '@cname',
                            DepartmentLeader: '@cname',
                            ExclusiveTeacher: '@cname',
                            subject: '@pick(["计算机应用基础","操作系统","高等数学","大学英语","计算机网络"])',
                            technicalTitle: '@pick(["初级教师","中级教师","高级教师","学校主任"])',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            orderly: '@pick(["公务员","参公人员"])',
                            department: '@pick(["行政部", "教研部"])',
                            'workloadTask|200-500': 500,
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
                dataIndex: 'department',
                title: '部门',
                width: 200,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'technicalTitle',
                title: '职称',
                width: 150,
            },
            {
                dataIndex: 'subject',
                title: '学科',
                width: 200,
            },
            {
                dataIndex: 'ExclusiveTeacher',
                title: '专属教师',
                width: 150,
            },
            {
                dataIndex: 'DepartmentLeader',
                title: '处室领导',
                width: 150,
            },
            {
                dataIndex: 'orderly',
                title: '公务员/参公人员',
                width: 200,
            },
            {
                dataIndex: 'workloadTask',
                title: '工作任务量',
                width: 150,
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
                title: '编辑',
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
