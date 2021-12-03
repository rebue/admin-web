<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline">
                    <a-form-model-item label="学期">
                        <a-select default-value="lucy" style="width: 120px">
                            <a-select-option value="lucy">
                                2021年秋季学期
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="班级">
                        <a-select default-value="lucy">
                            <a-select-option value="lucy">
                                01中青年干部培训一班（第45期）
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="月">
                        <a-select default-value="lucy">
                            <a-select-option value="lucy">
                                自动查询
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="标记类型">
                        <a-select default-value="lucy">
                            <a-select-option value="lucy">
                                使用文字
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-checkbox :checked="true">
                            是否显示异常
                        </a-checkbox>
                    </a-form-model-item>
                    <a-form-model-item label="显示范围">
                        <a-radio-group :value="1">
                            <a-radio :value="1">
                                全部
                            </a-radio>
                            <a-radio :value="2">
                                异常
                            </a-radio>
                            <a-radio :value="3">
                                正常
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-checkbox>
                            我要恢复当前月份异常刷卡缺勤
                        </a-checkbox>
                    </a-form-model-item>
                </a-form-model>
                <div>
                    <a-button class="btn">提交</a-button>
                    <a-button class="btn">打印</a-button>
                    <a-button class="btn">导出</a-button>
                </div>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                />
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import moment from 'moment';
let date = moment('2021/09/01');
const map = [];
const list = {
    0: '星期天',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
};

while (date.format('YYYY-MM-DD') !== '2021-12-01') {
    console.log('---', date.format('YYYY-MM-DD'));
    if (date.day() != 0 || date.day() != 6) {
        map.push({
            title: date.format('MM-DD'),
            dataIndex: date.format('MM-DD') + '',
            width: 80,
            children: [
                {
                    title: list[date.day()],
                    dataIndex: date.format('MM-DD') + '',
                    width: 80,
                },
            ],
        });
    }
    date = date.add(1, 'days');
}
console.log('---map', map);
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
                fixed: 'left',
                width: 100,
            },
            ...map,
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
.btn {
    margin-right: 10px;
}
</style>
