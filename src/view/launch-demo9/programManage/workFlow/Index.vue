<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div class="stepsCss">
                    <a-steps :current="0">
                        <a-step>
                            <template slot="title">
                                开始事件
                            </template>
                            <a-icon slot="icon" type="clock-circle" />
                        </a-step>
                        <a-step title="学生/教室申请">
                            <a-icon slot="icon" type="user" />
                        </a-step>
                        <a-step title="主办方单位意见">
                            <a-icon slot="icon" type="user" />
                        </a-step>
                        <a-step title="宣传部工作人员">
                            <a-icon slot="icon" type="user" />
                        </a-step>
                        <a-step title="党委宣传部意见">
                            <a-icon slot="icon" type="user" />
                        </a-step>
                        <a-step title="学院领导审批">
                            <a-icon slot="icon" type="user" />
                        </a-step>
                        <a-step title="结束事件">
                            <a-icon slot="icon" type="stop" />
                        </a-step>
                    </a-steps>
                </div>
                <template>
                    <div v-show="showOrg" class="table-left">
                        <a-tree class="ant-card-body" :defaultExpandAll="true" :tree-data="treeData" />
                        <div class="table-divider"></div>
                    </div>
                </template>
                <div class="fromCss">
                    <a-form-model
                        layout="inline"
                        :model="formInline"
                        @submit="handleSubmit"
                        :label-col="labelCol"
                        :wrapper-col="wrapperCol"
                    >
                        <a-row>
                            <a-col :span="12" v-for="(item, index) in fromList" :key="index">
                                <a-form-model-item :label="item.name">
                                    <a-input
                                        v-model="formInline.user"
                                        disabled
                                        :placeholder="item.placeholder"
                                    ></a-input>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                    </a-form-model>
                </div>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    name: 'Manager',
    components: {
        BaseManager,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        value1: '1区',
                        value2: '1',
                        value3: '2',
                        value4: '1',
                        value5: 'No1',
                        value6: '4',
                        value7: '6',
                        value8: '400',
                        value9: '6',
                        value10: '600',
                        value11: '',
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
        const treeData = [
            {
                title: '开始事件',
                key: '1',
                children: [
                    {
                        title: '定时开始事件',
                        key: '1-1',
                    },
                    {
                        title: '信号开始事件',
                        key: '1-2',
                    },
                    {
                        title: '消息开始事件',
                        key: '1-3',
                    },
                    {
                        title: '错误开始事件',
                        key: '1-4',
                    },
                ],
            },
            {
                title: '任务',
                key: '2',
                children: [],
            },
            {
                title: '结构',
                key: '3',
                children: [],
            },
            {
                title: '网关',
                key: '4',
                children: [],
            },
            {
                title: '边界事件',
                key: '5',
                children: [],
            },
            {
                title: '中间捕捉事件',
                key: '6',
                children: [],
            },
            {
                title: '中间抛出事件',
                key: '7',
                children: [],
            },
            {
                title: '结束事件',
                key: '8',
                children: [],
            },
            {
                title: '泳道',
                key: '9',
                children: [],
            },
        ];
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '原信息维护',
                onClick: record => this.handleEdit(record),
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
                onClick: record => this.handleDel(record),
            },
        ];
        return {
            fromList: [
                {
                    name: '主键ID',
                    placeholder: '沒有值',
                },
                {
                    name: '名称',
                    placeholder: '沒有值',
                },
                {
                    name: '描述信息',
                    placeholder: '沒有值',
                },
                {
                    name: '执行监听器',
                    placeholder: '未配置执行监听器',
                },
                {
                    name: '启动器',
                    placeholder: '沒有值',
                },
                {
                    name: '表单编号',
                    placeholder: '沒有值',
                },
                {
                    name: '表单属性',
                    placeholder: '未选择表单属性',
                },
            ],
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            formInline: {
                user: '',
                password: '',
            },
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            treeData,
            showOrg: true,
        };
    },
    mounted() {
        //
    },
    methods: {
        handleSubmit(e) {
            console.log(this.formInline);
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
         * 处理添加应用的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {
                realmId: this.curRealmId,
            });
        },
        /**
         * 处理编辑应用的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除应用的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api
                .delById(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 处理应用菜单的事件
         */
        handleMenus(record) {
            this.curApp = record;
            this.manageMenusFormVisible = true;
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>

<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}
.stepsCss {
    width: calc(100% - 230px);
    margin-top: 20px;
    float: right;
}
.fromCss {
    width: calc(100% - 230px);
    margin-top: 50px;
    float: right;
    /deep/ .ant-form-item {
        width: 100%;
    }
}
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    float: left;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
    .ant-card-body {
        width: 200px;
        overflow: auto;
        padding: 0;
    }
}
</style>
