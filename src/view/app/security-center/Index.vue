<template>
    <a-card class="security-center-card">
        <div class="title">
            <img :src="require('../assets/img/safety.png')" width="20" height="24" />
            <span class="font-14">安全中心</span>
        </div>
        <div>
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
                <div>
                    <a-button key="modify" v-if="isVerifiedMobile" @click="bind('modify')">更换绑定</a-button>
                    <a-button key="add" type="primary" v-else @click="bind('add')">绑定</a-button>
                </div>
            </a-list-item>

            <!-- 微信 -->
            <a-list-item class="list-item">
                <a-list-item-meta>
                    <div class="avatar" slot="avatar">
                        <a-icon type="wechat" />
                    </div>
                    <span slot="title">微信绑定</span>
                    <span slot="description" v-if="isVerifiedWechat">已设置：1599462300</span>
                    <div slot="description" v-else>
                        <span>未绑定</span>
                        <p>绑定微信号码，随时查看账号安全信息</p>
                    </div>
                </a-list-item-meta>
                <div>
                    <a-popconfirm
                        title="确定解除微信绑定吗?"
                        @confirm="() => unbindWechat()"
                        ok-text="确定"
                        cancel-text="取消"
                        v-if="isVerifiedWechat"
                    >
                        <a-button>解除绑定</a-button>
                    </a-popconfirm>
                    <a-button type="primary" v-else @click="bindWechat">绑定</a-button>
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
                <div>
                    <a-popconfirm
                        title="确定解除钉钉绑定吗?"
                        @confirm="() => unbindDing()"
                        ok-text="确定"
                        cancel-text="取消"
                        v-if="isVerifiedDing"
                    >
                        <a-button>解除绑定</a-button>
                    </a-popconfirm>
                    <a-button type="primary" v-else @click="bindDing">绑定</a-button>
                </div>
            </a-list-item>

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
                <div>
                    <a-button key="modify" v-if="isVerifiedPswd" @click="changePswd('modify')">修改密码</a-button>
                    <a-button key="add" type="primary" v-else @click="changePswd('add')">设置密码</a-button>
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
                <div>
                    <a-button key="modify" v-if="isVerifiedEmail" @click="changeEmail('modify')">修改邮箱</a-button>
                    <a-button key="add" type="primary" v-else @click="changeEmail('add')">设置邮箱</a-button>
                </div>
            </a-list-item>
        </div>
    </a-card>
</template>

<script>
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { racAccountApi } from '@/api/Api';

export default {
    name: 'app-security-center-index',
    components: {},
    data() {
        return {
            accountStore,
            account: {},

            //手机号
            isVerifiedMobile: false,
            isVerifiedWechat: false,
            isVerifiedDing: false,
            isVerifiedPswd: true,
            isVerifiedEmail: true,
        };
    },
    methods: {
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },

        // 手机号
        bind(type) {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            editFormType: type,
                        };
                    },
                    methods: {
                        callback() {
                            console.log('----callback');
                            that.isVerifiedMobile = true;
                        },
                    },
                },
                {
                    title: '手机号绑定',
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
            //then
            this.isVerifiedWechat = false;
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
            //then
            this.isVerifiedDing = false;
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
</style>
