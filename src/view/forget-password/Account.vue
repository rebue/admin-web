<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout" class="form">
        <!-- 手机号在解绑操作中回显 disable -->
        <a-form-model-item key="keywords" label="" prop="keywords">
            <a-input v-model.trim="model.keywords" placeholder="请输入账号/手机号/邮箱" />
        </a-form-model-item>
        <a-form-model-item key="code" label="" prop="code">
            <!-- 验证码隐藏域 -->
            <a-input class="code-input" v-model.trim="model.code" placeholder="" hidden />
            <!-- 点击验证弹出行为验证码 -->
            <a-popover v-model="verifyVisible" placement="top" title="" trigger="click" v-if="!isValidCode">
                <div slot="content">
                    <Verify
                        ref="verify"
                        mode="fixed"
                        :captcha-type="'blockPuzzle'"
                        :img-size="{ width: '400px', height: '200px' }"
                        @success="handleVerifySuccess"
                        @error="handleVerifyError"
                        v-if="verifyVisible"
                    />
                </div>
                <a-button block>点击进行验证</a-button>
            </a-popover>
            <a-button class="valid-code-success" block v-else><a-icon type="check-circle" /> 验证成功</a-button>
        </a-form-model-item>
        <a-form-model-item>
            <a-button type="primary" block :disabled="!isValidForm" @click="ok">下一步</a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { racAccountApi } from '@/api/Api';
import Verify from '@/component/rebue/verifition/Verify.vue';
export default {
    name: 'forget-password-account',
    components: {
        Verify,
    },
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
                keywords: '',
                code: '',
            },
            rules: {
                keywords: [{ required: true, message: '请输入', trigger: 'blur', transform: val => val && val.trim() }],
                code: [
                    { required: true, message: '请点击进行验证', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            verifyVisible: false,
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
        handleVerifySuccess(res) {
            this.model.code = res.captchaVerification;
            this.isValidCode = true;
        },
        handleVerifyError() {
            this.model.code = '';
        },
        getCode() {
            this.isValidCode = true;
        },
        ok() {
            if (!this.isValidForm) {
                return;
            }
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求校验账号是否存在
                    // racAccountApi
                    //         .bindPhone({
                    //             keywords: this.model.keywords,
                    //             code: this.model.code,
                    //         })
                    //         .then(ro => {
                    //             //
                    //         });
                    // 校验成功 得到账号ID
                    this.$emit('success', 1111);
                    // 校验失败
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
<style scoped>
.form {
    width: 100%;
}
.valid-code-success {
    color: #40a9ff;
}
</style>
