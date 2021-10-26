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
                    <a-checkbox class="remenber">记住登录状态</a-checkbox>
                </a-form-model>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机短信登录">
            <!-- <div id="login_container" style="width: 350px"></div> -->
            <div v-if="!show" class="sign newSign">
                <a-form-model ref="form" class="form" :model="form" :rules="rules">
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
                            v-model.trim="form.phoneNumber"
                            placeholder="手机号"
                            class="input"
                        >
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="phoneCodeNumber" class="comFromStyle">
                        <a-input size="large" v-model="form.phoneCodeNumber" placeholder="验证码" class="input">
                        </a-input>
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
                    <a-button size="large" :loading="loading" type="primary" block @click="doSubmit" class="sign-btn"
                        >登录</a-button
                    >
                </a-form-model>
            </div>
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import request from '@/util/request';
import { racVerifitionApi } from '@/api/Api';
import { isPhone } from '@/util/validator';
import { countDown } from '@/util/common';
import md5 from 'crypto-js/md5';

const SECOND = 60;
export default {
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            show: true,
            tabKey: 1,
            isCodeLoading: false,
            isCounting: false,
            second: SECOND,
            phoneAreaNumber: ['+86', '+91', '+99'],
            form: {
                accountName: '',
                signInPswd: '',

                phoneAreaNumber: '',
                phoneNumber: '',
                phoneCodeNumber: '',
            },
            rules: {
                accountName: [
                    { required: true, message: '请输入登录账号', trigger: 'blur', transform: val => val.trim() },
                ],
                signInPswd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val.trim() },
                ],
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
                phoneCodeNumber: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (this.form.phoneNumber == '') {
                                this.$refs.form.validateField('phoneNumber');
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
        //TAB切换事件
        callback(key) {
            this.show = !this.show;
            this.tabKey = key; //key值
        },
        //手机号的区域下拉框事件
        selectChange(value) {
            this.form.phoneAreaNumber = value;
        },
        //点击登录事件
        doSubmit() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    request
                        .post({
                            url: this.tabKey == 1 ? '/oap-svr/oap/login' : '/oap-svr/oap/login',
                            data:
                                this.tabKey == 1
                                    ? {
                                          loginName: this.form.accountName,
                                          password: md5(this.form.signInPswd).toString(),
                                      }
                                    : {
                                          phoneAreaNumber: this.form.phoneAreaNumber,
                                          phoneNumber: this.form.phoneNumber,
                                          phoneCodeNumber: this.form.phoneCodeNumber,
                                      },
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
        //点击获取验证码事件
        async getCode() {
            if (this.isCodeLoading) {
                return;
            }
            // 验证手机号是否输入
            let valid = true;
            this.$refs.form.validateField('phoneNumber', (errors, values) => {
                valid = !errors;
            });

            if (!valid) {
                return;
            }

            //发送验证码 请求
            try {
                this.isCodeLoading = true;
                await racVerifitionApi.sendSMSCode({
                    phoneNumber: this.form.phoneNumber,
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
