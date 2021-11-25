<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <!-- 手机号在解绑操作中回显 disable -->
        <a-form-model-item key="mobile" label="手机号" prop="mobile">
            <a-input v-model.trim="model.mobile" placeholder="" disabled />
        </a-form-model-item>
        <a-form-model-item key="code" label="短信验证码" prop="code">
            <div class="code">
                <a-input class="code-input" v-model.trim="model.code" placeholder="" />
                <SendSMSCode
                    :action="action"
                    :phoneNumber="model.id"
                    :captchaVerification.sync="model.captchaVerification"
                />
            </div>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { racAccountApi, racVerifitionApi } from '@/api/Api';
import SendSMSCode from '@/component/app/SendSMSCode.vue';

export default {
    name: 'app-security-center-mobile',
    components: {
        SendSMSCode,
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
            //form表单
            model: {
                id: '',
                mobile: '',
                code: '',
                captchaVerification: '',
                bindType: 0, //0绑定，1解绑
            },
            rules: {
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    mounted() {
        racAccountApi.getById(this.accountId).then(res => {
            const account = res.extra.one;
            this.model.id = account.id;
            this.model.mobile = account.signInMobile || '';
        });
    },
    methods: {
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    racAccountApi
                        .bindPhone({
                            id: this.model.id,
                            code: this.model.code,
                            bindType: 1, //0绑定，1解绑
                        })
                        .then(ro => {
                            this.callback && this.callback(ro);
                            this.closeDialog && this.closeDialog();
                        });
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        action() {
            return racVerifitionApi.sendSMSCodeByAccountId({
                accountId: this.model.id,
                captchaVerification: this.model.captchaVerification,
            });
        },
    },
};
</script>
<style scoped>
.code {
    display: flex;
    align-items: center;
}
.code-input {
    margin-right: 10px;
}
</style>
