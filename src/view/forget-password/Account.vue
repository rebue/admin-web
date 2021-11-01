<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout" class="form">
        <!-- 手机号在解绑操作中回显 disable -->
        <a-form-model-item key="signInName" label="" prop="signInName">
            <a-input size="large" v-model.trim="model.signInName" placeholder="请输入账号/手机号/邮箱" />
        </a-form-model-item>
        <a-form-model-item key="captchaVerification" label="" prop="captchaVerification">
            <!-- 验证码隐藏域 -->
            <a-input size="large" class="code-input" v-model.trim="model.captchaVerification" placeholder="" hidden />
            <!-- 点击验证弹出行为验证码 -->
            <a-button size="large" block @click="showVerify" v-if="!isValidCode">点击进行验证</a-button>
            <a-button size="large" class="valid-code-success" block v-else
                ><a-icon type="check-circle" /> 验证成功</a-button
            >
        </a-form-model-item>
        <a-form-model-item>
            <a-button size="large" type="primary" block :disabled="!isValidForm" @click="ok">下一步</a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { racAccountApi } from '@/api/Api';
export default {
    name: 'forget-password-account',
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                // sm: { push: 12 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12, offset: 6 },
            },
        };
        return {
            //form表单
            model: {
                signInName: '',
                captchaVerification: '',
            },
            rules: {
                signInName: [
                    {
                        required: true,
                        message: '请输入账号/手机号/邮箱',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                captchaVerification: [
                    { required: true, message: '请点击进行验证', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            isValidCode: false,
        };
    },
    computed: {
        isValidForm() {
            return Object.values(this.model).every(v => {
                return v && v.trim();
            });
        },
    },
    mounted() {
        //
    },
    methods: {
        showVerify() {
            // 首先验证手机号是否输入
            let valid = true;
            this.$refs.form.validateField('signInName', (errors, values) => {
                valid = !errors;
            });

            if (!valid) {
                return;
            }
            const that = this;
            this.$showDialog(
                require('@/view/sign-in/comm/Verify.vue').default,
                {
                    methods: {
                        handleVerifySuccess: that.handleVerifySuccess.bind(that),
                        handleVerifyError: that.handleVerifyError.bind(that),
                    },
                },
                {
                    title: '请完成安全验证',
                    footer: null,
                    width: 450,
                    wrapClassName: 'verify-modal-wrap',
                }
            );
        },
        handleVerifySuccess(res) {
            this.model.captchaVerification = res.captchaVerification;
            this.isValidCode = true;
        },
        handleVerifyError() {
            this.isValidCode = false;
            this.model.captchaVerification = '';
        },
        ok() {
            if (!this.isValidForm) {
                return;
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求校验账号是否存在
                    racAccountApi
                        .checkAccountByForget({
                            signInName: this.model.signInName,
                            captchaVerification: this.model.captchaVerification,
                        })
                        .then(ro => {
                            // 校验成功 得到账号ID
                            this.$emit('success', ro.extra);
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
    watch: {
        'model.signInName': {
            immediate: true,
            handler(val) {
                this.handleVerifyError();
            },
        },
    },
};
</script>
<style scoped>
.form {
    width: 100%;
}
.valid-code-success {
    color: #40a9ff;
}
</style>
