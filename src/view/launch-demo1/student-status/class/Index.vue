<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                </crud-table>
            </template>
        </base-manager>
        <set-class ref="setClassForm" @close="handleEditFormClose" />
        <set-code ref="setCodeForm" @close="handleEditFormClose" />
        <!-- 查看班级课程 -->
        <a-modal
            title="查看班级课程"
            :visible="classVisible"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            @ok="handleCancel"
        >
            <p>班级名称：{{ checkForm.className }}</p>
            <p>班级课程：课程1</p>
        </a-modal>
        <!-- 查看学员宿舍 -->
        <a-modal
            title="查看学员宿舍"
            :visible="dormVisible"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            @ok="handleCancel"
        >
            <p>学员名称：{{ checkForm.creator }}</p>
            <p>学员宿舍：宿舍1</p>
        </a-modal>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import SetClass from './SetClass';
import SetCode from './SetCode';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
        SetClass,
        SetCode,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            term: '2021年秋季学期',
                            'className|+1': [
                                '中青年干部培训一班（第45期）',
                                '中青年干部培训二班（第8期）',
                                '县处级公务员任职培训班（第22期）',
                                '乡（镇）党委书记进修班（第36期）“乡村振兴” 研究专题',
                                '全区非公企业党组织书记专题研讨班',
                                '全区党校（行政院校）系统师资培训班（第21期）',
                            ],
                            startTime: '2021-@integer(07,10)-@date(dd)',
                            endTime: '2021-@integer(11,12)-@date(dd)',
                            'signupCode|+1': 20211500,
                            signupStartTime: '2021-@integer(04,06)-@date(dd)',
                            signupEndTime: '2021-@integer(09,10)-@date(dd) 00:00:00',
                            creator: '@cname()',
                            'classId|+1': 100,
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
                dataIndex: 'term',
                title: '学期',
                width: 150,
                // scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'className',
                title: '班级名称',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '开始时间',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '结束时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupCode',
                title: '网上报名注册码',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupStartTime',
                title: '网上报名开通时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'signupEndTime',
                title: '网上报名关闭时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'creator',
                title: '组织员',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'classId',
                title: '班级编码',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 140,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '同步',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '查看班级课程',
                        onClick: record => this.handleCheckCourse(record),
                    },
                    {
                        type: 'a',
                        title: '查看学员宿舍',
                        onClick: record => this.handleCheckDrom(record),
                    },
                    {
                        type: 'a',
                        title: '设置班级编码',
                        onClick: record => this.handleSetClass(record),
                    },
                    {
                        type: 'a',
                        title: '设置网上报名注册码',
                        onClick: record => this.handleSetCode(record),
                    },
                ],
            },
        ];

        return {
            columns,
            dormVisible: false,
            classVisible: false,
            confirmLoading: false,
            checkForm: {},
        };
    },
    mounted() {
        this.setClassForm = this.$refs.setClassForm;
        this.setCodeForm = this.$refs.setCodeForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理 查看班级课程事件
         */
        handleCheckCourse(record) {
            this.checkForm = record;
            this.classVisible = true;
        },
        /**
         * 处理 查看学员宿舍事件
         */
        handleCheckDrom(record) {
            this.checkForm = record;
            this.dormVisible = true;
        },
        /**
         * 处理 设置班级编号事件
         */
        handleSetClass(record) {
            this.setClassForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理 设置网上报名注册码事件
         */
        handleSetCode(record) {
            this.setCodeForm.show(EditFormTypeDic.Modify, record);
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
        handleCancel() {
            this.dormVisible = false;
            this.classVisible = false;
        },
    },
};
</script>
