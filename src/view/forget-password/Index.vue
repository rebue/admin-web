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

            <!-- 身份认证 -->
            <!-- 设置新密码 -->
            <!-- 完成 -->
        </div>
        <div class="footer">桂ICP备08001078号-2</div>
    </div>
</template>
<script>
import { getAppIdByUrl } from '@/util/common';
export default {
    data() {
        return {
            //
        };
    },
    mounted() {
        //
    },
    methods: {
        //
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
        flex-grow: 1;
        // background: url(./bg.png) no-repeat;
        // background-size: cover;
        // background-color: #3e78ed;
        border-top: 1px solid #ededed;
        border-bottom: 1px solid #ededed;
        position: relative;
        display: flex;
        // justify-content: space-between;
        // align-items: center;
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
