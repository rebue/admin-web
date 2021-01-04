<template>
    <pro-layout
        :menus="menus"
        :collapsed="collapsed"
        :theme="theme"
        :layout="layout"
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
        <setting-drawer :settings="settings" @change="handleSettingChange"> </setting-drawer>
        <router-view />
    </pro-layout>
</template>

<script>
// by template
import { observer } from 'mobx-vue';
import ProLayout, { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout';
import defaultSettings from '@/config/defaultSettings';
import { userStore } from '@/store/Store';

// Vue.use(ProLayout);

export default observer({
    name: 'Index',
    data() {
        return {
            menus: userStore.menus,
            // 侧栏是否收起为图标的状态
            collapsed: false,
            query: {},
            layout: 'sidemenu',
            theme: 'dark',
            isMobile: true,
            settings: {
                // 布局类型
                layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
                // CONTENT_WIDTH_TYPE
                contentWidth: defaultSettings.layout === 'sidemenu' ? 'Fluid' : defaultSettings.contentWidth,
                // 主题 'dark' | 'light'
                theme: defaultSettings.navTheme,
                // 主色调
                primaryColor: defaultSettings.primaryColor,
                fixedHeader: defaultSettings.fixedHeader,
                fixSiderbar: defaultSettings.fixSiderbar,
                colorWeak: defaultSettings.colorWeak,

                hideHintAlert: false,
                hideCopyButton: false,
            },
        };
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
        handleSettingChange({ type, value }) {
            console.log('type', type, value);
            type && (this.settings[type] = value);
            switch (type) {
                case 'contentWidth':
                    this.settings[type] = value;
                    break;
                case 'layout':
                    if (value === 'sidemenu') {
                        this.settings.contentWidth = 'Fluid';
                    } else {
                        this.settings.fixSiderbar = false;
                        this.settings.contentWidth = 'Fixed';
                    }
                    break;
            }
        },
    },
    components: {
        ProLayout,
        SettingDrawer,
    },
});
</script>
