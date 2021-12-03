<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <h4>2021年秋季学期(2021-09-01 至 2021-12-31)学员网上选择选修课</h4>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
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
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
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
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'courseName',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'courseType',
                title: '课程类型',
                width: 150,
            },
            {
                dataIndex: 'teacher',
                title: '授课老师',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '课程开始时间',
                width: 150,
            },
            {
                dataIndex: 'length',
                title: '课时',
                width: 150,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];
        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     // icon: 'plus',
            //     title: '添加选修课',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];

        this.tableActions = [
            // {
            //     type: 'a',
            //     title: '取消选修课',
            //     onClick: () => {
            //         /**/
            //     },
            // },
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
