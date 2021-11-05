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
            <a-form-model-item key="newSignInPswd" label="新密码" prop="newSignInPswd">
                <a-input-password
                    v-model.trim="model.newSignInPswd"
                    placeholder="请输入新密码"
                    autocomplete="new-password"
                />
            </a-form-model-item>
            <a-form-model-item key="newSignInPswdAgain" label="确认新密码" prop="newSignInPswdAgain">
                <a-input-password
                    v-model.trim="model.newSignInPswdAgain"
                    placeholder="请再次输入新密码(确认)"
                    autocomplete="new-password"
                />
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi, racDicApi } from '@/api/Api';
import md5 from 'crypto-js/md5';

export default {
    name: 'app-security-center-pwsd',
    components: {
        BaseModal,
    },
    props: {
        record: {
            type: String,
            required: true,
        },
        passworDoverdue: {
            type: String,
            required: true,
        },
    },
    data() {
        this.rules = {
            signInPswd: [
                { required: true, message: '请输入旧密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            newSignInPswd: [
                {
                    required: true,
                    // message: '请输入新密码',
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value === undefined) value = '';
                        value = value.trim();
                        if (value.length < this.passwordMinLength) {
                            callback(new Error(`请最少输入${this.passwordMinLength}位数密码`));
                            return;
                        }
                        //字典项里设置的包括多少种字符
                        if (this.passwordCharacter == 2) {
                            const pattern = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]/i;
                            if (!pattern.test(value)) {
                                callback(new Error(`请最少输入${this.passwordCharacter}种字符密码格式`));
                                return;
                            }
                        }
                        if (this.passwordCharacter == 3) {
                            const pattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]/;
                            console.log(pattern.test(value));
                            if (!pattern.test(value)) {
                                callback(new Error(`请最少输入${this.passwordCharacter}种字符密码格式`));
                                return;
                            }
                        }
                        if (this.passwordCharacter == 4) {
                            const pattern = /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]/i;
                            if (!pattern.test(value)) {
                                callback(new Error(`请最少输入${this.passwordCharacter}种字符密码格式`));
                                return;
                            }
                        }
                        if (value === this.model.signInPswd) {
                            callback(new Error('新密码不能和旧密码相同'));
                            return;
                        }
                        if (value === this.model.newSignInPswdAgain) {
                            this.$refs.form.validateField('newSignInPswdAgain');
                            callback();
                            return;
                        }
                        if (value !== this.model.newSignInPswdAgain && this.model.newSignInPswdAgain.length != 0) {
                            this.$refs.form.validateField('newSignInPswdAgain');
                            callback();
                            return;
                        }
                        callback();
                    },
                },
            ],
            newSignInPswdAgain: [
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

                        if (value !== this.model.newSignInPswd) {
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
                signInPswd: '',
                newSignInPswd: '',
                newSignInPswdAgain: '',
            },
            wordMinLength: 6,
            passwordCharacter: 2,
            isCancelClick: true,
        };
    },
    mounted() {
        this.getbyIdFun();
        this.isCancelClick = this.passworDoverdue == 'isShow' ? false : true;
    },
    methods: {
        getbyIdFun() {
            const params = 'levelProtect';
            racDicApi.getByDicKey(params).then(ro => {
                ro.extra.dicItems?.map(item => {
                    if (item.dicItemKey == 'passwordMinLength') {
                        this.passwordMinLength = item.dicItemValue;
                    } else if (item.dicItemKey == 'passwordCharacter') {
                        this.passwordCharacter = item.dicItemValue;
                    }
                });
            });
        },
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
                        .then(() => this.$emit('update:visible', false))
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
