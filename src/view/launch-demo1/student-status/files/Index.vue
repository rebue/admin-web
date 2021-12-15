<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5" style="overflow: auto">
                        <a-tree show-icon :defaultExpandAll="true" :tree-data="treeData">
                            <a-icon slot="clock-circle" type="clock-circle-o" />
                        </a-tree>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height: 100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :showKeywords="true"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :query="{ orgId: curOrgId }"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
        <edit-form ref="editForm" @close="handleEditFormClose" />
        <a-modal v-model="checkVisible" title="审核" @ok="handleCheckOk">
            <a-form-model :model="form" v-bind="layout">
                <a-form-model-item label="学员姓名">
                    {{ form.name }}
                </a-form-model-item>
                <a-form-model-item label="是否通过">
                    <a-radio-group v-model="value">
                        <a-radio :value="1">
                            通过
                        </a-radio>
                        <a-radio :value="2">
                            不通过
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal v-model="leaveVisible" title="离校" @ok="handleLeaveOk">
            <a-form-model :model="form" v-bind="layout">
                <a-form-model-item label="学员姓名">
                    {{ form.name }}
                </a-form-model-item>
                <a-form-model-item label="是否离校">
                    <a-radio-group v-model="value">
                        <a-radio :value="1">
                            是
                        </a-radio>
                        <a-radio :value="2">
                            否
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        EditForm,
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
                            source: '网上报名',
                            'orgId|+1': 1,
                            name: '@cname()',
                            sex: '@pick(["男","女"])',
                            birth: '@integer(1990,2005)-@date(MM)',
                            'stunum|+1': 20210000,
                            'ICCard|+1': 3000,
                            'carId|+1': 400000,
                            IdCard: '@id()',
                            phone: '138@integer(10000000,99999999)',
                            'dormitoryId|+1': 500,
                            'className|+1': [
                                '中青年干部培训一班（第45期）',
                                '中青年干部培训二班（第8期）',
                                '县处级公务员任职培训班（第22期）',
                                '乡（镇）党委书记进修班（第36期）“乡村振兴” 研究专题',
                                '全区非公企业党组织书记专题研讨班',
                                '全区党校（行政院校）系统师资培训班（第21期）',
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
                dataIndex: 'source',
                title: '数据来源',
                width: 150,
                // fixed: 'left',
                // scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'orgId',
                title: '小组号',
                width: 150,
                // fixed: 'left',
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
                dataIndex: 'birth',
                title: '出生年月',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'stunum',
                title: '学号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'ICCard',
                title: 'IC卡号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'carId',
                title: '车牌号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'IdCard',
                title: '证件号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'level',
                title: '班级职务',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'phone',
                title: '手机',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'dormitoryId',
                title: '宿舍编号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'className',
                title: '班级',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 200,
                // fixed: 'right',
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
                title: '新建',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '同步',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '导出',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '导入',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '列出本期同名',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: record => this.handleView(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '编辑',
                        onClick: record => this.handleEdit(record),
                    },

                    {
                        type: 'a',
                        title: '审核',
                        onClick: record => this.handleCheck(record),
                    },
                    {
                        type: 'a',
                        title: '离校',
                        onClick: record => this.handleLeave(record),
                    },
                ],
            },
        ];

        const treeData = [
            {
                title: '所有学期',
                key: '100',
            },
            {
                title: '2021年秋季学期',
                key: '101',
                children: [
                    {
                        title: '中青年干部培训—班(第45期)',
                        key: '101-1',
                        slots: {
                            icon: 'clock-circle',
                        },
                    },
                    {
                        title: '中青年干部培训二班(第8期)',
                        key: '101-2',
                        slots: {
                            icon: 'clock-circle',
                        },
                    },
                    {
                        title: '自治区党委管理干部进修班(第28期)“学习贯彻落实习近平总书记对广',
                        key: '101-3',
                    },
                ],
            },
        ];

        return {
            columns,
            treeData,
            curOrgId: undefined,
            checkVisible: false,
            leaveVisible: false,
            form: {},
            value: '',
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
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
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理查看场地的事件
         */
        handleView(record) {
            this.editForm.show(EditFormTypeDic.View, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            // this.loading = true;
            // this.api.delById(record.id).finally(() => {
            //     this.refreshTableData();
            // });
        },
        /**
         * 处理点击审核事件
         */
        handleCheck(record) {
            this.form = record;
            this.checkVisible = true;
        },
        /**
         * 确认
         */
        handleCheckOk() {
            this.checkVisible = false;
        },
        /**
         * 点击离校事件
         */
        handleLeave(record) {
            this.form = record;
            this.leaveVisible = true;
        },
        handleLeaveOk() {
            this.leaveVisible = false;
        },
        handleEditFormClose() {
            // this.refreshTableData();
        },

        // /** 处理组织菜单点击节点的事件 */
        // handleOrgMenuClick(item) {
        //     this.curOrgId = item.id;
        //     this.$nextTick(() => {
        //         this.refreshTableData();
        //     });
        // },
        // /** 处理组织树选择节点的事件 */
        // handleOrgTreeSelect({ isSelected, item }) {
        //     this.curOrgId = isSelected ? item.id : undefined;
        //     this.$nextTick(this.refreshTableData);
        // },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    width: 200px;
    overflow: scroll;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
