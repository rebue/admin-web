const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo1',
    name: 'launch-demo1',
    meta: { title: '系统1', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo1/index/Index.vue'),
    redirect: '/launch-demo1/framework/department',
    children: [
        {
            path: '/launch-demo1/framework',
            name: 'launch-demo1-framework',
            component: RouteView,
            hidden: true,
            meta: { title: '系统框架', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/framework/department',
                    name: 'launch-demo1-framework-department',
                    component: () => import('@/view/launch-demo1/framework/department/Index.vue'),
                    hidden: true,
                    meta: { title: '工作量管理部门', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
