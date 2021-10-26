import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouters } from '@/config/router.config';
import { hasJwtToken, hasAuthInfo } from '@/util/cookie';
import { Modal } from 'ant-design-vue';
import { oapOidcApi } from '@/api/Api';

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

/** 不检查JWT Token的路径列表 */
const uncheckJwtTokenPaths = [
    '/platform-admin-web/sign-in/',
    '/ops-admin-web/sign-in/',
    '/unified-auth/sign-in/',
    '/scanTransfer',
    '/unified-auth/forget-password',
    '/404',
    '/unifiedLogin',
    '/demo',
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
     * 输入路径访问统一登录页，帐密登录报“未找到session信息”：
     * 无auth_info cookie，需要走认证拿到cookie， 该cookie在帐密登录需要，表示将要登录的应用
     */
    if (to.path.startsWith('/unified-auth/sign-in/')) {
        if (!hasAuthInfo()) {
            //通过认证，后端设置cookie clientId
            //第一步 获取认证
            const { result, detail } = await oapOidcApi.getOidcOauthUri({
                redirectUri: '本应用不用加 测试',
            });
            if (result > 0) {
                //第二步 请求认证
                window.location.replace(detail);
                return;
            } else {
                next(false);
                return;
            }
        } else {
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
            // ???走认证vs走自己登录页
            //------start
            //通过认证，后端设置cookie clientId
            //第一步 获取认证
            const { result, detail } = await oapOidcApi.getOidcOauthUri({
                redirectUri: '本应用不用加 测试',
            });
            if (result > 0) {
                //第二步 请求认证
                window.location.replace(detail);
                return;
            } else {
                next(false);
                return;
            }
        } else {
            //已登录
            next();
            return;
        }
    }
});

export default router;
