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
            <template #headerContentRender>
                <div>
                    <a-space class="title">
                        <h1>
                            {{ title }}
                        </h1>
                        <a-tooltip placement="bottom" title="打开新页面">
                            <router-link tag="a" target="_blank" :to="$route.path">
                                <a-icon type="plus-circle" :style="{ fontSize: '24px' }" />
                            </router-link>
                        </a-tooltip>
                    </a-space>
                </div>
            </template>
            <template #rightContentRender>
                <a-space
                    :class="[
                        'ant-pro-global-header-index-right',
                        layout === 'topmenu' && `ant-pro-global-header-index-${theme}`,
                    ]"
                >
                    <a-popover v-if="accountStore.agentAccountId" placement="bottom">
                        <a-avatar size="large" src="/img/account/agent.png" />
                        <template slot="title">
                            <div>
                                <a-avatar
                                    size="large"
                                    :icon="accountStore.agentAavatar ? accountStore.agentAavatar : 'user'"
                                    :src="accountStore.agentAvatar ? accountStore.agentAvatar : undefined"
                                />
                                {{ accountStore.agentNickname }}
                            </div>
                        </template>
                        <template slot="content">
                            <a @click="handleAgentSignOut"> <a-icon type="logout" /> 退出代理 </a>
                        </template>
                    </a-popover>
                    <a-dropdown>
                        <div style="min-width:10em">
                            <a-avatar
                                size="large"
                                :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                                :src="accountStore.avatar ? accountStore.avatar : undefined"
                            />
                            <a>
                                <ellipsis :length="50" tooltip>
                                    {{ accountStore.nickname }}
                                </ellipsis>
                            </a>
                        </div>
                        <a-menu slot="overlay" @click="handleAccountCommand">
                            <a-menu-item key="PersonCenter"> <a-icon type="user" /> 个人中心 </a-menu-item>
                            <a-menu-item key="UploadAvatar"> <a-icon type="smile" /> 上传头像 </a-menu-item>
                            <a-menu-item key="ChangePswd"> <a-icon type="key" /> 修改密码 </a-menu-item>
                            <a-menu-divider />
                            <a-menu-item key="SignOut"> <a-icon type="logout" /> 退出应用 </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-space>
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
            :headers="{ 'App-Id': getAppIdByUrl() }"
            url="/rac-svr/rac/account/upload-avatar"
            @crop-upload-success="handleCropUploadSuccess"
            @crop-upload-fail="handleCropUploadFail"
        />
        <change-pswd-form
            :record="accountStore.accountId"
            :visible.sync="changePswdFormVisible"
            @close="refreshAccountInfo"
        />
        <ifLoginPass />
    </fragment>
</template>

<script>
import { observer } from 'mobx-vue';
import ProLayout, { SettingDrawer } from '@ant-design-vue/pro-layout';
import { Ellipsis } from '@/component/ant-design-pro';
import { i18nRender } from '@/locale';
import defaultSettings from '@/config/defaultSettings';
import { accountStore, settingStore } from '@/store/Store';
import { racMenuAction, settingAction } from '@/action/Action';
import { AppIdDic } from '@/dic/AppIdDic';
import { removeJwtToken } from '@/util/cookie';
import { racAgentSignOutApi } from '@/api/Api';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';
import ChangePswdForm from '@/view/app/security-center/ChangePswdForm.vue';
import ifLoginPass from '@/component/app/ifLoginPass.vue';
import { getAppIdByUrl } from '@/util/common';
import CookiePolling from '@/component/rebue/CookiePolling';

export default observer({
    extends: {
        ...CookiePolling,
    },
    name: 'Index',
    components: {
        ProLayout,
        Ellipsis,
        SettingDrawer,
        ImageUploader,
        ChangePswdForm,
        ifLoginPass,
    },
    data() {
        const appId = getAppIdByUrl();
        if (appId === AppIdDic.PlatformAdminWeb) this.logoTitle = '平台管理';
        else if (appId === AppIdDic.OpsAdminWeb) this.logoTitle = '运营管理';
        else {
            this.logoTitle = '';
        }
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
            changePswdFormVisible: false,
        };
    },
    computed: {
        title() {
            return this.$route.meta.title;
        },
    },
    mounted() {
        //
    },
    methods: {
        getAppIdByUrl() {
            return getAppIdByUrl();
        },
        i18nRender,
        /** 处理退出代理登录 */
        handleAgentSignOut() {
            racAgentSignOutApi
                .signOut()
                .then(ro => (window.location.href = ro.extra.urlBeforeAgent))
                .finally(() => (this.loading = false));
        },
        /** 处理账户的几个命令 */
        handleAccountCommand({ key }) {
            switch (key) {
                /** 个人中心 */
                case 'PersonCenter':
                    this.$router.push({ path: `/${getAppIdByUrl()}/person-center` });
                    break;
                /** 上传头像 */
                case 'UploadAvatar':
                    this.showImageUploader = true;
                    break;
                /** 修改密码 */
                case 'ChangePswd':
                    this.changePswdFormVisible = true;
                    break;
                /**退出应用 */
                case 'SignOut':
                    this.$confirm({
                        title: '提示',
                        content: '你确定要退出应用吗?',
                        maskClosable: true,
                        onOk: () => {
                            //当前标签页是被a标签，_blank或者window.open的方式打开，window.close才生效。
                            //是从统一应用系统a标签，_blank过来的，可以直接window.close关闭标签页
                            window.close();

                            // 其他情况，如通过平台/运营登录页登录，360能关闭当前标签页。火狐 safai, chrome只是替换了成了空白页
                            const myWindow = window.open('about:blank', '_self', '', true).close();
                        },
                    });
                    break;
                default:
                    break;
            }
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
            this.refreshAccountInfo();
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
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
    },
});
</script>
<style lang="less">
@import './Index.less';
.title {
    display: flex;
    align-items: center;
}
.ant-pro-global-header-index-right {
    display: flex;
    align-items: center;
}
</style>
<style>
.ant-pro-basicLayout-children-content-wrap {
    height: 100%;
}
.ant-pro-grid-content {
    height: 100%;
}
.ant-pro-grid-content > div {
    height: 100%;
}
</style>
