<template>
    <div class="body">
        <div class="header">
            <div class="header-center">XXX系统<a-divider type="vertical" />登录</div>
        </div>
        <div class="main">
            <a-card title="账号密码登录" class="login-card">
                <a-form class="form" :model="form">
                    <a-form-item>
                        <a-input
                            auto-focus
                            ref="txtLoginName"
                            v-model="form.loginName"
                            suffix-icon="el-icon-user-solid"
                            required
                            placeholder="请输入登录账号"
                        >
                            <template v-slot:prefix><a-icon type="user"/></template>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input-password
                            v-model="form.loginPswd"
                            suffix-icon="el-icon-key"
                            show-password
                            required
                            placeholder="请输入登录密码"
                        >
                            <template v-slot:prefix><a-icon type="key"/></template>
                        </a-input-password>
                    </a-form-item>
                    <a-button type="primary" block @click="onSubmit">登录</a-button>
                </a-form>
            </a-card>
        </div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div>
    </div>
</template>

<script>
export default {
    mounted() {
        // auto-focus在chrome中失效，只好手动设置
        this.$refs.txtLoginName.focus();
    },
    data() {
        return {
            form: {
                loginName: '',
                loginPswd: '',
            },
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
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
        height: 40px;
        font-size: 24px;
        padding: 10px;
        display: flex;
        justify-content: center; /* 水平居中 */
        .header-center {
            text-align: left;
            width: 960px;
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
        height: 20px;
        padding: 10px;
    }
}
</style>
