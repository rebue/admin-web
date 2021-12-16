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
                        <a-col style="margin-top: 5px">
                            <a-button>查询</a-button>
                        </a-col>
                    </a-row>
                </template>
                <template #left>
                    <a-row type="flex">
                        <a-col :span="19">
                            <div style="margin-right: 10px;overflow: auto" class="table-left">
                                <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                                <div class="table-divider"></div>
                            </div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height:100%"></a-divider>
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
    },
    data() {
        const treeData = [
            {
                title: '教职工',
                key: '1',
                children: [
                    {
                        title: '办公室',
                        key: '101',
                    },
                    {
                        title: '教务部',
                        key: '102',
                    },
                    {
                        title: '学员工作部',
                        key: '103',
                    },
                    {
                        title: '教学研究部',
                        key: '104',
                    },
                    {
                        title: '对外交流与开发部（东盟）',
                        key: '105',
                    },
                    {
                        title: '邓小平理论研究中心（科研管理）',
                        key: '106',
                    },
                    {
                        title: '财务后勤资产部',
                        key: '107',
                    },
                    {
                        title: '信息化建设与管理部（图书管）',
                        key: '108',
                    },
                    {
                        title: '机关党委（人力资源部）',
                        key: '109',
                    },
                    {
                        title: '学校领导',
                        key: '110',
                    },
                ],
            },
            {
                title: '培训学院',
                key: '2',
                children: [
                    {
                        title: '学员人数',
                        key: '201',
                    },
                ],
            },
            {
                title: '办公室',
                key: '2',
            },
            {
                title: '教务部',
                key: '3',
                //   children: [{
                //       title: '学员人数',
                //        key: '201',
                //   },
                // ]
            },
            {
                title: '学员工作部',
                key: '4',
            },
            {
                title: '教学研究部',
                key: '5',
                //   children: [{
                //       title: '学员人数',
                //        key: '201',
                //   },
                // ]
            },
            {
                title: '对外交流与培训开发部（东盟研究部）',
                key: '6',
            },
            {
                title: '邓小平理论研究中心（科研管理部）',
                key: '7',
            },
            {
                title: '财务后勤资产部',
                key: '8',
            },
            {
                title: '信息化建设与管理部（图书馆）',
                key: '9',
            },
            {
                title: '机关党委',
                key: '10',
            },
            {
                title: '柳州饭店团队',
                key: '11',
            },
            {
                title: '印象物业团队',
                key: '12',
            },
            {
                title: '信息化驻场团队',
                key: '13',
            },
            {
                title: '学员部',
                key: '14',
            },
            {
                title: 'CS',
                key: '14',
            },
        ];
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
            treeData,
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
