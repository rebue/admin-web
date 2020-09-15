<template>
    <div class="body">
        <div class="header">XXX系统|登录</div>
        <div class="main">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>登录</span>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="登录账号">
                        <el-input v-model="form.loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码">
                        <el-input v-model="form.loginPswd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                    </el-form-item>
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

        .login-tabs {
            width: 450px;
            height: 300px;
        }
    }
    .footer {
        height: 20px;
        padding: 10px;
    }
}
</style>
