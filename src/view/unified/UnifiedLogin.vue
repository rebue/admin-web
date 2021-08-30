<template>
    <div id="app" v-cloak>
        <!-- 头部logo 区别 -->
        <div class="flex-box logo al-c" v-if="enableAppLogo">
            <img src="./images/logo.png" :alt="appTitle">
            <div style="margin-left:10px;">
                <span class="pb5 font-36" v-text="appTitle"></span>
                <div class="pb5 font-14" v-text="appTitleExtra"></div>
            </div>
        </div>
        <div class="flex-box logo al-b" v-else>
            <img src="./images/logo.png" alt="迈越软件">
            <div class="ml30 mr30 line"></div>
            <span class="pb5 font-28">统一身份认证</span>
        </div>

        <div class="w100 flex-box al-c main">
            <div class="flex-4"></div>
            <div class="card-shadow of-h login-box">
                <div class="w100 font-22 white flex-box title">
                    <p class="h100 flex-1 flex-box al-c ju-c cu-p" :class="'active'"
                       @click="showBox = 'password'">账号登录</p>
                </div>
                <div id="form" v-show="showBox === 'password'">
                    <div class="w100 pl40 pr40 pt40 pb40">
                        <!-- 输入框 -->
                        <div class="pl30 pr30 pt10 pb10 bg-w radius-4">
                            <div class="pl10 pr10 flex-box al-c btn-box">
                                <i class="el-icon-user font-24 grey"></i>
                                <input name="loginName" v-model="name" class="w100 ml20 font-18" type="text"
                                       placeholder="用户名">
                            </div>
                            <div class="horizontal-line"></div>
                            <div class="pl10 pr10 flex-box al-c btn-box">
                                <i class="el-icon-lock font-24 grey"></i>
                                <input name="password" v-model="password" class="w100 ml20 font-18" type="password"
                                       placeholder="密码">
                            </div>
                            <div class="horizontal-line" v-if="showVerCode"></div>
                        </div>

                        <!-- 错误信息提示：error值为空不会显示 -->
                        <p class="w100 mt20 mb10 red font-14" v-text="error"></p>
                        <!-- 登录按钮，异步中调用loading，true防止用户多次点击，结束异步变回false -->
                        <input name="state" :value="state" hidden>
                        <input name="redirectUri" :value="redirectUri" hidden>
                        <button class="w100" type="primary" :loading="loading" native-type="button" @click="submit">
                            立 即 登 录
                        </button>
                    </div>
                </div>

                <div class="w100 pl40 pr40 pt40 pb40" v-show="showBox == 'qr'">
                    <div id="ding-qr"></div>
                </div>
            </div>
            <div class="flex-1"></div>
        </div>
    </div>
</template>
<script>
import request from '@/util/request';

export default {
    name: "UnifiedLogin",
    methods: {
        submit() {
            console.log('submit1');
            if (this.disabled) {
                return;
            }
            console.log('submit2');
            request
                .post({
                    url: '/oap-svr/oidc/login',
                    data: {
                        loginName: this.name,
                        password: this.password,
                    }
                })
                .then(r => {
                    if (r.result === 1) {
                        window.location.replace(r.extra);
                    }
                });
        },
        // 登录
        login() {
            console.log("state: %s", this.state);
        },
        createQR() {
            console.log('createQR');
        }
    },
    data() {
        return {
            loading: false,
            name: "adminer",
            password: "123456",
            remember: false,
            showVerCode: false,
            verCode: "",
            time: new Date().getTime(),
            // state用于区分：直接登录/第三方登录
            state: "todoState",
            // 直接登录的时候后端需要使用该参数
            redirectUri: "555",
            // 错误信息提示：值为空不会显示
            error: "",
            // 显示账密窗口或钉钉扫码 password / qr
            showBox: "password",
            // AppKey
            appid: "[[${dingtalkAppKey}]]",
            // 统一认证后台url,扫码登录的时候要用到
            gotoUrl: "[[${dingtalkRedirectUri}]]",
            // 是否启用扫码事件监听
            isListening: false,
            pathPrefix: "http://127.0.0.1:10080/oap-svr/oidc/login",
            // 头部logo
            //enableAppLogo为true表示展示第三方应用的logo，false表示统一身份认证
            enableAppLogo: false,
            appLogo: "111",
            appTitle: "222",
            appTitleExtra: "333"
        }
    }
}
</script>

<style scoped src="./UnifiedLogin.css"></style>
<style scoped src="./base.css"></style>
<style scoped src="./element.css"></style>
