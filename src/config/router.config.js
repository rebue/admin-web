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
        name: 'index',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/base/rac-domain',
        children: [
            {
                path: '/base',
                name: 'base',
                meta: { title: '基础配置', keepAlive: true, icon: 'setting' },
                component: RouteView,
                hidden: true,
                redirect: '/base/rac-domain',
                children: [
                    {
                        path: '/base/rac-domain',
                        name: 'rac-domain',
                        component: () => import('@/view/rac/rac-domain/Manager.vue'),
                        hidden: true,
                        meta: { title: '领域', keepAlive: true, icon: 'global' },
                    },
                    {
                        path: '/base/rac-sys',
                        name: 'rac-sys',
                        component: () => import('@/view/rac/rac-sys/Manager.vue'),
                        hidden: true,
                        meta: { title: '系统', keepAlive: true, icon: 'appstore' },
                    },
                    {
                        path: '/base/rac-perm',
                        name: 'rac-perm',
                        component: () => import('@/view/rac/rac-perm/Manager.vue'),
                        hidden: true,
                        meta: { title: '权限', keepAlive: true, icon: 'deployment-unit' },
                    },
                    {
                        path: '/base/rac-role',
                        name: 'rac-role',
                        component: () => import('@/view/rac/rac-role/Manager.vue'),
                        hidden: true,
                        meta: { title: '角色', keepAlive: true, icon: 'smile' },
                    },
                ],
            },
            {
                path: '/user',
                name: 'user',
                meta: { title: '用户中心', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/user/rac-account',
                children: [
                    {
                        path: '/user/rac-org',
                        name: 'rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/user/rac-account',
                        name: 'rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                ],
            },
        ],
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];
