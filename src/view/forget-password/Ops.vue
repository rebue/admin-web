<template>
    <div class="body">
        <div class="header">
            <img :src="require('@client/images/logo.png')" alt="" class="logo" :class="`${clientConfig.id}-logo`" />
            <div class="divider"></div>
            <div class="title-wrap">
                <div class="title">运营管理</div>
                <div class="sub-title">OPERATION MANAGEMENT</div>
            </div>
        </div>
        <Main class="main" />
        <div class="footer">
            <template v-if="clientConfig.id === 'default'">
                桂ICP备08001078号-2
            </template>
            <template v-else>
                <p>{{ clientConfig.name }}版权所有</p>
                <p>由南宁迈越提供技术支持</p>
            </template>
        </div>
    </div>
</template>
<script>
import Main from './Main.vue';
import clientConfig from '@client/config';

export default {
    components: {
        Main,
    },
    data() {
        return {
            clientConfig,
        };
    },
};
</script>

<style lang="less" scoped>
.body {
    min-width: 1300px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background-color: #fff;
    .header {
        height: 70px;
        margin: 20px 0;
        font-size: 24px;
        display: flex;
        align-items: flex-end;
        color: #000;
        .logo {
            // max-width: 207px;
            height: 78px;
            margin-left: 55px;
        }
        .nnxy-logo {
            height: 60px;
        }
        .fangchenggang-logo {
            height: 80px;
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
        padding: 15px 0;
        text-align: center;
        vertical-align: middle;
        color: #a2a1a1;
        font-size: 14px;
        p {
            margin: 0;
            padding: 0;
        }
    }
}
</style>
