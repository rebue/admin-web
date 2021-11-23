<template>
    <div class="body">
        <div class="header">
            <img :src="require('@client/images/logo.png')" alt="" class="logo" :class="`${clientConfig.id}-logo`" />
            <div class="divider"></div>
            <div class="title-wrap">
                <div class="title">统一身份认证平台</div>
                <div class="sub-title">UNIFIED AUTHENTICATION PLATFORM</div>
            </div>
        </div>
        <div class="main">
            <img :src="require('./makeup.png')" alt="" class="makeup" />
            <div class="login-card">
                <public-sign-in v-if="phoneShow" class="form"></public-sign-in>
                <template v-else>
                    <div class="munberLongin" @click="phoneShow = true">账号登录</div>
                    <scanCode :codeType="codeType" :key="codeType"></scanCode>
                </template>
                <router-link :to="forgetPswdPath" class="forget-password" v-if="phoneShow">忘记密码</router-link>
                <div class="scan-code-card">
                    <div class="top-list">
                        <span @click="vxScanCodeClick">微信扫码登录</span>
                        <span>|</span>
                        <span @click="ddScanCodeClick">钉钉扫码登录</span>
                    </div>
                    <div class="mid-list">
                        <!-- <img src="./loginIcon.png" alt="" /> -->
                    </div>
                    <div class="bottom-list">
                        <!-- 注：未注册手机验证后自动登录 注册即代表同意《服务条款》 -->
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <template v-if="clientConfig.id === 'default'">
                桂ICP备08001078号-2
            </template>
            <template v-else>
                <p>{{ clientConfig.name }}版权所有</p>
                <p>由南宁迈越提供技术支持</p>
            </template>
        </div>
    </div>
</template>
<script>
import PublicSignIn from './PublicSignIn.vue';
import scanCode from './scanCode.vue';
import { getAppIdByUrl } from '@/util/common';
import clientConfig from '@client/config';
export default {
    components: {
        PublicSignIn,
        scanCode,
    },
    data() {
        return {
            clientConfig,
            phoneShow: true,
            codeType: '微信',
            forgetPswdPath: `/${getAppIdByUrl()}/forget-password`,
        };
    },
    methods: {
        //微信扫码点击事件
        vxScanCodeClick() {
            this.phoneShow = false;
            this.codeType = '微信';
        },
        //钉钉扫码点击事件
        ddScanCodeClick() {
            this.phoneShow = false;
            this.codeType = '钉钉';
        },
    },
};
</script>

<style lang="less" scoped>
.body {
    min-width: 1300px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .header {
        height: 70px;
        margin: 20px 0;
        font-size: 24px;
        display: flex;
        align-items: flex-end;
        color: #000;
        .logo {
            // max-width: 207px;
            height: 78px;
            margin-left: 55px;
        }
        .nnxy-logo {
            height: 60px;
        }
        .divider {
            width: 2px;
            height: 42px;
            background: #464646;
            margin-left: 16px;
            margin-right: 20px;
        }
        .title-wrap {
            position: relative;
            top: 10px;
        }
        .title {
            font-size: 30px;
        }
        .sub-title {
            font-size: 14px;
        }
    }
    .main {
        flex-grow: 1;
        background: url(./bg.png) no-repeat;
        background-size: cover;
        background-color: #3e78ed;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .makeup {
            width: 54%;
            height: 84%;
        }
        .login-card {
            width: 480px;
            height: 529px;
            margin: 20px 0;
            padding: 40px;
            margin-right: 100px;
            background-color: #fff;
            border-radius: 10px;
            position: relative;
            .munberLongin {
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 16px;
                font-weight: 400;
                color: #7aa8f2;
                cursor: pointer;
            }
            .scan-code-card {
                position: absolute;
                left: 0;
                bottom: 0%;
                margin-top: 70px;
                width: 100%;
                height: 80px;
                .top-list {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 400;
                    color: #7aa8f2;
                    span:nth-child(2) {
                        margin: 0 5px;
                    }
                    span:first-child,
                    span:last-child {
                        cursor: pointer;
                    }
                }
                .mid-list {
                    width: 100%;
                    height: 0px;
                    margin: 6px 0 6px;
                    display: flex;
                    justify-content: center;
                }
                .bottom-list {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                    font-weight: 400;
                    color: #d2d2d3;
                }
            }
        }
        .forget-password {
            display: inline-block;
            margin: 20px 0;
            color: rgba(0, 0, 0, 0.65);
            &:hover {
                color: #3e78ed;
                text-decoration: underline;
            }
        }
    }
    .footer {
        padding: 15px 0;
        text-align: center;
        vertical-align: middle;
        color: #a2a1a1;
        font-size: 14px;
        p {
            margin: 0;
            padding: 0;
        }
    }
}
</style>
