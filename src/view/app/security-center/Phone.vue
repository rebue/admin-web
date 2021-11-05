<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <!-- 手机号在解绑操作中回显 disable -->
        <a-form-model-item key="mobile" label="手机号" prop="mobile">
            <a-input v-model.trim="model.mobile" placeholder="" :disabled="editFormType !== EditFormTypeDic.Add" />
        </a-form-model-item>
        <a-form-model-item key="code" label="短信验证码" prop="code">
            <div class="code">
                <a-input class="code-input" v-model.trim="model.code" placeholder="" />
                <SendSMSCode
                    :phoneNumber="model.mobile"
                    :captchaVerification.sync="model.captchaVerification"
                    :validatePhone="validatePhone"
                />
            </div>
        </a-form-model-item>
        <!-- <a-form-model-item :wrapper-col="{ span: 13, offset: 7 }">
            <a-button type="primary" native-type="submit" @click="ok">提交</a-button>
        </a-form-model-item> -->
    </a-form-model>
</template>
<script>
import { racAccountApi } from '@/api/Api';
import { isPhone } from '@/util/validator';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import SendSMSCode from '@/view/sign-in/unified/SendSMSCode.vue';

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
            EditFormTypeDic,
            //form表单
            model: {
                id: '',
                mobile: '',
                code: '',
                captchaVerification: '',
                bindType: 0, //0绑定，1解绑
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur', transform: val => val && val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isPhone(value)) {
                                    callback(new Error('手机号不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    mounted() {
        racAccountApi.getById(this.accountId).then(res => {
            const account = res.extra.one;
            (this.model.id = account.id), (this.model.mobile = account.signInMobile);
        });
    },
    methods: {
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求
                    // 绑定，解除绑定
                    //EditFormTypeDic.Add,  EditFormTypeDic.Delete
                    if (this.editFormType === EditFormTypeDic.Add) {
                        racAccountApi
                            .bindPhone({
                                id: this.model.id,
                                mobile: this.model.mobile,
                                code: this.model.code,
                                bindType: 0, //0绑定，1解绑
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog && this.closeDialog();
                            });
                    } else if (this.editFormType === EditFormTypeDic.Delete) {
                        racAccountApi
                            .bindPhone({
                                id: this.model.id,
                                mobile: this.model.mobile,
                                code: this.model.code,
                                bindType: 1, //0绑定，1解绑
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog && this.closeDialog();
                            });
                    }
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        validatePhone() {
            let valid = false;
            this.$refs.form.validateField('mobile', (errors, values) => {
                valid = !errors;
            });
            return valid;
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
