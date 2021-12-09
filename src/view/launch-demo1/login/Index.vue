<template>
    <div class="body">
        <div class="header">
            <!-- <div class="header-center">学员管理系统<a-divider type="vertical" />登录</div> -->
        </div>
        <div class="main">
            <div class="login-card">
                <div class="sign">
                    <h2 class="title">学员管理系统</h2>
                    <Password :action="onPswdSubmit" class="pswd-form" />
                </div>
            </div>
        </div>
        <!-- <div class="footer">
            相关应用链接:
            <router-link to="/platform-admin-web/sign-in/platform">平台管理应用</router-link>
        </div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div> -->
    </div>
</template>

<script>
import { AppIdDic } from '@/dic/AppIdDic';
import Password from '@/view/sign-in/unified/Password.vue';

export default {
    components: {
        Password,
    },
    data() {
        return {
            /** 定义当前登录页面所对应的应用 */
            appId: AppIdDic.OpsAdminWeb,
        };
    },
    methods: {
        //帐密登录
        onPswdSubmit(formData) {
            this.$router.push(`/launch-demo1`);
        },
    },
};
</script>

<style lang="less" scoped>
.body {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
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
        // display: flex;
        // flex-direction: column;
        // justify-content: center; /* 水平居中 */
        // align-items: center; /* 垂直居中 */

        .login-card {
            width: 500px;
            height: 400px;
            margin-top: 100px;
            padding: 50px;
            background-color: #fff;
            position: absolute;
            right: 10%;
            .form {
                width: auto;
            }
            .title {
                text-align: center;
                margin-bottom: 20px;
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
