<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-button>新增</a-button>
                <a-button>编辑</a-button>
                <a-button>删除</a-button>
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
                <center>
                    <p>广西区党校工作者”职业幸福感“调查问卷内容</p>
                    <table>
                        <tr>
                            <td class="td1">项目</td>
                            <td class="td2">要素</td>
                            <td class="td3">主要内容</td>
                            <td class="td4"></td>
                        </tr>
                    </table>
                </center>
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
