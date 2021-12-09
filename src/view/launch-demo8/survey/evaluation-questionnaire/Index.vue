<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div style="margin-bottom:10px">
                    <a-button class="btn">新增</a-button>
                    <a-button class="btn">编辑</a-button>
                    <a-button class="btn">删除</a-button>
                </div>
                <a-divider />
                <a-row type="flex">
                    <a-col :span="5">
                        <div class="table-left" style="overflow: auto">
                            <a-tree
                                style="margin-left: -30px;margin-top: -20px"
                                class="ant-card-body"
                                v-model="checkedKeys"
                                :default-selected-keys="selectedKeys"
                                :default-checked-keys="checkedKeys"
                                @Click="onCheck"
                                :tree-data="treeData"
                                :defaultExpandAll="true"
                            >
                            </a-tree>
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs :activeKey="curRealmId" @change="handleRealmChanged">
                            <a-tab-pane v-for="realm in realms" :key="realm.id" :tab="realm.name">
                                <p>问卷设计</p>
                                <a-form-model
                                    style="margin-left: -150px"
                                    :model="form"
                                    :label-col="{ span: 8 }"
                                    :wrapper-col="{ span: 14 }"
                                >
                                    <a-form-model-item label="标题">
                                        <a-input v-model="form.name" />
                                    </a-form-model-item>
                                    <a-form-model-item label="测评人身份">
                                        <a-select
                                            placeholder="
                                        院领导，机关部门领导，系部领导，单位职工"
                                        >
                                            <a-select-option value="广西党委">
                                                广西党委
                                            </a-select-option>
                                            <a-select-option value="广西政委">
                                                广西政委
                                            </a-select-option>
                                            <a-select-option value="广西团委">
                                                广西团委
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="选择测评内容">
                                        <a-select
                                            placeholder="
                                            广西区党校工作者”职业幸福感“调查问卷"
                                        >
                                            <a-select-option value="广西党委">
                                                广西党委
                                            </a-select-option>
                                            <a-select-option value="广西政委">
                                                广西政委
                                            </a-select-option>
                                            <a-select-option value="广西团委">
                                                广西团委
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="测评对象">
                                        <a-select placeholder="">
                                            <a-select-option value="广西党委">
                                                广西党委
                                            </a-select-option>
                                            <a-select-option value="广西政委">
                                                广西政委
                                            </a-select-option>
                                            <a-select-option value="广西团委">
                                                广西团委
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="测评人范围">
                                        <a-select placeholder="">
                                            <a-select-option value="广西党委">
                                                广西党委
                                            </a-select-option>
                                            <a-select-option value="广西政委">
                                                广西政委
                                            </a-select-option>
                                            <a-select-option value="广西团委">
                                                广西团委
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>

                                    <a-form-model-item label="开始测评时间">
                                        <a-date-picker type="date" placeholder="Pick a date" style="width: 100%;" />
                                    </a-form-model-item>
                                    <a-form-model-item label="结束测评时间">
                                        <a-date-picker type="date" placeholder="Pick a date" style="width: 100%;" />
                                    </a-form-model-item>
                                    <a-form-model-item label="显示合计">
                                        <a-switch />
                                    </a-form-model-item>
                                    <a-form-model-item label="问卷注释">
                                        <a-textarea></a-textarea>
                                    </a-form-model-item>
                                </a-form-model>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>

        <edit-form ref="editForm" @close="handleEditFormClose" />
        <manage-menus-form :curApp.sync="curApp" :visible.sync="manageMenusFormVisible" @close="handleEditFormClose" />
        <edit-auth-form ref="editAuthForm" @close="handleEditFormClose" />
    </fragment>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi, racAppApi, oapAppApi } from '@/api/Api';

import OrgTree from '@/view/rac/rac-org/Tree';
import BaseManager from '@/component/rebue/BaseManager';
import EditForm from '../../../rac/rac-account/EditForm';
import EditAuthForm from '../../../rac/rac-app/EditAuthForm';
import ManageMenusForm from '../../../rac/rac-app/ManageMenusForm';

