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
                        <a-form-model layout="inline">
                            <a-form-model-item>
                                <a-select default-value="lucy" style="width: 220px">
                                    <a-select-option value="lucy">
                                        2021年秋季学期
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-form-model>
                    </template>
                </crud-table>
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
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            orign: '@cword(3,6)',
                            'date|': '@date(yyyy-MM-dd)',
                            wubie: '',
                            course: '测试课程',
                            teacher: '@cname',
                            classroom: '@integer(1,9)号教室',
                            ssica: '',
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
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'orign',
                title: '课程来源',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '日期',
                width: 150,
            },
            {
                dataIndex: 'wubie',
                title: '午别',
                width: 150,
            },
            {
                dataIndex: 'course',
                title: '课程名称',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'teacher',
                title: '教师',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'classroom',
                title: '教室',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'ssica',
                title: '评估问卷',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '选择选修课',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'confirm',
                title: '取消选修课',
                confirmTitle: '你确定要取消这个选修课吗?',
                onClick: record => this.handleCancel(record),
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
        /**
         * 点击取消选修课事件
         */
        handleCancel(record) {
            //
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
