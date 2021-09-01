<template>
  <header class="po-f w100 card-shadow header">
    <div class="flex-box al-c header-main">
      <router-link class="white" to="/app">
        <div class="font-28">统一身份认证平台</div>
        <div class="font-12">UNIFIED AUTHENTICATION PLATFORM</div>
      </router-link>
      <div class="ml20 mr20 flex-1 flex-box">
        <div class="flex-1 flex-box al-c ju-c" v-for="(item, index) in linkData" :key="index">
          <router-link class="font-16 white in-block header-nav-item" :to="item.path"> {{ item.name }}</router-link>
        </div>
      </div>
      <div class="header-user"></div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
    name: 'app-header',
    components: {},
    props: {},
    data() {
        return {
            linkData: [
                {
                    name: '我的应用',
                    path: '/app/index',
                },
                {
                    name: '个人中心',
                    path: '/app/mine',
                },
                {
                    name: '关联认证',
                    path: '/app/auth',
                },
                {
                    name: '操作日志',
                    path: '/app/log',
                },
            ],
        };
    },
    watch: {},
    methods: {},
};
</script>

<style scoped lang="less">
.header {
    height: 77px;
    background: rgba(24, 36, 51, 1);
    top: 0;
    left: 0;
    z-index: 60;

    .header-main {
        margin: 0 auto;
        width: 1400px;
        height: 77px;

        .header-nav-item {
            padding: 8px 24px;
            border-radius: 24px;
        }
        .header-nav-item:hover {
            color: #ffffff;
            background: rgba(84, 151, 231, 1);
        }
        .header-nav-item.router-link-active {
            background: rgba(84, 151, 231, 1);
        }

        .header-user {
            width: 300px;
        }
    }
}
</style>
