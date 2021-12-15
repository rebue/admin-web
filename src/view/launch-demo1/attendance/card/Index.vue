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
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

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
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|20': [
                        {
                            no: '@integer(3000000,3999999)',
                            createdTime:
                                '@pick(["2021-10-11 11:11","2021-11-05 11:12","2021-09-21 11:14","2021-11-18 11:16"])',
                            device: '@pick(["多功能厅西门","综合楼东门","实训楼东门","图书馆西门"])@ip()',
                            name: '@cname()',
                            'className|+1': [
                                '第1期中青年干部培训一班',
                                '第2期全区党校(行政院校)系统师资培训班',
                                '第3期全区党校(行政院校)系统师资培训班',
                                '第4期全区党校(行政院校)系统师资培训班',
                                '第5期中青年干部培训二班班',
                                '第6期县处级领导干部进修班',
                            ],
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
                title: '卡序列号',
                width: 150,
                ellipsis: true,
                // scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'createdTime',
                title: '刷卡时间',
                width: 150,
            },
            {
                dataIndex: 'device',
                title: '考勤机',
                width: 200,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 80,
            },
            {
                dataIndex: 'className',
                title: '班级',
                width: 220,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '导出',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看考勤',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: () => {
                    /**/
                },
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
