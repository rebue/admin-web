<template>
    <div class="body">
        <div class="header">
            <div class="">
                XXX系统|登录
            </div>
        </div>
        <div class="main">
            <el-card class="login-card">
                <div slot="header">
                    <span>账号密码登录</span>
                </div>
                <el-form class="form" ref="form" :model="form" label-position="left" label-width="90px">
                    <el-form-item label="登录账号">
                        <el-input
                            autofocus
                            v-model="form.loginName"
                            suffix-icon="el-icon-user-solid"
                            required
                            placeholder="请输入登录账号"
                        />
                    </el-form-item>
                    <el-form-item label="登录密码">
                        <el-input
                            v-model="form.loginPswd"
                            suffix-icon="el-icon-key"
                            show-password
                            required
                            placeholder="请输入登录密码"
                        />
                    </el-form-item>
                    <!-- <el-form-item> -->
                    <el-button class="login-button" type="primary" @click="onSubmit">登录</el-button>
                    <!-- </el-form-item> -->
                </el-form>
            </el-card>
        </div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div>
    </div>
</template>

<script>
export default {
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
    text-align: center;
    background: url(./bg.jpg) no-repeat center center fixed;
    background-size: cover;
    .header {
        height: 40px;
        font-size: 24px;
        padding: 10px;
        .header {
            text-align: left;
            width: 960px;
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
            width: 550px;
            height: 350px;
            display: flex;
            flex-direction: column;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */

            .form {
                width: 350px;
                .login-button {
                    width: 350px;
                }
            }
        }
    }
    .footer {
        height: 20px;
        padding: 10px;
    }
}
</style>
