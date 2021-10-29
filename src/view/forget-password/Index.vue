<template>
    <div class="body">
        <div class="header">
            <img :src="require('@/view/sign-in/unified/logo.png')" alt="" class="logo" />
            <div class="divider"></div>
            <div class="title-wrap">
                <div class="title">统一身份认证平台</div>
                <div class="sub-title">UNIFIED AUTHENTICATION PLATFORM</div>
            </div>
        </div>
        <div class="main">
            <!-- 忘记密码流程 -->
            <!-- 验证账号 -->
            <Account @success="next" v-if="step == 0" />
            <!-- 身份认证，设置操作，完成 -->
            <Wrap :accountId="accountId" v-if="step == 1" />
        </div>
        <div class="footer">桂ICP备08001078号-2</div>
    </div>
</template>
<script>
import Account from './Account.vue';
import Wrap from './Wrap.vue';

export default {
    components: {
        Account,
        Wrap,
    },
    data() {
        return {
            step: 0,
            accountId: '',
        };
    },
    mounted() {
        //
    },
    methods: {
        next(accountId) {
            this.step = 1;
            this.accountId = accountId;
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
        padding: 80px 25%;
        flex-grow: 1;
        // background: url(./bg.png) no-repeat;
        // background-size: cover;
        // background-color: #3e78ed;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        position: relative;
        display: flex;
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
