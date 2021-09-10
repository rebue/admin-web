<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <a-form-model-item key="oldSignInPswd" label="旧密码" prop="oldSignInPswd">
            <a-input-password
                v-autofocus
                v-model.trim="model.oldSignInPswd"
                placeholder="请输入旧密码"
                autocomplete="new-password"
            />
        </a-form-model-item>
        <a-form-model-item key="signInPswd" label="新密码" prop="signInPswd">
            <a-input-password
                v-autofocus
                v-model.trim="model.signInPswd"
                placeholder="请输入新密码"
                autocomplete="new-password"
            />
        </a-form-model-item>
        <a-form-model-item key="signInPswdAgain" label="确认新密码" prop="signInPswdAgain">
            <a-input-password
                v-model.trim="model.signInPswdAgain"
                placeholder="请再次输入新密码(确认)"
                autocomplete="new-password"
            />
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import { racAccountApi } from '@/api/Api';

export default {
    name: 'app-security-center-pwsd',
    data() {
        this.rules = {
            oldSignInPswd: [
                { required: true, message: '请输入旧密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswd: [
                { required: true, message: '请输入新密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    trigger: ['change', 'blur'],
                    validator: (rule, value, callback) => {
                        if (value === undefined) value = '';
                        value = value.trim();

                        if (value === '') {
                            callback(new Error('请再次输入新密码(确认)'));
                            return;
                        }

                        if (value !== this.model.signInPswd) {
                            callback(new Error('两次输入的密码不相同'));
                            return;
                        }

                        callback();
                    },
                },
            ],
        };
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            loading: false,
            model: {
                oldSignInPswd: '',
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
                        .modifySignInPswd(this.record.id, this.model.signInPswd)
                        .then(() => {
                            this.callback && this.callback();
                            this.closeDialog();
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
