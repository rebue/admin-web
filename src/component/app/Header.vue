<template>
    <header class="w100 card-shadow header">
        <div class="flex-box al-c header-main">
        <router-link class="white router-index" to="/app">
            <div class="font-26">统一身份认证平台</div>
            <div class="font-12">UNIFIED AUTHENTICATION PLATFORM</div>
        </router-link>
        <div class="ml20 mr20 flex-1 flex-box header-nav">
            <div class="flex-1 nav-wrap" v-for="(item, index) in linkData" :key="index">
            <router-link class="font-16 white in-block header-nav-item" :to="item.path"> {{ item.name }}</router-link>
            </div>
        </div>
        <div class="header-user">
            <a-popconfirm title="确定要退出吗?" @confirm="() => logout()" ok-text="确定" cancel-text="取消">
                <img :src="require('../../view/app/assets/img/logout.png')" style="cursor:pointer"/>
            </a-popconfirm>
        </div>
        </div>
    </header>
</template>

<script >
import { removeJwtToken } from '@/util/cookie';
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
                // {
                //     name: '个人中心',
                //     path: '/app/person-center',
                // },
                {
                    name: '安全中心',
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
            //退出清除cookie jwt_token
            removeJwtToken()
            window.location.reload()
        }
    },
};
</script>

<style scoped lang="less">
.header {
    height: 77px;
    background: #3A69C9;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 60;
    .header-main {
        margin: 0 auto;
        width: 80%;
        height: 77px;
        .router-index {
            min-width: 222px;
        }
        .router-index:hover {
            color:#fff;
        }
        .nav-wrap {
            max-width: 172px;
        }
        .header-nav {
            margin-left: 180px;
            min-width: 450px;
        }
        .header-nav-item {
            padding: 5px 24px;
            border-radius: 24px;
            flex: 1;
        }
        .header-nav-item:hover {
            color: #ffffff;
            background: #2752AA
        }
        .header-nav-item.router-link-active {
            background: #2752AA
        }
    }
}
</style>
