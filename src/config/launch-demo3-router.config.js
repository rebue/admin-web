const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo3',
    name: 'launch-demo3',
    component: RouteView,
    redirect: '/launch-demo3/framework/department',
    children: [
        {
            path: '/launch-demo3/framework/department',
            name: 'launch-demo3-framework-department',
            component: () => import('@/view/launch-demo3/personal-profile-table.vue'),
            hidden: true,
            meta: { title: '测试表格', keepAlive: true, icon: 'global' },
        },
    ],
};

export default constantRouters;
