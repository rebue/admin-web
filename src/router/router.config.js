const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouters = [
    {
        path: '/sign-in',
        component: () => import('@/view/sign-in/SignIn.vue'),
    },
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    {
        path: '/',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/base/rac-domain',
        children: [
            {
                path: 'base',
                meta: { title: '基础配置', keepAlive: true, icon: 'setting' },
                component: RouteView,
                hidden: true,
                redirect: '/base/rac-domain',
                children: [
                    {
                        path: 'rac-domain',
                        component: () => import('@/view/base/domain/List.vue'),
                        hidden: true,
                        meta: { title: '领域', keepAlive: true, icon: 'global' },
                    },
                ],
            },
        ],
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];
