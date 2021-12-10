// 考勤低于五分
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                    >
                        <template #keywordsLeft>
                            <div style="margin-right: 10px">
                                <a-select
                                    :default-value="provinceData[0]"
                                    style="width: 100px"
                                    @change="handleProvinceChange"
                                >
                                    <a-select-option v-for="province in provinceData" :key="province">
                                        {{ province }}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </template>
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const provinceData = ['2021年', '2020年', '2019年'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            name: '@cname',
                            'stuNum|100000000-200000000': 111111111,
                            semester: '@pick(["第一学期","第二学期","第三学期","第四学期"])',
                            curriculum:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            'homeworkAchievement|0-20': 1,
                            'attendanceScore|0-10': 1,
                            'achievement|60-100': 1,
                            'makeUpExamAchievement|70-100': 70,
                            'allMakeUpExamAchievement|100-150': 100,
                            'courseAchievement|70-100': 70,
                            shift: '@pick(["中政大研究生","党校研究生"])',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
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
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',

                width: 150,
            },
            {
                dataIndex: 'semester',
                title: '学期',

                width: 150,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',

                width: 250,
            },
            {
                dataIndex: 'homeworkAchievement',
                title: '作业成绩',

                width: 150,
            },
            {
                dataIndex: 'attendanceScore',
                title: '考勤成绩',

                width: 150,
            },
            {
                dataIndex: 'achievement',
                title: '卷面成绩',

                width: 150,
            },
            {
                dataIndex: 'makeUpExamAchievement',
                title: '补考成绩',

                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement',
                title: '总补考成绩',

                width: 150,
            },
            {
                dataIndex: 'courseAchievement',
                title: '课程成绩',

                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',

                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',

                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',

                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '期考和补考成绩清零',
                onClick: this.handleAdd,
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
            provinceData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
        handleProvinceChange(value) {
            //
        },
    },
};
</script>
