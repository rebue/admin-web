<template>
    <pro-layout
        :menus="menus"
        :collapsed="collapsed"
        :theme="theme"
        :layout="layout"
        :contentWidth="contentWidth"
        :auto-hide-header="autoHideHeader"
        :mediaQuery="query"
        :isMobile="isMobile"
        :handleMediaQuery="handleMediaQuery"
        :handleCollapse="handleCollapse"
    >
        <template v-slot:menuHeaderRender>
            <div>
                <img src="@/asset/logo.png" />
                <h1>Rebue Admin</h1>
            </div>
        </template>
        <template v-slot:rightContentRender>
            <div
                :class="[
                    'ant-pro-global-header-index-right',
                    layout === 'topmenu' && `ant-pro-global-header-index-${theme}`,
                ]"
            >
                rightContentRender
            </div>
        </template>
        <template v-slot:footerRender>
            <div>footerRender</div>
        </template>
        <router-view />
    </pro-layout>
</template>

<script>
// by template
import Vue from 'vue';
import ProLayout from '@ant-design-vue/pro-layout';

Vue.use(ProLayout);

import { asyncRouterMap } from '@/router/router.config';

export default {
    name: 'BasicLayout',
    data() {
        return {
            menus: [],
            collapsed: false,
            autoHideHeader: false,
            query: {},
            layout: 'sidemenu',
            contentWidth: 'Fluid',
            theme: 'dark',
            isMobile: false,
        };
    },
    created() {
        this.menus = asyncRouterMap.find(item => item.path === '/').children;
    },
    methods: {
        handleMediaQuery(query) {
            this.query = query;
            if (this.isMobile && !query['screen-xs']) {
                this.isMobile = false;
                return;
            }
            if (!this.isMobile && query['screen-xs']) {
                this.isMobile = true;
                this.collapsed = false;
            }
        },
        handleCollapse(collapsed) {
            this.collapsed = collapsed;
        },
    },
    components: {
        // SettingDrawer,
    },
};
</script>
