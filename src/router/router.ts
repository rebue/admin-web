import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouters } from '@/config/router.config';
import { hasJwtToken, hasAuthInfo, getAuthInfo } from '@/util/cookie';
import { Modal } from 'ant-design-vue';
import { oapOidcApi } from '@/api/oap/OapOidcApi';
import { getAppIdByUrl } from '@/util/common';
import { AppIdDic } from '@/dic/AppIdDic';
import { AppDic } from '@/dic/AppDic';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_PUBLIC_PATH,
    routes: constantRouters,
    /**
     * 当切换到新路由时，页面滚到的行为
     * 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
     */
    scrollBehavior(to, from, savedPosition) {
        // 在按下 后退/前进 按钮时，返回之前保存的位置
        if (savedPosition) {
            return savedPosition;
        }

        // 简单地让页面滚动到顶部
        return { x: 0, y: 0 };
    },
});

/** 替换原始的push(原始的push如果是重复触发了同一个路由，会报NavigationDuplicated异常) */
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//     // @ts-ignore
//     return originalPush.call(this, location).catch(err => err);
// };

/**类第三方对接统一认证 */
const oidc = async function(next) {
    //走认证流程
    //通过认证，后端设置cookie clientId
    //第一步 获取认证
    //应用认证里自动生成的clientId, 以下三个默认写库,前端配置在AppDic中
    // unified-auth, platform-admin-web, ops-admin-web
    try {
        const clientId = sessionStorage.getItem('auth_info_clientId');
        // auth_info_clientId 用于标记扫码登录的是哪个系统
        sessionStorage.setItem('auth_info_clientId', clientId || '');
        const { result, detail } = await oapOidcApi.getOidcOauthUri(clientId, {
            // redirectUri: encodeURIComponent(`http://172.20.11.244:13080/orp-svr/orp/callback`),
            redirectUri: encodeURIComponent(`${location.origin}/orp-svr/orp/auth-code/oidc/${clientId}`),
        });
        if (result > 0) {
            //第二步 请求认证
            next && next(false);
            window.location.replace(detail);
            return;
        } else {
            next && next(false);
            return;
        }
    } catch {
        next && next(false);
        return;
    }
};

/** 不检查JWT Token的路径列表 */
const uncheckJwtTokenPaths = [
    '/platform-admin-web/sign-in',
    '/ops-admin-web/sign-in',
    '/unified-auth/sign-in',
    '/scanTransfer',
    '/platform-admin-web/forget-password',
    '/ops-admin-web/forget-password',
    '/unified-auth/forget-password',

    '/404',
    '/unifiedLogin',
    '/demo',

    '/launch-demo',
];
/**
 * 路由跳转前置钩子
 */
router.beforeEach(async (to, from, next) => {
    console.log('beforeEach: to, from, next');
    console.log('to', to);
    console.log('from', from);
    console.log('next', next);

    // 处理路由前进、后退不能销毁确认对话框的问题
    Modal.destroyAll();

    /**
     * 输入登录路径访问统一登录页，帐密登录报“未找到session信息”：
     * 无auth_info cookie，需要走认证拿到cookie， 该cookie在帐密登录需要，表示将要登录的应用
     */
    if (to.path.startsWith('/unified-auth/sign-in/')) {
        if (!hasAuthInfo()) {
            //通过认证，后端设置cookie clientId
            //第一步 获取认证
            // unified-auth, platform-admin-web, uiapcee071fc86a0003
            if (sessionStorage.getItem('auth_info_clientId')) {
                // 统一登录页cookie：auth_info失效，走oidc重新生成cookie：auth_info
                return oidc(next);
            } else {
                // 直接访问登录页，cookie：auth_info未生成
                sessionStorage.setItem('auth_info_clientId', AppDic.getClientId(AppIdDic.UnifiedAuth));
                return oidc(next);
            }
        } else {
            // 跳转到登录页cookie：auth_info已生成，或者登录页刷新
            sessionStorage.setItem('auth_info_clientId', JSON.parse(window.atob(getAuthInfo())).clientId);
            next();
            return;
        }
    }

    //白名单免登录
    if (uncheckJwtTokenPaths.find(path => to.path.startsWith(path))) {
        next();
        return;
    } else {
        //需登录
        //如果没有JWT Token，说明未登录或登录过期，应跳转到登录页面
        if (!hasJwtToken()) {
            const appId = getAppIdByUrl();
            if (process.env.VUE_APP_LOGIN_BY_OIDC === 'true') {
                sessionStorage.setItem('auth_info_clientId', AppDic.getClientId(appId));
                return oidc(next);
            } else {
                if (appId === AppIdDic.PlatformAdminWeb) {
                    next(`/${appId}/sign-in`);
                    return;
                } else if (appId === AppIdDic.OpsAdminWeb) {
                    next(`/${appId}/sign-in`);
                    return;
                }
            }
        } else {
            //已登录
            sessionStorage.removeItem('auth_info_clientId');
            next();
            return;
        }
    }
});

export default router;
