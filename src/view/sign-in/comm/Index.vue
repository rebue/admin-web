<template>
    <fragment>
        <a-tabs v-model="activeKey" @change="onActiveKeyChange">
            <a-tab-pane :key="1" tab="账号密码登录"></a-tab-pane>
            <a-tab-pane :key="2" tab="手机登录"></a-tab-pane>
            <a-tab-pane :key="3" tab="微信扫码登录"></a-tab-pane>
            <a-tab-pane :key="4" tab="钉钉扫码登录"></a-tab-pane>
        </a-tabs>
        <div class="sign">
            <Password :action="onPswdSubmit" :captchaSessionName="captchaSessionName" v-if="activeKey == 1" />
            <Phone :action="onPhoneSubmit" v-if="activeKey == 2" />
            <Wechat v-if="activeKey == 3" />
            <Dingding v-if="activeKey == 4" />
        </div>
    </fragment>
</template>

<script>
import request from '@/util/request';
import { racSignInApi } from '@/api/Api';
import { getAppIdByUrl } from '@/util/common';
import Password from '@/view/sign-in/unified/Password.vue';
import Phone from '@/view/sign-in/unified/Phone.vue';
import Wechat from '@/view/sign-in/unified/ScanWechat.vue';
import Dingding from '@/view/sign-in/unified/ScanDingding.vue';

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
            captchaSessionName: `is-${getAppIdByUrl()}-need-captcha`,
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
    mounted() {
        //
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
                    this.$router.push(`/${getAppIdByUrl()}`);
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
                        this.$router.push(`/${getAppIdByUrl()}`);
                    }
                });
        },
        onActiveKeyChange(key) {
            //
        },
    },
};
</script>
<style scoped>
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
</style>
