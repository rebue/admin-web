//流程查询
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5">
                        <a-tree
                            v-model="checkedKeys"
                            :auto-expand-parent="autoExpandParent"
                            :default-selected-keys="selectedKeys"
                            :default-checked-keys="checkedKeys"
                            :default-expanded-keys="expandedKeys"
                            :tree-data="treeData"
                            @check="onCheck"
                            :defaultExpandAll="true"
                        />
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            ref="crudTable"
                            :commands="tableCommands"
                            :columns="columns"
                            :actions="tableActions"
                            :api="api"
                            :scrollX="800"
                            :defaultPagination="true"
                            :showKeywords="false"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
                <div>
                    <a-modal
                        width="600px"
                        :title="title"
                        :visible="visible"
                        :confirm-loading="confirmLoading"
                        @cancel="handleCancel"
                    >
                        <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                            <a-form-model-item label="提交人:">
                                <a-input placeholder="" v-model="tableObj.apply" :disabled="context" />
                            </a-form-model-item>
                            <a-form-model-item label="文件名称:">
                                <a-input :disabled="context" v-model="tableObj.filename" />
                            </a-form-model-item>
                            <a-form-model-item label="专题名称:">
                                <a-input type="textarea" :disabled="context" v-model="tableObj.active" />
                            </a-form-model-item>
                            <a-form-model-item label="代办活动:">
                                <a-input :disabled="context" v-model="tableObj.active" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="主办人:">
                                <a-input :disabled="context" v-model="tableObj.handle" placeholder="" />
                            </a-form-model-item>
                            <a-form-model-item label="发送时间:">
                                <a-date-picker
                                    :disabled="context"
                                    v-model="tableObj.sendTime"
                                    v-decorator="['发送时间', config]"
                                    show-time
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </a-form-model-item>
                            <a-form-model-item label="发送次数:">
                                <a-input :disabled="context" v-model="tableObj.total" placeholder="" />
                            </a-form-model-item>
                        </a-form-model>
                    </a-modal>
                </div>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';

const process = ['流程环节', '流程环节2', '流程环节3'];
const approver = ['审批人', '审批人2', '审批人3'];
export default {
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
        // OrgTree,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            apply: '@cname',
                            filename:
                                '@pick(["后勤服务中心举办消防知识宣传讲座","2020级中共党史党建专业在职研究生班举行党史学习交流研讨会","院举办全区退役军人工作专题研修班","财务处组织开展我为教职工办实事解难题联合主题党日活动","固定资产卡片信息变更申请表","促党建提业务强队伍----网络培训部党支部开展党建理论和业务工作学习","注重学习教育宣传，营造干事创业氛围","业务指导工作处党支部开展“缅怀革命先烈、追寻英雄精神”主题党日活动"])',
                            active: '@pick(["送办", "处室审阅"])',
                            handle: '@cname',
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
        const treeData = [
            {
                title: '办公管理',
                key: '1',
                children: [
                    {
                        title: '网上发布',
                        key: '101',
                    },
                    {
                        title: '邀请函',
                        key: '102',
                    },
                    {
                        title: '接待审批流程',
                        key: '103',
                    },
                    {
                        title: '收文办理(校内呈文)',
                        key: '104',
                    },
                    {
                        title: '发文办理(红头文件)',
                        key: '105',
                    },
                    {
                        title: '网上发布',
                        key: '106',
                    },
                ],
            },
            {
                title: '行政管理',
                key: '2',
                children: [
                    {
                        title: '文印登记',
                        key: '201',
                    },
                ],
            },
        ];

        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'apply',
                title: '提交人',
                width: 100,
            },
            {
                dataIndex: 'filename',
                title: '文件名称',
                width: 250,
            },
            {
                dataIndex: 'active',
                title: '待办活动',
                width: 100,
            },
            {
                dataIndex: 'handle',
                title: '主办人',
                width: 100,
            },
            {
                dataIndex: 'sendTime',
                title: '发送时间',
                width: 200,
            },
            {
                dataIndex: 'total',
                title: '发送次数',
                width: 200,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     title: '发送',
            //     onClick: () => {
            //         /**/
            //     },
            // }
        ];
        this.tableActions = [
            {
                type: 'a',
                title: '发送',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '查看',
                onClick: record => this.handleShow(record),
            },
        ];

        return {
            visible: false,
            title: '',
            context: false,
            expandedKeys: ['2021', '20211'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            columns,
            showOrg: false,
            curOrgId: undefined,
            process,
            approver,
            tableObj: {
                apply: '',
                filename: '',
                active: '',
                handle: '',
                sendTime: '',
                total: '',
            },
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleCancel() {
            this.visible = false;
        },
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        //** 查看事件*/
        handleShow(value) {
            this.tableObj = value;
            this.context = true;
            this.title = '查看详情';
            this.visible = true;
        },
        /**
         * 新增事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 编辑事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 删除事件
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
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            this.$nextTick(this.refreshTableData);
        },
    },
    watch: {
        checkedKeys(val) {
            console.log('onCheck', val);
        },
    },
};
</script>

<style type="text/css">
.ant-row {
    background-color: #ffffff;
}
</style>
