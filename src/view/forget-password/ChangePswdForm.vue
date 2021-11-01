<template>
    <a-form-model ref="form" :model="model" :rules="rules">
        <!-- form横向布局 v-bind="formLayout" -->
        <!-- <a-form-model-item key="signInPswd" label="旧密码" prop="signInPswd">
            <a-input-password
                v-autofocus
                v-model.trim="model.signInPswd"
                placeholder="请输入旧密码"
                autocomplete="new-password"
            />
        </a-form-model-item> -->
        <a-form-model-item key="signInPswd" label="新密码" prop="signInPswd">
            <a-input-password
                size="large"
                v-model.trim="model.signInPswd"
                placeholder="请输入新密码"
                autocomplete="new-password"
            />
        </a-form-model-item>
        <a-form-model-item key="signInPswdAgain" label="确认新密码" prop="signInPswdAgain">
            <a-input-password
                size="large"
                v-model.trim="model.signInPswdAgain"
                placeholder="请再次输入新密码(确认)"
                autocomplete="new-password"
            />
        </a-form-model-item>
        <a-form-model-item>
            <!--横向布局 :wrapper-col="{ span: 13, offset: 7 }" -->
            <a-button type="primary" block size="large" @click="ok">提交</a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import { racAccountApi } from '@/api/Api';
import md5 from 'crypto-js/md5';

export default {
    name: 'forget-password-change',
    props: ['params'],
    data() {
        this.rules = {
            // signInPswd: [
            //     { required: true, message: '请输入旧密码', trigger: 'blur', transform: val => val && val.trim() },
            // ],
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
                // signInPswd: '',
                signInPswd: '',
                signInPswdAgain: '',
            },
        };
    },
    methods: {
        ok() {
            console.log('---从身份认证来', this.params);
            console.log('---修改密码提交', {
                signInPswd: md5(this.model.signInPswd).toString(),
                ...this.params.model,
            });
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
