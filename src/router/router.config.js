const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

export const asyncRouterMap = [
    {
        path: '/login',
        component: () => import('@/view/login/Login.vue'),
    },
    {
        path: '/',
        component: () => import('@/view/index/Index.vue'),
        children: [
            {
                meta: { title: '基础配置', keepAlive: true },
                children: [
                    {
                        path: '/rac-domain',
                        component: () => import('@/view/base/domain/List.vue'),
                        meta: { title: '领域管理', keepAlive: true },
                    },
                ],
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [];
