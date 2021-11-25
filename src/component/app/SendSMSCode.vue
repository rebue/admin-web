<template>
    <a-button
        style="min-width: 10em;"
        :type="buttonType"
        :size="buttonSize"
        key="btn"
        @click="getCode"
        :loading="isCodeLoading"
    >
        {{ isCounting ? `${second}s` : '发送短信验证码' }}
    </a-button>
</template>
<script>
import { racVerifitionApi } from '@/api/Api';
import { countDown } from '@/util/common';
const SECOND = 60;
export default {
    components: {},
    props: {
        action: {
            type: Function,
        },
        phoneNumber: {
            type: String,
        },
        captchaVerification: {
            type: String,
            required: true,
        },
        validatePhone: {
            type: Function,
        },
        // button相关
        buttonType: {
            type: String,
        },
        buttonSize: {
            type: String,
            default: 'default',
        },
        // 倒计时秒数
        sec: {
            type: Number,
            default: SECOND,
        },
    },
    data() {
        return {
            // 手机号
            second: SECOND,
            isCodeLoading: false,
            isCounting: false,
        };
    },
    mounted() {
        this.second = this.sec;
        console.log(this.$attrs);
    },
    methods: {
        // 手机登录获取验证码事件
        async getCode() {
            // 验证码发送中不能再操作
            if (this.isCodeLoading || this.isCounting) {
                return;
            }
            // 首先验证手机号是否输入
            let valid = true;
            if (this.validatePhone) {
                valid = this.validatePhone();
            } else {
                valid = !!this.phoneNumber;
            }
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
                            that.$emit('update:captchaVerification', res.captchaVerification);
                            that.$nextTick(() => {
                                // 验证码 值更新 后在发短信
                                that.fetchCode();
                            });
                        },
                        handleVerifyError() {
                            that.$emit('update:captchaVerification', '');
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

                if (this.action) {
                    await this.action();
                    // racVerifitionApi.sendSMSCodeByAccountId({
                    //     accountId: this.phoneNumber,
                    //     captchaVerification: this.captchaVerification,
                    // });
                } else {
                    await racVerifitionApi.sendSMSCode({
                        phoneNumber: this.phoneNumber,
                        captchaVerification: this.captchaVerification,
                    });
                }
                this.isCodeLoading = false;
                this.isCounting = true;
                // then 验证码倒计时
                countDown(this.second, val => {
                    this.second = val;
                    if (val === 0) {
                        this.second = this.sec;
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
