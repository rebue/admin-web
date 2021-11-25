<template>
    <fragment>
        <a-tabs v-model="activeKey" @change="onActiveKeyChange">
            <a-tab-pane :key="1" tab="账号密码登录"></a-tab-pane>
            <a-tab-pane :key="2" tab="手机登录"></a-tab-pane>
            <a-tab-pane :key="3" tab="微信扫码登录"></a-tab-pane>
            <a-tab-pane :key="4" tab="钉钉扫码登录"></a-tab-pane>
        </a-tabs>
        <div class="sign">
            <Password
                :action="onPswdSubmit"
                :captchaSessionName="captchaSessionName"
                v-if="activeKey == 1"
                class="pswd-form"
            />
            <router-link :to="`/${appId}/forget-password`" class="forget-password" v-if="activeKey == 1"
                >忘记密码</router-link
            >
            <Phone :action="onPhoneSubmit" v-if="activeKey == 2" />
            <Wechat :clientId="clientId" v-if="activeKey == 3" />
            <Dingding v-if="activeKey == 4" />
        </div>
    </fragment>
</template>

<script>
import request from '@/util/request';
import { racSignInApi } from '@/api/Api';
import Password from '@/view/sign-in/unified/Password.vue';
import Phone from '@/view/sign-in/unified/Phone.vue';
import Wechat from '@/view/sign-in/unified/ScanWechat.vue';
import Dingding from '@/view/sign-in/unified/ScanDingding.vue';
import { AppDic } from '@/dic/AppDic';

export default {
    components: {
        Password,
        Phone,
        Wechat,
        Dingding,
    },
    props: {
        appId: {
            type: String,
            default: () => '',
        },
    },
    data() {
        return {
            activeKey: 1,
            captchaSessionName: `is-${this.appId}-need-captcha`,
            clientId: AppDic.getClientId(this.appId),
        };
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    //如果不延时，搜索框可能还未渲染完成，会找不到input报错
                    setTimeout(() => {
                        this.$focus(this.$refs.modal);
                    }, 100);
                });
            } else {
                this.$emit('close');
            }
        },
    },
    methods: {
        //帐密登录
        onPswdSubmit(formData) {
            const data = {
                appId: this.appId,
                accountName: formData.accountName,
                signInPswd: formData.signInPswd,
            };
            if (formData.captchaVerification) {
                data.verification = formData.captchaVerification;
            }
            return racSignInApi.signInByAccountName(data).then(r => {
                if (r.result === 1) {
                    sessionStorage.removeItem(this.captchaSessionName);
                    // window.location.replace(r.extra.redirectUrl);
                    this.$router.push(`/${this.appId}`);
                }
            });
        },
        // 手机号登录
        //手机号登录
        onPhoneSubmit(formData) {
            const data = {
                loginType: 1,
                phoneNumber: formData.phoneNumber,
                code: formData.code,
            };
            if (formData.captchaVerification) {
                data.captchaVerification = formData.captchaVerification;
            }
            return request
                .post({
                    url: '/oap-svr/oap/login',
                    data: data,
                })
                .then(r => {
                    if (r.result === 1) {
                        this.$router.push(`/${this.appId}`);
                    }
                });
        },
        onActiveKeyChange(key) {
            //
        },
    },
};
</script>
<style lang="less" scoped>
.sign {
    /* width: 280px; */
    height: 450px;
    margin-top: 40px;
    margin-bottom: 20px;
}
.footer {
    height: 40px;
    padding: 10px;
    color: white;
    text-align: center;
}
.pswd-form {
    width: 400px;
}
.forget-password {
    display: inline-block;
    margin: 20px 0;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
        color: #3e78ed;
        text-decoration: underline;
    }
}
</style>
