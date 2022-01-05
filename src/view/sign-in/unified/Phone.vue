<template>
    <a-form-model ref="phoneForm" class="form" :model="phoneForm" :rules="phoneRules">
        <a-form-model-item prop="phoneNumber" class="sign">
            <a-select
                :default-value="phoneAreaNumber[0]"
                style="width: 85px;margin-right:12px;"
                size="large"
                @change="selectChange"
                class="inputSelect"
            >
                <a-select-option :value="item" v-for="(item, index) in phoneAreaNumber" :key="index">{{
                    item
                }}</a-select-option>
            </a-select>
            <a-input
                size="large"
                style="width: 300px"
                v-model.trim="phoneForm.phoneNumber"
                placeholder="手机号"
                class="input"
            >
            </a-input>
        </a-form-model-item>
        <a-form-model-item prop="code" class="comFromStyle">
            <a-input size="large" v-model="phoneForm.code" placeholder="短信验证码" class="input"> </a-input>
            <SendSMSCode
                :phoneNumber="phoneForm.phoneNumber"
                :captchaVerification.sync="phoneForm.captchaVerification"
                buttonType="link"
                buttonSize="large"
                :validatePhone="validatePhone"
                class="code-btn"
            />
        </a-form-model-item>
        <a-button size="large" :loading="loading" type="primary" block @click="doSubmitByPhone" class="sign-btn"
            >登录</a-button
        >
    </a-form-model>
</template>
<script>
import { isPhone } from '@/util/validator';
import SendSMSCode from '@/component/app/SendSMSCode.vue';

export default {
    components: {
        SendSMSCode,
    },
    props: {
        action: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            // 手机号
            phoneAreaNumber: ['+86', '+91', '+99'],
            phoneForm: {
                phoneAreaNumber: '',
                phoneNumber: '',
                code: '',
                captchaVerification: '',
            },
            phoneRules: {
                phoneNumber: [
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
                    { required: true, message: '请输入手机号', trigger: 'blur', transform: val => val.trim() },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (this.phoneForm.phoneNumber == '') {
                                this.$refs.phoneForm.validateField('phoneNumber');
                            } else {
                                callback();
                            }
                        },
                        trigger: 'change',
                    },
                ],
            },
        };
    },
    methods: {
        //手机号的区域下拉框事件
        selectChange(value) {
            this.phoneForm.phoneAreaNumber = value;
        },
        // 手机登录事件
        doSubmitByPhone() {
            this.loading = true;
            this.$refs.phoneForm.validate(valid => {
                if (valid) {
                    this.action({
                        ...this.phoneForm,
                    }).finally(() => {
                        this.loading = false;
                    });
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
            this.$refs.phoneForm.validateField('phoneNumber', errors => {
                valid = !errors;
            });
            return valid;
        },
    },
};
</script>
<style scoped>
.code-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #7aa8f2;
    cursor: pointer;
}
</style>
