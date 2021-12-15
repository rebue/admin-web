<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div>
                    <h4>2021年秋季学期(2021-09-01 至 2021-12-31)学员网上选择选修课 课程改选管理</h4>
                    <p>学员选修课课程改选设置</p>
                </div>
                <a-form-model v-bind="formLayout">
                    <a-form-model-item label="改选时间设置">
                        开始时间:
                        <a-date-picker
                            style="width: 120px"
                            :default-value="moment('2019-02-23', dateFormat)"
                            :format="dateFormat"
                        />
                        结束时间:
                        <a-date-picker
                            style="width: 120px"
                            :default-value="moment('2019-02-24', dateFormat)"
                            :format="dateFormat"
                        />
                    </a-form-model-item>
                    <a-form-model-item label="改选说明">
                        <a-input style="width: 300px" type="textarea" :auto-size="{ minRows: 2, maxRows: 6 }">
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item label="确认选修课改选课程">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :defaultPagination="true"
                            :rowSelection="{}"
                        />
                        <a-button class="btn">提交</a-button>
                    </a-form-model-item>
                </a-form-model>
                <Table />
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import Table from './Table.vue';

import moment from 'moment';
export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
        Table,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'date|': '2021-@integer(9,11)-@date(dd)',
                            time: '@pick(["08:00","09:00","10:30","14:30","15:30","16:30"])',
                            'courseName|+1': [
                                '教学总体布局及其实施',
                                '高效班级学习团队建设',
                                '习近平总书记关于中国共产党历史的重要论述',
                                '《忠诚》一党性救育情景课 （录像救学）',
                                '深刻认识把握坚持以人民为中心的发展思想',
                            ],
                            'teacherNO|+1': 400,
                            'classroomNo|+1': 500,
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
        // 初始化数据end
        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '序号',
            //     width: 150,
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'date',
                title: '日期',
                width: 100,
            },
            {
                dataIndex: 'time',
                title: '时间',
                width: 100,
            },
            {
                dataIndex: 'courseName',
                title: '课程名称',
                width: 100,
            },
            {
                dataIndex: 'teacherNO',
                title: '教师编号',
                width: 100,
            },
            {
                dataIndex: 'classroomNo',
                title: '教室编号',
                width: 100,
            },
        ];

        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            columns,
            moment,
            dateFormat: 'YYYY/MM/DD',
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
    },
};
</script>
<style lang="less" scoped>
.btn {
    margin-right: 10px;
}
</style>
