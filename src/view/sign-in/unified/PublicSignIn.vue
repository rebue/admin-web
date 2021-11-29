<template>
    <a-tabs default-active-key="1" @change="callback" class="tabs">
        <a-tab-pane key="1" tab="账号密码登录">
            <div v-if="show" class="sign psw-sign">
                <psw-form :action="onPswdSubmit" :captchaSessionName="captchaSessionName" />
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机短信登录">
            <div v-if="!show" class="sign phone-sign">
                <phone-form :action="onPhoneSubmit" />
            </div>
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import request from '@/util/request';
import PswForm from './Password.vue';
import PhoneForm from './Phone.vue';
import { AppIdDic } from '@/dic/AppIdDic';
export default {
    components: {
        PswForm,
        PhoneForm,
    },
    props: {},
    data() {
        return {
            show: true,
            tabKey: 1,
            captchaSessionName: `is-${AppIdDic.UnifiedAuth}-need-captcha`,
        };
    },
    methods: {
        //TAB切换事件
        callback(key) {
            this.show = !this.show;
            this.tabKey = key; //key值
        },
        //帐密登录
        onPswdSubmit(formData) {
            const data = {
                loginType: 0,
                loginName: formData.accountName,
                password: formData.signInPswd,
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
                        sessionStorage.removeItem(this.captchaSessionName);
                        // 登录成功 重定向去后端接口redireact_uri?code&state&callbackUri
                        console.log('----登录成功 repalce', r);
                        window.location.replace(r.extra);
                    }
                });
        },
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
                        // 登录成功 重定向去后端接口redireact_uri?code&state&callbackUri
                        console.log('----登录成功 repalce', r);
                        window.location.replace(r.extra);
                    }
                });
        },
    },
};
</script>
<style scoped>
.tabs >>> .ant-tabs-bar {
    margin-bottom: 32px;
}
.tabs >>> .ant-tabs-nav {
    width: 100%;
}
.tabs >>> .ant-tabs-nav > div {
    width: 100%;
    display: flex;
}
.tabs >>> .ant-tabs-nav .ant-tabs-tab {
    flex: 1;
    text-align: center;
    font-size: 20px;
}
/* 帐密登录样式 */
.psw-sign >>> .input .ant-input {
    height: 56px;
}
.psw-sign >>> .input .ant-input:not(:first-child) {
    padding-left: 40px;
}
.psw-sign >>> .sign-btn,
.phone-sign >>> .sign-btn {
    height: 56px;
    line-height: 56px;
    font-size: 20px;
}

.remenber {
    margin: 20px 0;
    float: right;
}
/* 手机登录样式 */
.phone-sign >>> .ant-input-lg {
    height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection__rendered {
    line-height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection--single {
    height: 56px;
}
.comFromStyle {
    position: relative;
}
.code-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #7aa8f2;
    cursor: pointer;
}
</style>
