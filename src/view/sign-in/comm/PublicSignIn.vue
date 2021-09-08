<template>
    <!-- 只需要通过 rules 属性传入约定的验证规则，
                并将 FormItem 的 prop 属性设置为需校验的字段名即可。
                校验规则参见 https://github.com/yiminghe/async-validator -->
    <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="账号密码登录">
            <div v-if="show" class="sign">
                <a-form-model ref="form" class="form" :model="form" :rules="rules">
                    <a-form-model-item prop="accountName" class="sign">
                        <a-input v-autofocus v-model.trim="form.accountName" placeholder="请输入登录账号">
                            <template #prefix><a-icon type="account"/></template>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="signInPswd">
                        <a-input-password v-model="form.signInPswd" placeholder="请输入登录密码">
                            <template #prefix><a-icon type="key"/></template>
                        </a-input-password>
                    </a-form-model-item>
                    <Verify
                        ref="verify"
                        mode="pop"
                        :captcha-type="'blockPuzzle'"
                        :img-size="{ width: '400px', height: '200px' }"
                        @success="handleVerifySuccess"
                        @error="handleVerifyError"
                    />
                    <a-button :loading="loading" type="primary" block @click="doSubmit" class="sign">登录</a-button>
                </a-form-model>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="微信扫码登录">
            <div id="wx-login-box" style="width: 350px"></div>
        </a-tab-pane>
    </a-tabs>
</template>

<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
import md5 from 'crypto-js/md5';
import { setAppId } from '@/util/cookie';
import { racSignInApi, racVerifitionApi } from '@/api/Api';
import Verify from '@/component/rebue/verifition/Verify.vue';

export default {
    components: {
        Verify,
    },
    props: {
        appId: {
            type: String,
            default: () => '',
        },
    },
    data() {
        this.api = racSignInApi;
        return {
            /** 登录后要中转的地址 */
            redirect: undefined,
            /** 定义当前登录页面所对应的应用 */
            //appId: AppIdDic.OpsAdminWeb,
            loading: false,
            show: true,
            form: {
                accountName: '',
                signInPswd: '',
            },
            rules: {
                accountName: [
                    { required: true, message: '请输入登录账号', trigger: 'blur', transform: val => val.trim() },
                ],
                signInPswd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
            captcha: '', //验证码
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
        //FIXME 引入js慢一步，第一次切换微信选项时报错，待解决
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
        document.body.appendChild(s);
        this.$nextTick(() => {
            setTimeout(() => {
                this.get_wx_qrcode();
            }, 100);
        });
    },
    methods: {
        changeShow() {
            this.show = !this.show;
            this.switchLogin();
        },
        callback(key) {
            this.show = !this.show;
            console.log(key);
            if (key == 2) {
                this.switchLogin();
            }
        },
        get_wx_qrcode() {
            // let call_back_realm_name = window.location.href,
            //     realm_name_length = call_back_realm_name.indexOf('#') - 1,
            //     DDNS = call_back_realm_name.substring(0, realm_name_length),
            //     DDNS_resolution = encodeURIComponent(DDNS);
            /* const obj = new WxLogin({
                self_redirect: false,
                id: 'wx-login-box',
                appid: 'wx25d6c6c863c8629a',
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent(
                    'https://khadmin.cocmis.cn/host/pcLogin?type=wxredirect&host_url=' + window.BASE_URL
                ),
                state: Math.ceil(Math.random() * 1000),
                style: 'black',
                href:
                    'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZXsNCgl3aWR0aDogMTAwJTsNCgltYXJnaW46IDA7DQoJYm9yZGVyOiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnRpdGxlew0KCWRpc3BsYXk6IG5vbmU7DQp9DQouaW1wb3dlckJveCAuaW5mb3sNCgl3aWR0aDogMTAwJTsNCn0=',
            }); */
        },
        switchLogin() {
            this.get_wx_qrcode();
        },
        doSubmit() {
            console.log('doSubmit!');
            this.loading = true;

            this.$refs.form.validate(valid => {
                if (valid) {
                    //表单校验成功后，验证码逻辑
                    if (!this.captcha) {
                        this.$refs.verify.show();
                        this.loading = false;
                        return;
                    }
                    this.api
                        .signInByAccountName({
                            appId: this.appId,
                            accountName: this.form.accountName,
                            signInPswd: md5(this.form.signInPswd).toString(),
                            verification: this.captcha,
                        })
                        .then(() => {
                            setAppId(this.appId);
                            window.location.href = this.redirect ? '#' + this.redirect : '#/base/rac-realm';
                        })
                        .catch(() => {
                            //登录失败，清除验证码
                            this.captcha = null;
                            // this.$refs.verify.refresh();
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        handleVerifySuccess(res) {
            this.captcha = res.captchaVerification;
            this.doSubmit();
            // const verif = {
            //     captchaVerification: res.captchaVerification,
            // };
            // racVerifitionApi.reqVerify(verif).then((ro) => {

            // });
        },
        handleVerifyError() {
            this.captcha = '';
        },
    },
};
</script>
<style scoped>
.form {
    width: 280px;
    height: 450px;
}
.sign {
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
