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
                        <a-col :span="20">
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-model-item label="作者姓名">
                                    <a-input style="width: 195px" v-model="formInline.name"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="部门名称">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="请选择部门">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="起始时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="开始时间"
                                        v-model="formInline.startTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="部门名称">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="请选择部门">
                                        <a-select-option value="全部">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col :span="3">
                            <center>
                                <a-button style="line-height: 10px">查找</a-button>
                                <a-button style="margin-top: 10px">导出</a-button>
                            </center>
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
    name: 'personal-statistics-table',
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
                    'list|1-20': [
                        {
                            'id|+1': 10000000,

                            'achievementNo|10001-99999': 99999,
                            year: '@now(yyyy)',

                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            'completedWorkload|1-500': 500,
                            //status: '@pick(["审核中", "审核通过","审核未通过"])',
                            department:
                                '@pick(["党委办公室、校长办公室",' +
                                '"党委组织部",' +
                                '"党委宣传部",' +
                                '"党委统战部",' +
                                '"学生工作部（处）",' +
                                '"党委教师工作部、人事处",' +
                                '"教务处",' +
                                '"科研处",' +
                                '"财务处",' +
                                '"审计处",' +
                                '"国有资产管理处",' +
                                '"武装部、后勤保卫处",' +
                                '"基建处",' +
                                '"离退休工作处",' +
                                '"纪委办公室、监察室",' +
                                '"工会",' +
                                '"团委",' +
                                '"图书馆",' +
                                '"现代教育技术中心",' +
                                '"学报编辑部",' +
                                '"会计与审计学院",' +
                                '"工商管理学院",' +
                                '"计算机与信息工程学院",' +
                                '"土木建筑工程学院",' +
                                '"经济与贸易学院",' +
                                '"旅游与公共管理学院",' +
                                '"传媒学院",' +
                                '"外国语与国际教育学院",' +
                                '"教育学院",' +
                                '"马克思主义学院",' +
                                '"继续教育学院"])',
                            workloadTask:
                                '@pick(["国家社科基金（含艺术学、教育学）项目",' +
                                '"国家社科基金后期资助项目",' +
                                '"国家自然基金软科学项目",' +
                                '"教育部人文社会科学重点研究基地一般项目",' +
                                '"教育部人文社会科学研究项目",' +
                                '"教育部哲学社会科学研究后期资助项目",' +
                                '"教育部新世纪优秀人才支持计划项目",' +
                                '"教育部高等学校全国优秀博士学位论文作者专项资金资助项目",' +
                                '"教育部高等学校博士学科点专项科研基金课题",' +
                                '"中国博士后科学基金特别资助项目",' +
                                '"国家社科基金重点预目",' +
                                '"国家社科基金中华学术外译项目"])',
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
                dataIndex: 'year',
                title: '年份',
                width: 150,
            },
            {
                dataIndex: 'department',
                title: '部门',
                ellipsis: true,
                width: 200,
            },

            {
                dataIndex: 'author',
                title: '作者',
                width: 150,
                ellipsis: true,
            },

            {
                dataIndex: 'workloadTask',
                title: '工作量任务',
                width: 400,
            },
            {
                dataIndex: 'completedWorkload',
                title: '完成工作量',
                width: 150,
                ellipsis: true,
            },

            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
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
