<template>
    <a-form-model ref="form" :model="model" :rules="rules" class="by-phone-wrap">
        <div class="flex flex-column caption">
            <h4>使用E-mail验证码</h4>
        </div>
        <p>当前邮箱 {{ model.mobile }}</p>
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
    data() {
        return {
            model: {
                id: '',
                mobile: '',
                code: '',
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
                    // racAccountApi
                    //     .bindPhone({
                    //         id: this.model.id,
                    //         mobile: this.model.mobile,
                    //         code: this.model.code,
                    //     })
                    //     .then(ro => {
                    this.callback && this.callback();
                    this.closeDialog && this.closeDialog();
                    //     });
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        async getCode() {
            if (this.isCodeLoading) {
                return;
            }
            // 验证手机号是否输入
            let valid = true;
            this.$refs.form.validateField('mobile', (errors, values) => {
                valid = !errors;
            });
            if (!valid) {
                return;
            }

            //获取验证码 请求
            try {
                this.isCodeLoading = true;
                await racVerifitionApi.sendSMSCode({
                    phoneNumber: this.model.mobile,
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
.mobile-circle {
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
