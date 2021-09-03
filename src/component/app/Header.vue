<template>
  <header class="po-f w100 card-shadow header">
    <div class="flex-box al-c header-main">
      <router-link class="white router-index" to="/app">
        <div class="font-26">统一身份认证平台</div>
        <div class="font-12">UNIFIED AUTHENTICATION PLATFORM</div>
      </router-link>
      <div class="ml20 mr20 flex-1 flex-box header-nav">
        <div class="flex-box al-c ju-c" v-for="(item, index) in linkData" :key="index">
          <router-link class="font-16 white in-block header-nav-item" :to="item.path"> {{ item.name }}</router-link>
        </div>
      </div>
      <div class="header-user">
          <img :src="require('../../view/app/assets/img/logout.png')" @click="logout"/>
      </div>
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
    methods: {
        logout(){
            //请求登出接口
        }
    },
};
</script>

<style scoped lang="less">
.header {
    height: 77px;
    background: #3A69C9;
    top: 0;
    left: 0;
    z-index: 60;
    .header-main {
        margin: 0 auto;
        width: 80%;
        height: 77px;
        .router-index:hover {
            color:#fff;
        }
        .header-nav {
            margin-left: 180px;
        }
        .header-nav-item {
            padding: 5px 24px;
            margin-right: 60px;
            border-radius: 24px;
        }
        .header-nav-item:hover {
            color: #ffffff;
            background: #2752AA
        }
        .header-nav-item.router-link-active {
            background: #2752AA
        }

        .header-user {
            // width: 300px;
        }
    }
}
</style>
