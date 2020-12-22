const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

export const asyncRouterMap = [
    {
        path: '/',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/base/rac-domain',
        children: [
            {
                path: 'base',
                meta: { title: '基础配置', keepAlive: true },
                component: RouteView,
                redirect: '/base/rac-domain',
                children: [
                    {
                        path: 'rac-domain',
                        component: () => import('@/view/base/domain/List.vue'),
                        meta: { title: '领域管理', keepAlive: true },
                    },
                ],
            },
        ],
    },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/sign-in',
        component: () => import('@/view/sign-in/SignIn.vue'),
    },
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];
