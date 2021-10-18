<template>
    <a-drawer
        :title="'用户(' + user.realName + ')的账户'"
        placement="right"
        :closable="true"
        :mask="true"
        :keyboard="true"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        :width="600"
        v-bind="$attrs"
        v-on="$listeners"
        @close="onClose"
    >
        <div class="table-commands">
            <slot name="commands">
                <a-button type="primary" icon="plus" @click="handleAddAccount" style="margin-right:10px;">
                    添加
                </a-button>
                <a-button type="primary" icon="plus" @click="handleChooseAccount">
                    选择账户
                </a-button>
            </slot>
        </div>
        <p></p>
        <a-table
            :columns="columns"
            :data-source="dataSource"
            :rowKey="(account, index) => (account.id ? account.id : index)"
            :pagination="false"
        >
            <span slot="action" slot-scope="text, record">
                <template v-for="(item, index) in tableActions">
                    <span :key="index">
                        <a v-if="item.type === 'a'" @click="item.onClick(record)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type === 'confirm'"
                            :title="item.confirmTitle"
                            @confirm="item.onClick(record)"
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>{{ item.title }}</a>
                        </a-popconfirm>
                        <a-dropdown v-if="item.type === 'more'">
                            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                                更多 <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay">
                                <template v-for="(moreItem, moreIndex) in item.items">
                                    <a-menu-item :key="moreIndex">
                                        <a @click="moreItem.onClick(record)">{{ moreItem.title }}</a>
                                    </a-menu-item>
                                </template>
                            </a-menu>
                        </a-dropdown>
                        <a-divider v-if="index < tableActions.length - 1" type="vertical" />
                    </span>
                </template>
            </span>
        </a-table>
        <editUser-form
            v-if="managerModifyOrgFormVisible"
            :modifyOrgId="modifyOrgId"
            :hideHandleModify="hideHandleModify"
            @close="refreshData"
        ></editUser-form>
        <!-- 修改密码 -->
        <change-pswd-form :record="modifyOrgId" :visible.sync="changePswdFormVisible" @close="refreshData" />
        <!-- 组织 -->
        <manage-org-form
            ref="manageOrgForm"
            :account="modifyOrgId"
            :visible.sync="manageOrgFormVisible"
            @close="refreshData"
        />
    </a-drawer>
</template>

<script>
import { racAccountApi, racRealmApi } from '@/api/Api';
// import ManageAddUserForm from './ManageAddUserForm.vue';
import ChangePswdForm from '../rac-account/ChangePswdForm.vue';
import EditUserForm from './EditUserForm.vue';
import ManageOrgForm from '../rac-account/ManageOrgForm.vue';
export default {
    components: {
        // ManageAddUserForm,
        EditUserForm,
        ChangePswdForm,
        ManageOrgForm,
    },
    props: {
        user: {
            type: Object,
            required: false,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        this.width = 550;
        const that = this;
        const columns = [
            {
                dataIndex: 'signInName',
                title: '账号名称',
                fixed: 'left',
                scopedSlots: { customRender: 'tagName' },
            },
            {
                dataIndex: 'signInNickname',
                title: '昵称',
            },
            {
                dataIndex: 'realmId',
                title: '领域名称',
                customRender: text => {
                    for (const v of that.realmList) {
                        if (v.id == text) {
                            return v.name;
                        }
                    }
                },
            },
            {
                dataIndex: 'action',
                title: '操作',
                //width: 250,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableActions = [
            {
                type: 'confirm',
                title: '移除',
                confirmTitle: '你确定要移除该账号吗?',
                onClick: record => this.handleRemoveAccount(record),
            },
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '修改密码',
                        onClick: record => this.handleChangePswd(record),
                    },
                    {
                        type: 'a',
                        title: '修改账号',
                        onClick: record => this.handleModify(record),
                    },
                    {
                        type: 'a',
                        title: '管理组织',
                        onClick: record => this.handleManageAccount(record),
                    },
                ],
            },
        ];
        return {
            loading: false,
            dataSource: [],
            realmList: [],
            existAccountIds: [],
            columns,
            showAccount: false,
            manageAddAccountFormVisible: false,
            managerModifyOrgFormVisible: false,
            manageOrgFormVisible: false,
            changePswdFormVisible: false,
            modifyOrgId: {},
        };
    },
    computed: {},
    watch: {
        visible(val) {
            if (val) {
                console.log(val);
                this.$nextTick(() => {
                    this.refreshData();
                });
            }
        },
    },
    created() {
        this.getRealmList();
    },
    mounted() {
        // this.manageAddAccountForm = this.$refs.manageAddAccountForm;
        // this.managerModifyAccountForm = this.$refs.managerModifyAccountForm;
    },
    methods: {
        getRealmList() {
            racRealmApi.listAll().then(ro => {
                this.realmList = ro.extra.list;
            });
        },
        /** 刷新数据 */
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.user };
                const userId = id;
                const data = { userId };
                racAccountApi
                    .getAccountListByUser(data)
                    .then(ro => {
                        this.dataSource = ro.extra.list;
                    })
                    .finally(() => {
                        this.existAccountIds = [];
                        for (const list of this.dataSource) {
                            this.existAccountIds.push(list.id);
                        }
                        this.loading = false;
                    });
            });
        },
        /** 修改账号信息 */
        handleModify(orgMo) {
            this.modifyOrgId = orgMo;
            this.managerModifyOrgFormVisible = true;
        },
        /** 处理修改密码 */
        handleChangePswd(record) {
            this.modifyOrgId = record;
            this.changePswdFormVisible = true;
        },
        /**
         * 处理管理组织事件
         */
        handleManageAccount(record) {
            this.modifyOrgId = record;
            this.manageOrgFormVisible = true;
        },
        //关闭修改账号信息
        hideHandleModify() {
            this.managerModifyOrgFormVisible = false;
            this.refreshData();
        },
        /**切换抽屉时动画结束后的回调 */
        afterVisibleChange(val) {
            console.log('visible', val);
        },
        //关闭抽屉
        onClose() {
            this.hideHandleModify();
            this.$emit('update:visible', false);
        },
        /**
         * 处理添加账号关系的事件
         */
        handleAdd() {
            this.manageAddAccountFormVisible = true;
        },

        //**点击返回 */
        handleCancel() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        /**
         * 处理添加账户的事件
         */
        handleAddAccount() {
            const that = this;
            this.$showDialog(
                require('./add/AccountForm.vue').default,
                {
                    data() {
                        return {
                            userId: that.user.id,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshData();
                        },
                    },
                },
                {
                    title: '新建账号',
                    width: '60%',
                    footer: null,
                    destroyOnClose: true,
                    wrapClassName: 'account-add-dialog-wrap',
                }
            );
        },
        /**
         * 处理选择账户的事件
         */
        handleChooseAccount() {
            // 用户id,
            const that = this;
            this.$showDialog(
                require('./ChooseAccount.vue').default,
                {
                    data() {
                        return {
                            userId: that.user.id,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshData();
                        },
                    },
                },
                {
                    title: '选择账号',
                    width: '40%',
                    destroyOnClose: true,
                    wrapClassName: 'account-add-dialog-wrap',
                }
            );
        },
        /**
         * 处理移除账户的事件
         */
        handleRemoveAccount(record) {
            racAccountApi
                .removeUserByAccount({
                    id: record.id,
                })
                .then(() => {
                    this.refreshData();
                });
        },
    },
};
</script>
<style lang="less" scoped>
.defaultRow {
    font-weight: bolder;
}
</style>
