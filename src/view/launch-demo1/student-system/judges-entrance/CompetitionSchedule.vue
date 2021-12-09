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
                    <template #commands>
                        <div style="float:right;margin-top: 20px">
                            <p>月十佳文章评比阶段时间表</p>
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
                    'list|5': [
                        {
                            'id|+1': 10000000,
                            'phaseName|+1': [
                                '学员论坛文章时间范围',
                                '班级推荐文章和评委',
                                '学习部确认文章',
                                '评委要素',
                                '汇总评比结果',
                            ],
                            classDate: '@date("yyyy-MM-dd")',
                            startTime: '@date("yyyy-MM-dd HH:mm:ss")',
                            endTime: '@date("yyyy-MM-dd HH:mm:ss")',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            'explain|+1': [
                                '确定本次“月十佳文章”评比中选取学员论坛中提交文章的时间范围，也就是在这个时间段内发表在学员论坛的文章才会允许推选',
                                '每班由学习委员推荐5篇文章，5个评委',
                                '',
                                '',
                                '',
                            ],
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
                title: '序号',
                width: 100,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'phaseName',
                title: '阶段名称',
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '起始时间',
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '截止时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'explain',
                title: '阶段说明',
                width: 400,
            },
        ];

        this.tableCommands = [];

        this.tableActions = [
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '查看班级课程',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '查看学员宿舍',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置班级编码',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置网上报名注册码',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
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
