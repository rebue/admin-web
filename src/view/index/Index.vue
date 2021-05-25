<template>
    <fragment>
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
                    <a-dropdown>
                        <a>
                            <a-avatar
                                size="large"
                                :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                                :src="accountStore.avatar ? accountStore.avatar : undefined"
                            />
                            {{ accountStore.nickname }}</a
                        >
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a @click="handleUploadAvatar"><a-icon type="user" /> 上传头像</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="handleChangePswd"><a-icon type="key" /> 修改密码</a>
                            </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item>
                                <a @click="handleSignOut"><a-icon type="logout" /> 退出系统</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </template>
            <template #footerRender>
                <div>&copy; Rebue</div>
            </template>
            <setting-drawer :settings="settings" @change="handleSettingChange"> </setting-drawer>
            <router-view />
        </pro-layout>
        <image-uploader
            v-model="showImageUploader"
            :width="180"
            :height="180"
            :noRotate="false"
            url="/rac/account/upload-avatar"
            @crop-upload-success="handleCropUploadSuccess"
            @crop-upload-fail="handleCropUploadFail"
        />
    </fragment>
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
import { removeJwtToken } from '@/util/cookie';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';

export default observer({
    name: 'Index',
    components: {
        ProLayout,
        SettingDrawer,
        ImageUploader,
    },
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
            showImageUploader: false,
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
        /** 上传头像 */
        handleUploadAvatar() {
            this.showImageUploader = true;
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        handleCropUploadSuccess(jsonData, field) {
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
            racMenuAction.refreshAccountInfo();
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        handleCropUploadFail(status, field) {
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        },
        /** 修改密码 */
        handleChangePswd() {
            //
        },
        /**退出系统 */
        handleSignOut() {
            this.$confirm({
                title: '提示',
                content: '你确定要退出系统吗?',
                maskClosable: true,
                onOk: () => {
                    removeJwtToken();
                    this.$router.push({ path: '/sign-in' });
                },
            });
        },
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
});
</script>
<style lang="less">
@import './Index.less';
</style>
