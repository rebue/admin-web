<template>
    <base-modal
        ref="baseModal"
        title="修改账户登录密码"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="signInPswd" label="登录密码" prop="signInPswd" :help="help">
                <a-input-password
                    v-autofocus
                    v-model.trim="model.signInPswd"
                    placeholder="请输入登录密码"
                    autocomplete="new-password"
                />
            </a-form-model-item>
            <a-form-model-item key="signInPswdAgain" label="再次确认" prop="signInPswdAgain">
                <a-input-password
                    v-model.trim="model.signInPswdAgain"
                    placeholder="请再次输入登录密码(确认)"
                    autocomplete="new-password"
                />
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi, racDicApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
    data() {
        this.rules = {
            signInPswd: [
                {
                    required: true,
                    // message: '请输入登录密码',
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
                        callback();
                    },
                },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    trigger: 'blur',
                    validator: (rule, value, callback) => {
                        if (value === undefined) value = '';
                        value = value.trim();

                        if (value === '') {
                            callback(new Error('请再次输入登录密码(确认)'));
                            return;
                        }

                        if (value !== this.model.signInPswd) {
                            callback(new Error('两次输入的登录密码不相同'));
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
                signInPswdAgain: '',
            },
            passwordMinLength: 6,
            passwordCharacter: 2,
        };
    },
    mounted() {
        this.getbyIdFun();
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
                    this.help = `登录密码由${this.passwordMinLength}~20位字符组成，包含至少${this.passwordCharacter}种以上字母、数组、符号以上组合，区分大小写`;
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
                        .modifySignInPswd(this.record.id, this.model.signInPswd)
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
