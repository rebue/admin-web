<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="false"
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
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'ComparisonResults',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|10-20': [
                        {
                            'id|+1': 10000000,
                            title: '@ctitle',
                            className: '@pick(["计算机一班", "计算机二班","GC班"])',

                            'grade|50-99': 100,
                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            evaluationPeriod: '@pick(["评比初期", "评比中期","评比后期"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            // lastModifiedTime: '@date("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
                            // arriveTime: '@now("yyyy-MM-dd")',
                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });

                // 数据列表在这里设置
                const dataSource = mockList.list.sort(function(a, b) {
                    return parseInt(b.grade) - parseInt(a.grade); //相当于sort()中的a-b
                });
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
                title: '排名',
                width: '100',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'title',
                title: '文章标题',
                width: '200',
            },
            {
                dataIndex: 'grade',
                title: '分数',
                width: '100',
            },
            {
                dataIndex: 'author',
                title: '作者',
                width: '200',
            },
            {
                dataIndex: 'className',
                title: '班级名称',
                width: '200',
            },
            {
                dataIndex: 'evaluationPeriod',
                title: '评比期',
                width: '200',
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '查看',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '删除',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            formInline: {
                name: '',
                user: '',
            },
            moth: 37,
            startTime: '2021-12-8',
            endTime: '2021-12-15',
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onPanelChange(value, mode) {
            console.log(value, mode);
        },
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
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
