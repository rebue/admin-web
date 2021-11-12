<template>
    <div class="content">
        <change-pswd-form :record="changePswdId" :visible.sync="changePswdFormVisible" />
        <!-- 修改密码 -->
        <a-list-item class="list-item">
            <a-list-item-meta>
                <div class="avatar" slot="avatar">
                    <a-icon type="lock" />
                </div>
                <span slot="title">修改密码</span>
                <span slot="description">密码安全系数： 高</span>
            </a-list-item-meta>
            <div class="ctrl-wrap">
                <a-button key="modify" type="primary" @click="changePswd">修改密码</a-button>
            </div>
        </a-list-item>
        <!-- 手机号 -->
        <a-list-item class="list-item">
            <a-list-item-meta>
                <div class="avatar" slot="avatar">
                    <a-icon type="mobile" />
                </div>
                <span slot="title">手机号绑定</span>
                <span slot="description" v-if="accountStore.signInMobile">已设置：{{ accountStore.signInMobile }}</span>
                <span slot="description" v-else>未绑定</span>
            </a-list-item-meta>
            <div class="ctrl-wrap">
                <template v-if="accountStore.signInMobile">
                    <a-button key="delete" @click="unbindPhone">解除绑定</a-button>
                </template>
                <a-button key="add" type="primary" @click="bindPhone" v-else>绑定</a-button>
            </div>
        </a-list-item>

        <!-- 微信 -->
        <a-list-item class="list-item">
            <a-list-item-meta>
                <div class="avatar" slot="avatar" style="background-color: #00db6c;">
                    <a-icon type="wechat" />
                </div>
                <span slot="title">微信绑定</span>
                <span slot="description" v-if="accountStore.wxUnionId">已绑定</span>
                <div slot="description" v-else>
                    <span>未绑定</span>
                    <p>绑定微信号码，随时查看账号安全信息</p>
                </div>
            </a-list-item-meta>
            <div class="ctrl-wrap">
                <a-button key="delete" v-if="accountStore.wxUnionId" @click="unbindWechat">解除绑定</a-button>
                <a-button key="add" type="primary" v-else @click="bindWechat">绑定</a-button>
            </div>
        </a-list-item>
        <!-- 钉钉 -->
        <a-list-item class="list-item">
            <a-list-item-meta>
                <div class="avatar" slot="avatar">
                    <a-icon type="dingding" />
                </div>
                <span slot="title">钉钉绑定</span>
                <span slot="description" v-if="accountStore.ddUnionId">已绑定</span>
                <div slot="description" v-else>
                    <span>未绑定</span>
                </div>
            </a-list-item-meta>
            <div class="ctrl-wrap">
                <a-button key="delete" v-if="accountStore.ddUnionId" @click="unbindDing">解除绑定</a-button>
                <a-button key="add" type="primary" v-else @click="bindDing">绑定</a-button>
            </div>
        </a-list-item>

        <!-- 修改 -->
        <a-list-item class="list-item">
            <a-list-item-meta>
                <div class="avatar" slot="avatar">
                    <a-icon type="mail" />
                </div>
                <span slot="title">修改邮箱</span>
                <span slot="description" v-if="isVerifiedEmail">密码安全系数： 高</span>
                <span slot="description" v-else>未设置</span>
            </a-list-item-meta>
            <div class="ctrl-wrap">
                <a-button key="modify" v-if="isVerifiedEmail" @click="changeEmail(EditFormTypeDic.Modify)"
                    >修改邮箱</a-button
                >
                <a-button key="add" type="primary" v-else @click="changeEmail(EditFormTypeDic.Add)">设置邮箱</a-button>
            </div>
        </a-list-item>
    </div>
</template>

<script>
import { observer } from 'mobx-vue';
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import ChangePswdForm from './ChangePswdForm.vue';

export default observer({
    name: 'app-security-center-main',
    data() {
        return {
            accountStore,
            EditFormTypeDic,
            isVerifiedEmail: false,
            changePswdFormVisible: false,
            changePswdId: '',
        };
    },
    components: {
        ChangePswdForm,
    },
    methods: {
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
        // 手机号
        bindPhone() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            accountId: that.accountStore.accountId,
                            editFormType: EditFormTypeDic.Add,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '绑定手机号',
                    width: '500px',
                }
            );
        },
        unbindPhone() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            accountId: that.accountStore.accountId,
                            editFormType: EditFormTypeDic.Delete,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '解除绑定手机号',
                    width: '500px',
                }
            );
        },
        //微信
        bindWechat() {
            const that = this;
            this.$showDialog(
                require('./Wechat.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-bind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '微信绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindWechat() {
            const that = this;
            this.$showDialog(
                require('./Wechat.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-unbind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '微信解除绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },

        //钉钉绑定
        bindDing() {
            const that = this;
            this.$showDialog(
                require('./Dingding.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-bind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '钉钉绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindDing() {
            const that = this;
            this.$showDialog(
                require('./Dingding.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-unbind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '钉钉解除绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },

        //修改密码
        changePswd() {
            this.changePswdId = this.accountStore.accountId;
            this.changePswdFormVisible = true;
        },

        //修改邮箱
        changeEmail() {
            const that = this;
            this.$showDialog(
                require('./Email.vue').default,
                {
                    data() {
                        return {};
                    },
                    methods: {
                        callback() {
                            // reload
                            that.isVerifiedEmail = true;
                        },
                    },
                },
                { title: '修改邮箱' }
            );
        },
    },
});
</script>
<style scoped>
.content {
    min-height: 100px;
    padding: 0 60px;
    margin-bottom: 50px;
}
.avatar {
    width: 54px;
    height: 54px;
    font-size: 30px;
    background-color: #2c81f6;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.list-item {
    border-bottom: 1px solid #e7e7e7;
    padding: 30px 0;
}
.ctrl-wrap >>> button {
    margin-right: 10px;
}
</style>
