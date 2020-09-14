<template>
    <div class="body">
        <div class="header">XXX系统|登录</div>
        <div class="main">
            <el-card class="login-card">
                <div slot="header" class="clearfix">
                    <span>扫码登录</span>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{ '列表内容 ' + o }}
                </div>
            </el-card>
        </div>
        <div class="footer">&copy;2020 zbz, Rebue. All rights reserved.</div>
    </div>
</template>

<style lang="less" scoped>
.body {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
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
        background-color: #eee;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        .login-card {
            width: 700px;
        }
    }
    .footer {
        height: 20px;
        padding: 10px;
    }
}
</style>
