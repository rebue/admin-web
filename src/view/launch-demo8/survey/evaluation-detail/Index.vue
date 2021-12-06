<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div>
                    <a-button>新增</a-button>
                    <a-button>编辑</a-button>
                    <a-button>删除</a-button>
                </div>
                <div style="float: left;" v-show="showOrg" class="table-left">
                    <org-tree
                        :ref="`orgTree.platform`"
                        :show.sync="showOrg"
                        realmId="platform"
                        @click="handleOrgMenuClick"
                        @select="handleOrgTreeSelect"
                    />
                    <div class="table-divider"></div>
                </div>
                <div style="margin: 0 auto">
                    <p style="text-align: center">广西党校职业工作者”职业幸福感“调查问卷内容</p>
                    <table class="table1">
                        <tr>
                            <td class="td1">项目</td>
                            <td class="td2">要素</td>
                            <td class="td3">主要内容</td>
                            <td class="td4"></td>
                        </tr>
                        <tr>
                            <td class="td1" rowspan="4">项目</td>
                            <td class="td2">A.三十岁以下</td>
                            <td class="td3"></td>
                            <td class="td4">1</td>
                        </tr>
                        <tr>
                            <td class="td2">B.31-40岁</td>
                            <td class="td3"></td>
                            <td class="td4">2</td>
                        </tr>
                        <tr>
                            <td class="td2">C.41-50岁</td>
                            <td class="td3"></td>
                            <td class="td4">3</td>
                        </tr>
                        <tr>
                            <td class="td2">D.50岁以上</td>
                            <td class="td3"></td>
                            <td class="td4">4</td>
                        </tr>
                        <tr>
                            <td class="td1" rowspan="2">您的性别</td>
                            <td class="td2">A.男</td>
                            <td class="td3"></td>
                            <td class="td4">5</td>
                        </tr>
                        <tr>
                            <td class="td2">B.女</td>
                            <td class="td3"></td>
                            <td class="td4">6</td>
                        </tr>
                        <tr>
                            <td class="td1" rowspan="4">您的工作效率</td>
                            <td class="td2">A.行政</td>
                            <td class="td3">使用[请导入部门]语法导入</td>
                            <td class="td4">7</td>
                        </tr>
                        <tr>
                            <td class="td2">B.教辅</td>
                            <td class="td3">使用[请导入部门]语法导入</td>
                            <td class="td4">8</td>
                        </tr>
                        <tr>
                            <td class="td2">C.教研部</td>
                            <td class="td3">使用[请导入部门]语法导入</td>
                            <td class="td4">9</td>
                        </tr>
                        <tr>
                            <td class="td2">D.后勤服务</td>
                            <td class="td3"></td>
                            <td class="td4">10</td>
                        </tr>
                        <tr>
                            <td class="td1" rowspan="4">您的专业技术职务</td>
                            <td class="td2">A.教授</td>
                            <td class="td3"></td>
                            <td class="td4">11</td>
                        </tr>
                        <tr>
                            <td class="td2">B.副教授</td>
                            <td class="td3"></td>
                            <td class="td4">12</td>
                        </tr>
                        <tr>
                            <td class="td2">C.中职技术职务以下</td>
                            <td class="td3"></td>
                            <td class="td4">13</td>
                        </tr>
                        <tr>
                            <td class="td2">D.初级技术职务以下</td>
                            <td class="td3"></td>
                            <td class="td4">14</td>
                        </tr>
                    </table>
                </div>
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
    name: 'evaluation-detail',
    components: {
        BaseManager,
        EditForm,
        EditAuthForm,
        // CrudTable,
        ManageMenusForm,
        // eslint-disable-next-line no-undef
        OrgTree,
    },
    data() {
        this.api = racAppApi;

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            showOrg: false,
            form: '',
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
                        { id: '1', name: '评分组', remark: '' },
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
.table1 {
    width: 750px;
    margin: 0 auto;
}
.table1 td {
    border: 1px solid #000;
    height: 40px;
    padding: 5px;
    text-align: center;
}
.td1 {
    width: 300px;
}
.td2 {
    width: 80px;
}
.td3 {
    width: 250px;
}
.td4 {
    width: 20px;
}
</style>
