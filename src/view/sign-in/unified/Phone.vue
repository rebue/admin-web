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
            <a-input size="large" v-model="phoneForm.code" placeholder="验证码" class="input"> </a-input>
            <a-button
                class="code-btn"
                type="link"
                key="btn"
                @click="getCode"
                :loading="isCodeLoading"
                v-if="!isCounting"
                >发送验证码</a-button
            >
            <a-button class="code-btn" type="link" key="s" v-else>{{ second }}s</a-button>
        </a-form-model-item>
        <a-button size="large" :loading="loading" type="primary" block @click="doSubmitByPhone" class="sign-btn"
            >登录</a-button
        >
    </a-form-model>
</template>
<script>
import request from '@/util/request';
import { racVerifitionApi } from '@/api/Api';
import { isPhone } from '@/util/validator';
import { countDown } from '@/util/common';
const SECOND = 60;
export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            // 手机号
            second: SECOND,
            isCodeLoading: false,
            isCounting: false,
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
                    const data = {
                        loginType: 1,
                        phoneNumber: this.phoneForm.phoneNumber,
                        code: this.phoneForm.code,
                    };
                    if (this.phoneForm.captchaVerification) {
                        data.captchaVerification = this.phoneForm.captchaVerification;
                    }
                    request
                        .post({
                            url: '/oap-svr/oap/login',
                            data: data,
                        })
                        .then(r => {
                            if (r.result === 1) {
                                // 登录成功 重定向去后端接口redireact_uri?code&state&callbackUri
                                console.log('----登录成功 repalce', r);
                                window.location.replace(r.extra);
                            }
                        })
                        .finally(() => {
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
        // 手机登录获取验证码事件
        async getCode() {
            // 验证码发送中不能再操作
            if (this.isCodeLoading) {
                return;
            }
            // 首先验证手机号是否输入
            let valid = true;
            this.$refs.phoneForm.validateField('phoneNumber', (errors, values) => {
                valid = !errors;
            });

            if (!valid) {
                return;
            }

            // 其次 弹出行为验证码
            const that = this;
            this.$showDialog(
                require('@/view/sign-in/comm/Verify.vue').default,
                {
                    methods: {
                        handleVerifySuccess(res) {
                            that.phoneForm.captchaVerification = res.captchaVerification;
                            that.fetchCode();
                        },
                        handleVerifyError() {
                            that.phoneForm.captchaVerification = '';
                        },
                    },
                },
                {
                    title: '请完成安全验证',
                    footer: null,
                    // closable: false,
                    width: 450,
                    wrapClassName: 'verify-modal-wrap',
                }
            );
        },
        async fetchCode() {
            //发送短信验证码 请求
            try {
                this.isCodeLoading = true;
                await racVerifitionApi.sendSMSCode({
                    phoneNumber: this.phoneForm.phoneNumber,
                    captchaVerification: this.phoneForm.captchaVerification,
                });
                this.isCodeLoading = false;
                this.isCounting = true;
                // then 验证码倒计时
                countDown(this.second, val => {
                    this.second = val;
                    if (val === 0) {
                        this.second = SECOND;
                        this.isCounting = false;
                    }
                });
            } catch {
                this.isCodeLoading = false;
            }
        },
    },
};
</script>
<style scoped>
.tabs >>> .ant-tabs-bar {
    margin-bottom: 32px;
}
.tabs >>> .ant-tabs-nav {
    width: 100%;
}
.tabs >>> .ant-tabs-nav > div {
    width: 100%;
    display: flex;
}
.tabs >>> .ant-tabs-nav .ant-tabs-tab {
    flex: 1;
    text-align: center;
    font-size: 20px;
}
.input >>> .ant-input {
    height: 56px;
}
.input >>> .ant-input:not(:first-child) {
    padding-left: 40px;
}
.sign-btn {
    height: 56px;
    line-height: 56px;
    font-size: 20px;
}
.remenber {
    margin: 20px 0;
    float: right;
}
.phone-sign .ant-input-lg {
    height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection__rendered {
    line-height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection--single {
    height: 56px;
}
.comFromStyle {
    position: relative;
}
.code-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #7aa8f2;
    cursor: pointer;
}
</style>
