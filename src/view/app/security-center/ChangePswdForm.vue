<template>
    <base-modal
        ref="baseModal"
        title="修改账户登录密码"
        :loading="loading"
        :isCancelClick="isCancelClick"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="signInPswd" label="旧密码" prop="signInPswd">
                <a-input-password
                    v-autofocus
                    v-model.trim="model.signInPswd"
                    placeholder="请输入旧密码"
                    autocomplete="new-password"
                />
            </a-form-model-item>
            <input-password
                key="newSignInPswd"
                :value.sync="model.newSignInPswd"
                label="登录密码"
                prop="newSignInPswd"
            />
            <input-password-again
                key="newSignInPswdAgain"
                :value.sync="model.newSignInPswdAgain"
                :target="model.newSignInPswd"
                label="登录密码(再次确认)"
                prop="newSignInPswdAgain"
            />
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import InputPassword from '@/view/forget-password/widgets/InputPassword.vue';
import InputPasswordAgain from '@/view/forget-password/widgets/InputPasswordAgain.vue';
import { racAccountApi } from '@/api/Api';
import md5 from 'crypto-js/md5';

export default {
    name: 'app-security-center-pwsd',
    components: {
        BaseModal,
        InputPassword,
        InputPasswordAgain,
    },
    props: {
        record: {
            type: String,
            required: true,
        },
        isCancelClick: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        this.rules = {
            signInPswd: [
                { required: true, message: '请输入旧密码', trigger: 'blur', transform: val => val && val.trim() },
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
            help: '',
            loading: false,
            model: {
                signInPswd: '',
                newSignInPswd: '',
                newSignInPswdAgain: '',
            },
        };
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.model = {};
                this.$refs.form.resetFields();
            });
        },
        handleOk() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    racAccountApi
                        .modifySignInPswdByOld({
                            id: this.record,
                            signInPswd: md5(this.model.signInPswd).toString(),
                            newSignInPswd: md5(this.model.newSignInPswd).toString(),
                        })
                        .then(ro => {
                            this.$emit('update:visible', false);
                            this.$emit('success', ro);
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
