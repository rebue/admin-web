import Vue from 'vue';
import VueRouter from 'vue-router';
import { constantRouterMap } from '@/router/router.config';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: constantRouterMap,
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

export default router;
