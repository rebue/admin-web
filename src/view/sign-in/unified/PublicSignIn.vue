<template>
    <a-tabs default-active-key="1" @change="callback" class="tabs">
        <a-tab-pane key="1" tab="账号密码登录">
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
                    <!-- <a-checkbox class="remenber">记住登录状态</a-checkbox> -->
                </a-form-model>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机短信登录">
            <!-- <div id="login_container" style="width: 350px"></div> -->
            <div v-if="!show" class="sign newSign">
                <a-form-model ref="form" class="form" :model="form1">
                    <a-form-model-item prop="accountName" class="sign">
                        <a-select
                            default-value="1"
                            style="width: 85px;margin-right:12px;"
                            size="large"
                            class="inputSelect"
                        >
                            <a-select-option value="1">
                                +86
                            </a-select-option>
                        </a-select>
                        <a-input
                            size="large"
                            style="width: 300px"
                            v-model.trim="form1.accountName"
                            placeholder="手机号"
                            class="input"
                        >
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="signInPswd" class="comFromStyle">
                        <a-input size="large" v-model="form1.signInPswd" placeholder="请输入验证码" class="input">
                        </a-input>
                        <div class="clickCode" @click="clickCode()">获取验证码</div>
                    </a-form-model-item>
                    <a-button size="large" :loading="loading" type="primary" block @click="doSubmit" class="sign-btn"
                        >登录</a-button
                    >
                </a-form-model>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>
<script src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></script>
<script>
import request from '@/util/request';
// import axios from 'axios'
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
            form1: {
                accountFirst: '',
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
    mounted() {},
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
        //点击获取验证码事件
        clickCode() {},
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
.newSign .ant-input-lg {
    height: 56px;
}
.newSign >>> .ant-select-lg .ant-select-selection__rendered {
    line-height: 56px;
}
.newSign >>> .ant-select-lg .ant-select-selection--single {
    height: 56px;
}
.comFromStyle {
    position: relative;
}
.clickCode {
    position: absolute;
    right: 10px;
    top: -12px;
    font-size: 18px;
    color: #7aa8f2;
    cursor: pointer;
}
</style>
