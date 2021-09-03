<template>
    <div class="body">
        <div class="header">
            <img :src="require('./logo.png')" alt="" width="207" height="70" class="logo" />
            <div class="divider"></div>
            <div class="title-wrap">
                <div class="title">统一身份认证平台</div>
                <div class="sub-title">UNIFIED AUTHENTICATION PLATFORM</div>
            </div>
        </div>
        <div class="main">
            <div class="login-card">
                <public-sign-in class="form"></public-sign-in>
            </div>
        </div>
        <div class="footer">技术支持 迈越公司版权所有 @ 2021.</div>
    </div>
</template>

<script>
import PublicSignIn from './PublicSignIn.vue';
import request from '@/util/request';

export default {
    components: {
        PublicSignIn,
    },
    data() {
        return {};
    },
    mothods: {},
};
</script>

<style lang="less" scoped>
.body {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    .header {
        height: 70px;
        margin: 50px 0;
        font-size: 24px;
        display: flex;
        align-items: flex-end;
        color: #000;
        .logo {
            margin-left: 55px;
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
        min-height: 740px;
        background-color: #3e78ed;
        position: relative;
        .login-card {
            width: 480px;
            height: 529px;
            padding: 50px;
            position: absolute;
            left: auto;
            right: 160px;
            top: 50%;
            transform: translateY(-50%);
            // display: flex;
            // flex-direction: column;
            // justify-content: center; /* 水平居中 */
            // align-items: center; /* 垂直居中 */
            background-color: #fff;
            border-radius: 10px;
        }
    }
    .footer {
        height: 70px;
        line-height: 70px;
        text-align: center;
        vertical-align: middle;
        color: #a2a1a1;
        font-size: 14px;
    }
}
</style>
