// 发布管理
<template>
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
                                style="width: 200px"
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
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const provinceData = ['显示2021年成绩发布情况', '显示2020年成绩发布情况', '显示2019年成绩发布情况'];
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
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            achievementType: '@pick(["已提交", "未提交"])',
                            submitter: '@cname',
                            curriculum:
                                '@pick(["政治理论", "中国化马克思主义理论", "公共管理学", "新时代党的建设理论", "应用数学", "中国共产党历史"])',
                            inputType: '@pick(["一次录入", "二次录入"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            shift: '@pick(["党校研究生", "中科大研究生"])',
                            signUpDate: '@datetime',
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
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 250,
            },
            {
                dataIndex: 'achievementType',
                title: '成绩状态',
                width: 150,
            },
            {
                dataIndex: 'submitter',
                title: '提交人',
                width: 150,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',
                width: 250,
            },
            {
                dataIndex: 'inputType',
                title: '录入类型',
                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',
                width: 250,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                width: 250,
            },
            {
                dataIndex: 'signUpDate',
                title: '提交时间',
                width: 250,
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
                title: '同步成绩到报名系统',
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
