<template>
    <base-modal
        ref="baseModal"
        title="代理登录"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="targetSysId" label="登录系统" prop="targetSysId">
                <a-radio-group v-model="model.targetSysId" @change="onChange">
                    <a-radio-button value="a">
                        Hangzhou
                    </a-radio-button>
                    <a-radio-button value="b">
                        Shanghai
                    </a-radio-button>
                    <a-radio-button value="c">
                        Beijing
                    </a-radio-button>
                    <a-radio-button value="d">
                        Chengdu
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        this.rules = {
            signInPswd: [
                { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    trigger: ['change', 'blur'],
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
        };
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
                        .modifySignInPswd(this.id, this.model.signInPswd)
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
        onChange() {
            //
        },
    },
};
</script>
