<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="6">
                        <a-radio-group :value="1">
                            <a-radio :value="1">
                                按时间
                            </a-radio>
                            <a-radio :value="2">
                                按课程
                            </a-radio>
                        </a-radio-group>
                        <a-calendar :fullscreen="false" style="width: 250px" />
                        <a-select default-value="lucy">
                            <a-select-option value="lucy">
                                01中青年干部培训一班（第45期）
                            </a-select-option>
                        </a-select>
                        <div>
                            上午：
                            <p style="background-color: #1890ff;color:#ff0">广西边海防形式发展</p>
                            下午：
                            <p>玉柴高质量发展思路</p>
                        </div>
                    </a-col>
                    <a-col :span="18">
                        <div>
                            <p>2021年秋季下学期01中青年干部培训一班（第45期）</p>
                            <h4><p>广西边海防形式发展</p></h4>
                            <p>地点：会议中心多功能展厅, 教师：外请</p>
                            <p>时间：2021-11-3 上午, 上课时间：8:30 下课时间：11:30</p>
                        </div>
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    name: 'Manager',
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
                    'list|1-30': [
                        {
                            'id|+1': 10000000,
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            // "accountId|1-1000000": 193201,
                            updator: '@cname()',
                            updatedTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            student: '@cname()',
                            startTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            course: '@pick(["锁定", "启用"])',
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list || [
                    {
                        id: 1,
                        // no: 1,
                        updator: 'zzm',
                        updatedTime: '2021-12-01 16:39:00',
                        course: '计算机科学与技术',
                        startTime: '2021-12-04 16:39:00',
                        student: '章三',
                        before: 'xx',
                        after: 'xx',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
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
            //     // fixed: 'left',
            //     scopedSlots: { customRender: 'serial' },
            // },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'inTime',
                title: '到的时间',
                width: 150,
            },
            {
                dataIndex: 'outTime',
                title: '走的时间',
                width: 150,
            },
            {
                dataIndex: 'type',
                title: '考勤方式',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'status',
                title: '状态',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'desc',
                title: '备注',
                width: 150,
                ellipsis: true,
            },
        ];
        return {
            columns,
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
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
