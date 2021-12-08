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
                    :rowSelection="{}"
                >
                    <template #commands>
                        <div style="width: 100%;">
                            <div style="float: left">年第{{ moth }}周[{{ startTime }}至{{ endTime }}]</div>
                        </div>
                    </template>
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
    name: 'curriculum',
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
                            className:
                                '@pick(["马克思列宁思想与哲学", "大学物理","高等数学","数据结构","c语言程序设计","java程序设计",' +
                                '"数据库原理","设计模式","毛泽东思想概论","html程序设计","操作系统"])',
                            classType: '@pick(["必修","选修"])',
                            classTeacher: '@cname',
                            startTime: '@date("yyyy-MM-dd HH:mm:ss")',
                            endTime: '@date("yyyy-MM-dd HH:mm:ss")',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            classHour: '@pick(["64", "24","46"])',
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
                dataIndex: 'className',
                title: '课程名称',
                width: 150,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'classType',
                title: '课程类型',
                width: 150,
            },
            {
                dataIndex: 'classTeacher',
                title: '周授课老师',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '课程开始时间',
                width: 180,
                ellipsis: true,
            },
            {
                dataIndex: 'endTime',
                title: '课程结束时间',
                width: 180,
                ellipsis: true,
            },
            {
                dataIndex: 'classHour',
                title: '课时',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,

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
                type: 'a',
                title: '选课',
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
