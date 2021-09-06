<template>
    <div class="body">
        <div class="header">
            <img :src="require('./logo.png')" alt="" class="logo" />
            <div class="divider"></div>
            <div class="title-wrap">
                <div class="title">统一身份认证平台</div>
                <div class="sub-title">UNIFIED AUTHENTICATION PLATFORM</div>
            </div>
        </div>
        <div class="main">
            <img :src="require('./makeup.png')" alt="" class="makeup" />
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
            width: 207px;
            height: 78px;
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
            padding: 50px;
            margin-right: 100px;
            background-color: #fff;
            border-radius: 10px;
        }
    }
    .footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        color: #a2a1a1;
        font-size: 14px;
    }
}
</style>
