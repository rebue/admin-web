import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouters } from '@/config/router.config';
import { hasJwtToken } from '@/util/cookie';
import { Modal } from 'ant-design-vue';

// import { racVerifitionApi } from '@/api/Api';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: constantRouters,
    // mode: "history",
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
const uncheckJwtTokenPaths = ['/sign-in', '/unifiedLogin', '/demo'];
/**
 * 路由跳转前置钩子
 */
router.beforeEach(async (to, from, next) => {
    console.log('beforeEach: to, from, next');
    console.log('to', to);
    console.log('from', from);
    console.log('next', next);

    // if (from.name === null && to.query.code && to.query.state) {
    //     const params = {
    //         code: to.query.code,
    //         redirectUri: window.localStorage.getItem("fullPath")
    //     };
    //     // const { extra } =
    //     await racVerifitionApi.reqGetTokenFromCode(params);
    //     // window.sessionStorage.setItem("jwt_token", String(extra));
    // }

    // 处理路由前进、后退不能销毁确认对话框的问题
    Modal.destroyAll();

    // 如果没有JWT Token，说明未登录或登录过期，应跳转到登录页面
    if (!uncheckJwtTokenPaths.find(item => to.path.startsWith(item)) && !hasJwtToken()) {
        console.log('需要登录');
        next(`/sign-in?redirect=${to.path}`);
        // const fullPath = encodeURIComponent(window.location.href);
        // if (fullPath.indexOf("code=") === -1) {
        //     window.localStorage.setItem("fullPath", window.location.href);
        // }
        // window.location.replace(`${process.env.VUE_APP_AUTH_URL}${fullPath}`);
        // return;
    }

    next();
});

export default router;
