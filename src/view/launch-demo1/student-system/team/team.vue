<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5" style="overflow: auto">
                        <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height: 100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="false"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :rowSelection="{}"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
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

export default {
    name: 'team',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '2021年秋季学期培训班次',
                key: '1',
                children: [
                    {
                        title: '自治区党委管理干部“学习”',
                        key: '101',
                    },
                    {
                        title: '贯彻习近平新时代中国特色社会主义思想',
                        key: '102',
                    },
                ],
            },
            {
                title: '2021年春季学期培训班次',
                key: '2',
                children: [
                    {
                        title: '自治区党委管理干部“学习”',
                        key: '201',
                    },
                    {
                        title: '贯彻习近平新时代中国特色社会主义思想',
                        key: '202',
                    },
                ],
            },
        ];
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|20': [
                        {
                            'id|+1': 10000000,

                            'groupNo|10001-99999': 99999,
                            name: '@cname',
                            sex: '@pick(["男", "女"])',
                            classJob:
                                '@pick(["学习委员", "班长", "副班长", "体育委员", "劳动委员", "团支书", "组织委员", "无职务"])',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            status: '@pick(["已填", "未填"])',
                            class: '@pick(["计算机一班", "计算机二班","GC班"])',
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
                dataIndex: 'status',
                title: '状态',
                width: 100,
            },
            {
                dataIndex: 'groupNo',
                title: '组号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'classJob',
                title: '班级职务',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'class',
                title: '班级',
                width: 300,
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
                title: '视图',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '毕业鉴定',
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
            showOrg: false,
            moth: 37,
            treeData,
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
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
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
