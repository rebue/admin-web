<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc w140">
            <div class="w100 pt20 pb20 bg-w card card-shadow security-center-card">
                <div class="title">
                    <img :src="require('../assets/img/safety.png')" width="20" height="24" />
                    <span class="font-20">安全中心</span>
                </div>
                <div class="content">
                    <!-- 修改密码 -->
                    <a-list-item class="list-item">
                        <a-list-item-meta>
                            <div class="avatar" slot="avatar">
                                <a-icon type="lock" />
                            </div>
                            <span slot="title">修改密码</span>
                            <span slot="description" v-if="isVerifiedPswd">密码安全系数： 高</span>
                            <span slot="description" v-else>未设置</span>
                        </a-list-item-meta>
                        <div class="ctrl-wrap">
                            <a-button key="modify" v-if="isVerifiedPswd" @click="changePswd(EditFormTypeDic.Modify)"
                                >修改密码</a-button
                            >
                            <a-button key="add" type="primary" v-else @click="changePswd(EditFormTypeDic.Add)"
                                >设置密码</a-button
                            >
                        </div>
                    </a-list-item>
                    <!-- 手机号 -->
                    <a-list-item class="list-item">
                        <a-list-item-meta>
                            <div class="avatar" slot="avatar">
                                <a-icon type="mobile" />
                            </div>
                            <span slot="title">手机号绑定</span>
                            <span slot="description" v-if="isVerifiedMobile">已设置：1599462300</span>
                            <span slot="description" v-else>未绑定</span>
                        </a-list-item-meta>
                        <div class="ctrl-wrap">
                            <template v-if="isVerifiedMobile">
                                <a-button key="modify" @click="modifyPhone">更换绑定</a-button>
                                <a-button key="delete" @click="unbindPhone">解除绑定</a-button>
                            </template>
                            <a-button key="add" type="primary" v-else @click="bindPhone">绑定</a-button>
                        </div>
                    </a-list-item>

                    <!-- 微信 -->
                    <a-list-item class="list-item">
                        <a-list-item-meta>
                            <div class="avatar" slot="avatar" style="background-color: #00db6c;">
                                <a-icon type="wechat" />
                            </div>
                            <span slot="title">微信绑定</span>
                            <span slot="description" v-if="isVerifiedWechat">已设置：1599462300</span>
                            <div slot="description" v-else>
                                <span>未绑定</span>
                                <p>绑定微信号码，随时查看账号安全信息</p>
                            </div>
                        </a-list-item-meta>
                        <div class="ctrl-wrap">
                            <!-- <a-popconfirm
                                title="确定解除微信绑定吗?"
                                @confirm="() => unbindWechat()"
                                ok-text="确定"
                                cancel-text="取消"
                                v-if="isVerifiedWechat"
                            >
                                <a-button>解除绑定</a-button>
                            </a-popconfirm> -->
                            <a-button key="delete" v-if="isVerifiedWechat" @click="unbindWechat">解除绑定</a-button>
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
                            <span slot="description" v-if="isVerifiedDing">已设置：1599462300</span>
                            <div slot="description" v-else>
                                <span>未绑定</span>
                            </div>
                        </a-list-item-meta>
                        <div class="ctrl-wrap">
                            <!-- <a-popconfirm
                                title="确定解除钉钉绑定吗?"
                                @confirm="() => unbindDing()"
                                ok-text="确定"
                                cancel-text="取消"
                                v-if="isVerifiedDing"
                            >
                                <a-button key="delete">解除绑定</a-button>
                            </a-popconfirm> -->
                            <a-button key="delete" v-if="isVerifiedDing" @click="unbindDing">解除绑定</a-button>
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
                            <a-button key="add" type="primary" v-else @click="changeEmail(EditFormTypeDic.Add)"
                                >设置邮箱</a-button
                            >
                        </div>
                    </a-list-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { racAccountApi } from '@/api/Api';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import Aside from './Aside.vue';

