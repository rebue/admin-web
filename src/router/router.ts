import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        component: () => import('@/view/login/login.vue'),
    },
    {
        path: '/',
        component: () => import('@/view/home/home.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
