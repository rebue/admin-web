<template>
    <a-tabs default-active-key="1" @change="callback" class="tabs">
        <a-tab-pane key="1" tab="账号登录">
            <div v-if="show" class="sign">
                <a-form-model ref="form" class="form" :model="form" :rules="rules">
                    <a-form-model-item prop="accountName" class="sign">
                        <a-input
                            size="large"
                            v-autofocus
                            v-model.trim="form.accountName"
                            placeholder="请输入账号/手机号"
                            class="input"
                        >
                            <template #prefix><a-icon type="user"/></template>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="signInPswd">
                        <a-input-password size="large" v-model="form.signInPswd" placeholder="请输入密码" class="input">
                            <template #prefix><a-icon type="lock"/></template>
                        </a-input-password>
                    </a-form-model-item>
                    <a-button size="large" :loading="loading" type="primary" block @click="doSubmit" class="sign-btn"
                        >登录</a-button
                    >
                    <a-checkbox class="remenber">记住登录状态</a-checkbox>
                </a-form-model>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="扫码登录">
            <div id="wx-login-box" style="width: 350px"></div>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import request from '@/util/request';
export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            show: true,
            form: {
                accountName: '',
                signInPswd: '',
            },
            rules: {
                accountName: [
                    { required: true, message: '请输入登录账号', trigger: 'blur', transform: val => val.trim() },
                ],
                signInPswd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
        };
    },
    methods: {
        callback(key) {
            this.show = !this.show;
        },
        doSubmit() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    request
                        .post({
                            url: '/oap-svr/oidc/login',
                            data: {
                                loginName: this.form.accountName,
                                password: this.form.signInPswd,
                            },
                        })
                        .then(r => {
                            if (r.result === 1) {
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
</style>
