<template>
    <a-form-model ref="form" :model="model" :rules="rules" class="by-phone-wrap">
        <div class="flex flex-column caption">
            <h4>使用E-mail验证码</h4>
        </div>
        <p>当前邮箱 {{ model.signInEmail }}</p>
        <!-- 验证码 -->
        <a-form-model-item key="code" label="" prop="code">
            <div class="code">
                <a-input class="code-input" v-model.trim="model.code" placeholder="验证码" />
                <a-button key="btn" @click="getCode" :loading="isCodeLoading" v-if="!isCounting"
                    >发送邮箱验证码</a-button
                >
                <a-button style="width: 12em;" key="s" v-else>{{ second }}s</a-button>
            </div>
        </a-form-model-item>
        <a-form-model-item>
            <a-button type="primary" native-type="submit" block @click="ok">提交</a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { racAccountApi, racVerifitionApi } from '@/api/Api';
import { countDown } from '@/util/common';

const SECOND = 60;
export default {
    name: 'forget-password-by-email',
    components: {},
    props: ['account'],
    data() {
        return {
            model: {
                id: '',
                signInEmail: '',
                code: '',
                captchaVerification: '',
            },
            rules: {
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            second: SECOND,
            isCodeLoading: false,
            isCounting: false,
        };
    },
    mounted() {
        //
    },
    methods: {
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求
                    racAccountApi
                        .isEmailExist({
                            id: this.model.id,
                            signInEmail: this.model.signInEmail,
                            code: this.model.code,
                            captchaVerification: this.model.captchaVerification,
                        })
                        .then(ro => {
                            console.log('--身份认证 邮箱 提交数据', this.model);
                            this.$emit('callback', { ...this.model });
                        });
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        // 邮箱登录获取验证码事件
        async getCode() {
            // 验证码发送中不能再操作
            if (this.isCodeLoading) {
                return;
            }
            // 首先验证邮箱是否输入
            if (!this.model.signInEmail) {
                return;
            }

            // 其次 弹出行为验证码
            const that = this;
            this.$showDialog(
                require('@/view/sign-in/comm/Verify.vue').default,
                {
                    methods: {
                        handleVerifySuccess(res) {
                            that.model.captchaVerification = res.captchaVerification;
                            that.fetchCode();
                        },
                        handleVerifyError() {
                            that.model.captchaVerification = '';
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
                    email: this.model.signInEmail,
                    captchaVerification: this.model.captchaVerification,
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
    watch: {
        account: {
            immediate: true,
            handler(val) {
                console.log('--从验证账号来', val);
                this.model.id = val.id;
                this.model.signInEmail = val.signInEmail;
            },
        },
    },
};
</script>
<style scoped>
.by-phone-wrap {
    padding: 60px 20px;
}
.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
.flex-column {
    flex-direction: column;
}
.caption {
    margin-bottom: 20px;
}
.signInEmail-circle {
    width: 3em;
    height: 3em;
    margin-bottom: 10px;
    border-radius: 50%;
    background: #ddd;
}
.code {
    display: flex;
}
.code-input {
    margin-right: 10px;
}
.qa {
    display: flex;
    align-items: flex-start;
}
.qa span {
    margin-right: 8px;
}
</style>
