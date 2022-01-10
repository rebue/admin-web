<template>
    <div class="layout">
        <ifLoginPass />
        <Header class="header" />
        <div class="main">
            <div class="contain">
                <router-view />
            </div>
            <div class="footer">技术支持 迈越公司版权所有 @ 2021</div>
        </div>
    </div>
</template>

<script>
import Header from '@/component/app/Header.vue';
import ifLoginPass from '@/component/app/ifLoginPass.vue';
import CookiePolling from '@/component/rebue/CookiePolling';
export default {
    extends: {
        ...CookiePolling,
    },
    name: 'app',
    components: { Header, ifLoginPass },
    props: {},
    data() {
        return {};
    },
    watch: {},
    methods: {},
    mounted() {
        //
    },
};
</script>

<style src="./base.css"></style>
<style scoped lang="less">
.layout {
    height: 100%;
    overflow: hidden;
    min-width: 1080px;
    padding-top: 1px;
    background: url(./assets/img/mainbg.png) no-repeat;
    background-size: cover;
}

.main {
    display: flex;
    flex-direction: column;
    .page {
        display: flex;
        width: 100%;
    }
}
.header + .main {
    // margin-top: 77px;
    height: calc(100vh - 77px);
    overflow: scroll;
    padding-top: 20px;
}
.contain {
    width: 80%;
    margin: 0 auto;
    padding: 18px 0;
    flex: 1;
}
.footer {
    height: 34px;
    line-height: 34px;
    background: #2d59b3;
    color: #fff;
    text-align: center;
}
</style>
