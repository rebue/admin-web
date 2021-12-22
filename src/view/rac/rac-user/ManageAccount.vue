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
        <edit-form ref="editForm" @success="refreshData" />
        <!-- 修改密码 -->
        <change-pswd-form :record="curRecord" :visible.sync="changePswdFormVisible" @success="refreshData" />
        <!-- 组织 -->
        <manage-org ref="manageOrgForm" :account="curRecord" :visible.sync="manageOrgVisible" />
    </a-drawer>
</template>

<script>
import { racAccountApi, racRealmApi } from '@/api/Api';
import ChangePswdForm from '../rac-account/ChangePswdForm.vue';
import EditForm from '../rac-account/EditForm.vue';
import ManageOrg from '../rac-account/ManageOrg.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    components: {
        EditForm,
        ChangePswdForm,
        ManageOrg,
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
                        onClick: record => this.handleModifyAccount(record),
                    },
                    {
                        type: 'a',
                        title: '管理组织',
                        onClick: record => this.handleManageOrg(record),
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
            manageOrgVisible: false,
            changePswdFormVisible: false,
            curRecord: {},
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
        handleModifyAccount(record) {
            this.curRecord = record;
            this.$refs.editForm.show(EditFormTypeDic.Modify, { ...record });
        },
        /** 处理修改密码 */
        handleChangePswd(record) {
            this.curRecord = record;
            this.changePswdFormVisible = true;
        },
        /**
         * 处理管理组织事件
         */
        handleManageOrg(record) {
            this.curRecord = record;
            this.manageOrgVisible = true;
        },
        /**切换抽屉时动画结束后的回调 */
        afterVisibleChange(val) {
            console.log('visible', val);
        },
        //关闭抽屉
        onClose() {
            this.$emit('update:visible', false);
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
