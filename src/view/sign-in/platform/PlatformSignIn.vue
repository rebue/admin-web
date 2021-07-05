<template>
    <div class="body">
        <div class="header">
            <div class="header-center">平台管理<a-divider type="vertical" />登录</div>
        </div>
        <div class="main">
            <div class="login-card">
                <public-sign-in :sysId="sysId" class="form"></public-sign-in>
            </div>
        </div>
        <div class="footer">相关系统链接: <router-link to="/sign-in/ops">运营管理系统</router-link></div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div>
    </div>
</template>

<script>
import { SysIdDic } from '@/dic/SysIdDic';
import PublicSignIn from '@/view/sign-in/comm/PublicSignIn.vue';

export default {
    components: {
        PublicSignIn,
    },
    data() {
        return {
            /** 登录后要中转的地址 */
            redirect: undefined,
            /** 定义当前登录页面所对应的系统 */
            sysId: SysIdDic.PlatformAdminWeb,
            loading: false,
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
        //
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
            // margin-top: 150px;
            width: 450px;
            // height: 300px;
            background-color: aliceblue;
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
.impowerBox .qrcode {
    width: 280px;
    margin: 0;
    border: none;
}
</style>