export default {
    name: 'evaluation-questionnaire',
    components: {
        BaseManager,
        EditForm,
        EditAuthForm,
        // CrudTable,
        ManageMenusForm,
    },
    data() {
        const treeData = [
            {
                title: '中层领导',
                key: '1',
                children: [
                    {
                        title: '广西区党校工作者“职业幸福感”调查问卷',
                        key: '101',
                    },
                    {
                        title: '险地求生',
                        key: '102',
                    },
                    {
                        title: '事业单位党建工作调查问卷',
                        key: '103',
                    },
                ],
            },
            {
                title: '一般教职工',
                key: '106',
                children: [
                    {
                        title: '新学员调查问卷',
                        key: '1061',
                    },
                    {
                        title: '后勤服务中心意见征询表',
                        key: '1062',
                    },
                ],
            },
        ];
        this.api = racAppApi;
        const columns = [
            // {
            //     dataIndex: 'no',
            //     title: '#',
            //     scopedSlots: { customRender: 'serial' },
            //     width: 50,
            //
            // },
            {
                dataIndex: 'name',
                title: '班级',
                width: 200,
            },
            {
                dataIndex: 'id',
                title: '评委',
                width: 180,
            },
            {
                dataIndex: 'isCertified',
                title: '评分要素',
                width: 120,
                ellipsis: true,
                customRender: (text, record) => <span>{record.isCertified === true ? '是' : '否'}</span>,
            },
            {
                dataIndex: 'remark',
                title: '分数',
                width: 120,
                ellipsis: true,
            },

            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 200,
            //
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '查看',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
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
            {
                type: 'a',
                title: '菜单',
                onClick: record => this.handleMenus(record),
            },
            {
                type: 'a',
                title: '认证',
                onClick: record => this.handleAuth(record),
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: false,
            form: '',
            treeData,
        };
    },
    computed: {
        crudTable() {
            return this.$refs['crudTable.' + this.curRealmId][0];
        },
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.refreshData();
    },
    methods: {
        handleOrgMenuClick() {
            //
        },
        handleOrgTreeSelect() {
            //
        },
        /**
         * 启用禁用确认
         */
        confirmEnable(e, record) {
            const isEnabled = !record.isEnabled;
            //调用启用禁用接口
            racAppApi
                .enable({
                    id: record.id,
                    isEnabled,
                })
                .then(() => {
                    this.$set(record, 'isEnabled', isEnabled);
                    //或者重新加载table
                });
        },
        // 	显示隐藏的回调
        handleEnableVisibleChange(visible, record) {
            this.$set(record, 'enabledVisible', visible);
        },
        refreshData() {
            this.loading = true;
            racRealmApi
                .listAll()
                .then(ro => {
                    this.realms = [
                        { id: 'manage', name: '预览', remark: '' },
                        { id: 'count', name: '设置', remark: '' },
                        { id: '1', name: '测评组', remark: '' },
                    ];
                    console.log('@' + JSON.stringify(this.realms));
                    this.curRealmId = this.realms[0].id;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleRealmChanged(realmId) {
            this.curRealmId = realmId;
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
        /**
         * 处理应用认证的事件
         */
        handleAuth(record) {
            //根据appId查询认证信息，判断是展示添加弹窗还是编辑弹窗
            oapAppApi.getByAppId(record.id).then(ro => {
                let item = {
                    appId: record.id, // 添加认证需要appId
                    appName: record.name, //把应用名称带到弹窗
                };
                item = { ...item, ...ro.extra };
                if (ro?.extra.id != undefined) {
                    this.$refs.editAuthForm.show(EditFormTypeDic.Modify, item);
                    return;
                }
                this.$refs.editAuthForm.show(EditFormTypeDic.Add, item);
            });
        },
        /**
         * 上移
         */
        handleMoveUp(record) {
            this.loading = true;
            this.api
                .moveUp(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 下移
         */
        handleMoveDown(record) {
            this.loading = true;
            this.api
                .moveDown(record.id)
                .then(() => {
                    this.refreshTableData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>
<style scoped>
.btn {
    margin-right: 10px;
}
</style>
