<template>
    <fragment>
        <a-form-model layout="inline">
            <a-form-model-item label="报名学期">
                <a-select default-value="lucy" style="width: 220px">
                    <a-select-option value="lucy">
                        2021年秋季学期
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form-model>
        <crud-table
            ref="crudTable"
            :showKeywords="false"
            :commands="tableCommands"
            :actions="tableActions"
            :columns="columns"
            :api="api"
            :scrollX="600"
            :defaultPagination="true"
        />
    </fragment>
</template>

<script>
import CrudTable from '@/component/rebue/CrudTable.vue';
export default {
    name: 'Manager',
    components: {
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            'id|+1': 10000000,
                            'qrcode|1-1000000': 193201,
                            class: '@pick(["计算机一班", "计算机二班"])',
                            startTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            endTime: '@now("yyyy-MM-dd HH:mm:ss")',
                            'total|1-20': 20,
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
        this.qrcode = require('./img/qrcode.png');
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
                dataIndex: 'qrcode',
                title: '报名二维码',
                width: 300,
                customRender: () => {
                    return (
                        <div>
                            <img width="50" src={this.qrcode} />
                            <span>
                                <a-button type="link">下载二维码</a-button>
                                <a-button type="link">一键分享</a-button>
                            </span>
                        </div>
                    );
                },
            },
            {
                dataIndex: 'class',
                title: '班级',
                width: 200,
            },
            {
                dataIndex: 'qrcode',
                title: '网上报名注册码',
                width: 200,
            },
            {
                dataIndex: 'startTime',
                title: '开始时间',
                width: 200,
            },
            {
                dataIndex: 'endTime',
                title: '结束时间',
                width: 200,
            },
            {
                dataIndex: 'total',
                title: '报名人数',
                width: 200,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '设置',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '统一报名入口',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '同步更新',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                title: '报名日志',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
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
.btn {
    margin-right: 10px;
}
</style>