export default {
    name: 'app-security-center-index',
    components: {
        Aside,
    },
    data() {
        return {
            accountStore,
            account: {},
            EditFormTypeDic,
            //手机号
            isVerifiedMobile: false,
            isVerifiedWechat: false,
            isVerifiedDing: false,
            isVerifiedPswd: false,
            isVerifiedEmail: false,
        };
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
                            editFormType: EditFormTypeDic.Add,
                        };
                    },
                    methods: {
                        async callback(params) {
                            //发起绑定请求
                            await racAccountApi.getById(that.accountStore.accountId);
                            that.isVerifiedMobile = true;
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
            //
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            editFormType: EditFormTypeDic.Delete,
                        };
                    },
                    methods: {
                        async callback(params) {
                            //发起解除绑定请求
                            await racAccountApi.getById(that.accountStore.accountId);
                            that.isVerifiedMobile = false;
                        },
                    },
                },
                {
                    title: '解除绑定手机号',
                    width: '500px',
                }
            );
        },
        modifyPhone() {
            //
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            editFormType: EditFormTypeDic.Modify,
                        };
                    },
                    methods: {
                        async callback(params) {
                            //发起解除绑定请求
                            await racAccountApi.getById(that.accountStore.accountId);
                            that.isVerifiedMobile = true;
                        },
                    },
                },
                {
                    title: '更新绑定手机号',
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
                    methods: {
                        callback() {
                            console.log('----callback');
                            that.isVerifiedWechat = true;
                        },
                    },
                },
                {
                    title: '绑定微信',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindWechat() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            editFormType: EditFormTypeDic.None,
                        };
                    },
                    methods: {
                        async callback(params) {
                            //发起解除绑定请求
                            await racAccountApi.getById(that.accountStore.accountId);
                            that.isVerifiedWechat = false;
                        },
                    },
                },
                {
                    title: '手机号验证解除绑定微信',
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
                    methods: {
                        callback() {
                            console.log('----callback');
                            that.isVerifiedDing = true;
                        },
                    },
                },
                {
                    title: '绑定钉钉',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindDing() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            editFormType: EditFormTypeDic.None,
                        };
                    },
                    methods: {
                        async callback(params) {
                            //发起解除绑定请求
                            await racAccountApi.getById(that.accountStore.accountId);
                            that.isVerifiedDing = false;
                        },
                    },
                },
                {
                    title: '手机号验证解除绑定钉钉',
                    width: '500px',
                }
            );
        },

        //修改密码
        changePswd() {
            const that = this;
            this.$showDialog(
                require('./ChangePswdForm.vue').default,
                {
                    data() {
                        return {
                            record: {
                                id: that.account.id,
                            },
                        };
                    },
                    methods: {
                        callback() {
                            // reload
                            that.isVerifiedPswd = true;
                        },
                    },
                },
                { title: '修改密码' }
            );
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
    watch: {
        accountStore: {
            handler(val, old) {
                // 用observer包裹，为啥只执行一次。
                // accountStore是异步获取的，放在mounted会有执行顺序问题，所以放在watch
                if (val && val.accountId) {
                    racAccountApi.getById(val.accountId).then(ro => {
                        this.account = ro.extra.one;
                    });
                }
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>
<style scoped>
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

<style scoped lang="less">
.card {
    padding-left: 24px;
    padding-right: 12px;
    border-top: 4px solid #3a69c9;
    box-shadow: 0px 8px 10px 0px #a3bce2;
    border-radius: 0px 0px 10px 10px;
    .title {
        border-bottom: 1px solid #e4e5ea;
        padding-bottom: 14px;
        margin-bottom: 20px;
        > img {
            margin-right: 10px;
            vertical-align: middle;
        }
        > span {
            vertical-align: middle;
        }
    }
    .link-item {
        margin-bottom: 57px;
    }
    .item-logo {
        border-radius: 50%;
    }
    .content {
        min-height: 100px;
        padding: 0 60px;
        margin-bottom: 50px;
    }
}
</style>
