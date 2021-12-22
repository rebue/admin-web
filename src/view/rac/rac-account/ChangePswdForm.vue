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
        <a-form-model ref="form" :model="model" v-bind="formLayout">
            <input-password key="signInPswd" :value.sync="model.signInPswd" label="登录密码" prop="signInPswd" />
            <input-password-again
                key="signInPswdAgain"
                :value.sync="model.signInPswdAgain"
                :target="model.signInPswd"
                label="再次确认"
                prop="signInPswdAgain"
            />
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi, racDicApi } from '@/api/Api';
import InputPassword from '@/view/forget-password/widgets/InputPassword.vue';
import InputPasswordAgain from '@/view/forget-password/widgets/InputPasswordAgain.vue';
export default {
    components: {
        BaseModal,
        InputPassword,
        InputPasswordAgain,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
    data() {
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
                        .modifySignInPswd(this.record.id, this.model.signInPswd)
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
