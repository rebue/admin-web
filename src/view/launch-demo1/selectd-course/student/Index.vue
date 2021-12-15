<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline">
                    <a-form-model-item label="请选择学期">
                        <a-select default-value="lucy" style="width: 120px">
                            <a-select-option value="lucy">
                                2021年秋季学期
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>
                <h2>中青年干部培训一班（第45期）</h2>
                <!-- <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                </crud-table> -->
                <a-table
                    :columns="columns"
                    :data-source="data1"
                    bordered
                    size="middle"
                    :scroll="{ x: 'calc(700px + 50%)', y: 240 }"
                />
                <a-divider />
                <div>未选学员</div>
                <div>
                    <a-tag color="#f50">李梅</a-tag>
                </div>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

import moment from 'moment';
export default {
    name: 'Manager',
    components: {
        BaseManager,
        // CrudTable,
    },

    data() {
        const mockList1 = require('mockjs').mock({
            'list|1-20': [
                {
                    name: '@cname()',
                    'course|+1': [
                        '教学总体布局及其实施',
                        '高效班级学习团队建设',
                        '习近平总书记关于中国共产党历史的重要论述',
                        '《忠诚》一党性救育情景课 （录像救学）',
                        '深刻认识把握坚持以人民为中心的发展思想',
                    ],
                    'date|': '2021-@date(MM-dd)',
                },
            ],
        });
        const data1 = mockList1.list;

        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            name: '@cname()',
                            'course|+1': [
                                '教学总体布局及其实施',
                                '高效班级学习团队建设',
                                '习近平总书记关于中国共产党历史的重要论述',
                                '《忠诚》一党性救育情景课 （录像救学）',
                                '深刻认识把握坚持以人民为中心的发展思想',
                            ],
                            'date|': '2021-@date(MM-dd)',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                console.log(dataSource);
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
            {
                // dataIndex: 'test',
                title: '开班临时测试(测试需要)',
                width: 300,
                ellipsis: true,
                children: [
                    {
                        title: '姓名',
                        width: 50,
                        dataIndex: 'name',
                        ellipsis: true,
                    },
                    {
                        title: '所选课程',
                        width: 150,
                        // dataIndex: 'course',
                        ellipsis: true,
                        children: [
                            {
                                title: '课程名称',
                                dataIndex: 'course',
                                width: 75,
                            },
                            {
                                title: '日期',
                                dataIndex: 'date',
                                width: 75,
                            },
                        ],
                    },
                ],
            },
        ];

        return {
            columns,
            moment,
            dateFormat: 'YYYY/MM/DD',
            api: {},
            data1,
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
