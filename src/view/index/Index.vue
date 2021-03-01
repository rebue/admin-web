<template>
    <pro-layout
        :siderWidth="230"
        :menus="accountStore.menus"
        :collapsed="settingStore.slideSideCollapsed"
        :theme="theme"
        :layout="layout"
        :mediaQuery="query"
        :isMobile="isMobile"
        :handleMediaQuery="handleMediaQuery"
        :handleCollapse="handleCollapse"
        :i18nRender="i18nRender"
    >
        <template #menuHeaderRender>
            <div>
                <img src="@/asset/logo.png" />
                <h1>{{ logoTitle }}</h1>
            </div>
        </template>
        <template #collapsedButtonRender>
            <div>
                <h1>{{ title }}</h1>
            </div>
        </template>
        <template #rightContentRender>
            <div
                :class="[
                    'ant-pro-global-header-index-right',
                    layout === 'topmenu' && `ant-pro-global-header-index-${theme}`,
                ]"
            >
                rightContentRender
            </div>
        </template>
        <template #footerRender>
            <div>footerRender</div>
        </template>
        <setting-drawer :settings="settings" @change="handleSettingChange"> </setting-drawer>
        <router-view />
    </pro-layout>
</template>

<script>
import { observer } from 'mobx-vue';
import { getSysId } from '@/util/cookie';
import ProLayout, { SettingDrawer } from '@ant-design-vue/pro-layout';
import { i18nRender } from '@/locale';
import defaultSettings from '@/config/defaultSettings';
import { accountStore, settingStore } from '@/store/Store';
import { racMenuAction, settingAction } from '@/action/Action';
import { SysIdDic } from '@/dic/SysIdDic';

export default observer({
    name: 'Index',
    data() {
        const sysId = getSysId();
        if (sysId === SysIdDic.PlatformAdminWeb) this.logoTitle = '平台管理';
        else if (sysId === SysIdDic.OpsAdminWeb) this.logoTitle = '运营管理';
        return {
            accountStore,
            settingStore,
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
    computed: {
        title() {
            return this.$route.meta.title;
        },
    },
    mounted() {
        racMenuAction.refreshAccountInfo();
    },
    methods: {
        i18nRender,
        handleMediaQuery(query) {
            this.query = query;
            if (this.isMobile && !query['screen-xs']) {
                this.isMobile = false;
                return;
            }
            if (!this.isMobile && query['screen-xs']) {
                this.isMobile = true;
                settingAction.setSlideSideCollapsed(false);
            }
        },
        handleCollapse() {
            settingAction.toggleSlideSideCollapsed();
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
<style lang="less">
@import './Index.less';
</style>
