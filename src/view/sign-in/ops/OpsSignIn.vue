<template>
    <div class="body">
        <div class="header">
            <div class="header-center">运营管理<a-divider type="vertical" />登录</div>
        </div>
        <div class="main">
            <a-card title="账号密码登录" class="login-card">
                <!-- 只需要通过 rules 属性传入约定的验证规则，
                并将 FormItem 的 prop 属性设置为需校验的字段名即可。
                校验规则参见 https://github.com/yiminghe/async-validator -->
                <a-form-model ref="form" class="form" :model="form" :rules="rules">
                    <a-form-model-item prop="accountName">
                        <a-input v-autofocus v-model.trim="form.accountName" placeholder="请输入登录账号">
                            <template #prefix><a-icon type="account"/></template>
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="signInPswd">
                        <a-input-password v-model="form.signInPswd" placeholder="请输入登录密码">
                            <template #prefix><a-icon type="key"/></template>
                        </a-input-password>
                    </a-form-model-item>
                    <a-button :loading="loading" type="primary" block @click="doSubmit">登录</a-button>
                </a-form-model>
            </a-card>
        </div>
        <div class="footer">相关系统链接: <router-link to="/sign-in/platform">平台管理系统</router-link></div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div>
    </div>
</template>

<script>
import md5 from 'crypto-js/md5';
import { SysIdDic } from '@/dic/SysIdDic';
import { racSignInApi } from '@/api/Api';
import { setSysId } from '@/util/cookie';

export default {
    data() {
        return {
            /** 登录后要中转的地址 */
            redirect: undefined,
            /** 定义当前登录页面所对应的系统 */
            sysId: SysIdDic.OpsAdminWeb,
            loading: false,
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
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true,
        },
    },
    methods: {
        doSubmit() {
            console.log('doSubmit!');
            this.loading = true;

            this.$refs.form.validate(valid => {
                if (valid) {
                    racSignInApi
                        .signInByAccountName({
                            sysId: this.sysId,
                            accountName: this.form.accountName,
                            signInPswd: md5(this.form.signInPswd).toString(),
                        })
                        .then(() => {
                            setSysId(this.sysId);
                            window.location.href = '#' + this.redirect || '';
                        })
                        .finally(() => (this.loading = false));
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

<style lang="less" scoped>
.body {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: hidden;
    background: url(./bg.jpg) no-repeat center center fixed;
    background-size: cover;
    .header {
        height: 60px;
        font-size: 24px;
        padding: 10px;
        display: flex;
        justify-content: center; /* 水平居中 */
        .header-center {
            text-align: left;
            width: 1024px;
            font-size: 28px;
            color: white;
        }
    }
    .main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */

        .login-card {
            margin-top: -200px;
            width: 450px;
            height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */

            .form {
                width: 280px;
            }
        }
    }
    .footer {
        height: 40px;
        padding: 10px;
        color: white;
        text-align: center;
    }
}
</style>
