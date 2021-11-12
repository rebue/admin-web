<template>
    <a-form-model ref="form" :model="model">
        <!-- form横向布局 v-bind="formLayout" -->
        <input-password key="signInPswd" :value.sync="model.signInPswd" label="新密码" size="large" prop="signInPswd" />
        <input-password-again
            key="signInPswdAgain"
            :value.sync="model.signInPswdAgain"
            :target="model.signInPswd"
            label="确认新密码"
            size="large"
            prop="signInPswdAgain"
        />
        <a-form-model-item label="">
            <!--横向布局 :wrapper-col="{ span: 13, offset: 7 }" -->
            <a-button type="primary" block size="large" @click="ok">提交</a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import { racAccountApi } from '@/api/Api';
import md5 from 'crypto-js/md5';
import InputPassword from './widgets/InputPassword.vue';
import InputPasswordAgain from './widgets/InputPasswordAgain.vue';

export default {
    name: 'forget-password-change',
    components: { InputPassword, InputPasswordAgain },
    props: ['params'],
    data() {
        return {
            loading: false,
            model: {
                signInPswd: '',
                signInPswdAgain: '',
            },
        };
    },
    methods: {
        ok() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    racAccountApi
                        .modifySignInPswdByForget({
                            signInPswd: md5(this.model.signInPswd).toString(),
                            ...this.params.model,
                        })
                        .then(() => {
                            this.$emit('success');
                        })
                        .finally(() => (this.loading = false));
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
