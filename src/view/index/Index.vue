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
                    <el-dropdown @command="handleAccountCommand">
                        <a>
                            <a-avatar
                                size="large"
                                :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                                :src="accountStore.avatar ? accountStore.avatar : undefined"
                            />
                            <ellipsis :length="50" tooltip>
                                {{ accountStore.nickname }}
                            </ellipsis>
                        </a>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="PersonCenter">
                                <a-icon type="user" /> 个人中心
                            </el-dropdown-item>
                            <el-dropdown-item command="UploadAvatar">
                                <a-icon type="smile" /> 上传头像
                            </el-dropdown-item>
                            <el-dropdown-item command="ChangePswd"> <a-icon type="key" /> 修改密码 </el-dropdown-item>
                            <el-dropdown-item command="SignOut" divided>
                                <a-icon type="logout" /> 退出系统
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
import { Ellipsis } from '@/component/ant-design-pro';
import { i18nRender } from '@/locale';
import defaultSettings from '@/config/defaultSettings';
import { accountStore, settingStore } from '@/store/Store';
import { racMenuAction, settingAction } from '@/action/Action';
import { SysIdDic } from '@/dic/SysIdDic';
import { removeJwtToken } from '@/util/cookie';
import { racAgentSignOutApi } from '@/api/Api';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';

export default observer({
    name: 'Index',
    components: {
        ProLayout,
        Ellipsis,
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
        /** 处理退出代理登录 */
        handleAgentSignOut() {
            racAgentSignOutApi
                .signOut()
                .then(ro => (window.location.href = ro.extra.urlBeforeAgent))
                .finally(() => (this.loading = false));
        },
        /** 处理账户的几个命令 */
        handleAccountCommand(command) {
            switch (command) {
                /** 个人中心 */
                case 'PersonCenter':
                    this.$router.push({ path: '/person-center' });
                    break;
                /** 上传头像 */
                case 'UploadAvatar':
                    this.showImageUploader = true;
                    break;
                /** 修改密码 */
                case 'ChangePswd':
                    break;
                /**退出系统 */
                case 'SignOut':
                    this.$confirm({
                        title: '提示',
                        content: '你确定要退出系统吗?',
                        maskClosable: true,
                        onOk: () => {
                            removeJwtToken();
                            this.$router.push({ path: '/sign-in' });
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
.title {
    display: flex;
    align-items: center;
}
.ant-pro-global-header-index-right {
    display: flex;
    align-items: center;
}
</style>
