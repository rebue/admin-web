<template>
    <a-form-model ref="pswForm" class="form" :model="pswForm" :rules="pswRules">
        <a-form-model-item prop="accountName" class="sign">
            <a-input
                size="large"
                v-autofocus
                v-model.trim="pswForm.accountName"
                placeholder="请输入账号/手机号"
                class="input"
            >
                <template #prefix><a-icon type="user"/></template>
            </a-input>
        </a-form-model-item>
        <a-form-model-item prop="signInPswd">
            <a-input-password size="large" v-model="pswForm.signInPswd" placeholder="请输入密码" class="input">
                <template #prefix><a-icon type="lock"/></template>
            </a-input-password>
        </a-form-model-item>
        <a-button size="large" :loading="loading" type="primary" block @click="doSubmitByPassword" class="sign-btn"
            >登录</a-button
        >
        <!-- <a-checkbox class="remenber">记住登录状态</a-checkbox> -->
    </a-form-model>
</template>
<script>
import request from '@/util/request';
import md5 from 'crypto-js/md5';

export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            // 帐密
            pswForm: {
                accountName: '',
                signInPswd: '',
                captchaVerification: '',
            },
            pswRules: {
                accountName: [
                    { required: true, message: '请输入登录账号', trigger: 'blur', transform: val => val.trim() },
                ],
                signInPswd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
        };
    },
    methods: {
        // 帐密的行为验证码滑动验证成功
        handleVerifySuccess(res) {
            this.pswForm.captchaVerification = res.captchaVerification;
            this.doSubmitByPassword();
        },
        // 帐密的行为验证码滑动验证失败
        handleVerifyError() {
            this.pswForm.captchaVerification = '';
        },
        // 帐密登录
        doSubmitByPassword() {
            this.loading = true;
            this.$refs.pswForm.validate(valid => {
                if (valid) {
                    //第一次密码输入错误后需要进行验证码校验
                    //表单校验成功后，验证码逻辑
                    if (sessionStorage.getItem('isNeedVerifyCode') && !this.pswForm.captchaVerification) {
                        const that = this;
                        const { handleVerifySuccess, handleVerifyError } = this;
                        this.$showDialog(
                            require('@/view/sign-in/comm/Verify.vue').default,
                            {
                                methods: {
                                    handleVerifySuccess: handleVerifySuccess.bind(that),
                                    handleVerifyError: handleVerifyError.bind(that),
                                },
                            },
                            {
                                title: '请完成安全验证',
                                footer: null,
                                // closable: false,
                                width: 450,
                                wrapClassName: 'verify-modal-wrap',
                            }
                        );
                        this.loading = false;
                        return;
                    }
                    const data = {
                        loginType: 0,
                        loginName: this.pswForm.accountName,
                        password: md5(this.pswForm.signInPswd).toString(),
                    };
                    if (this.pswForm.captchaVerification) {
                        data.captchaVerification = this.pswForm.captchaVerification;
                    }
                    request
                        .post({
                            url: '/oap-svr/oap/login',
                            data: data,
                        })
                        .then(r => {
                            if (r.result === 1) {
                                sessionStorage.removeItem('isNeedVerifyCode');
                                // 登录成功 重定向去后端接口redireact_uri?code&state&callbackUri
                                console.log('----登录成功 repalce', r);
                                window.location.replace(r.extra);
                            }
                        })
                        .catch(() => {
                            //登录失败，清除验证码
                            this.pswForm.captchaVerification = '';
                            sessionStorage.setItem('isNeedVerifyCode', true);
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
    },
};
</script>
