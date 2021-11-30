const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo2',
    name: 'launch-demo2',
    meta: { title: '系统2', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo2/index/Index.vue'),
    redirect: '/launch-demo2/framework/department',
    children: [],
};

export default constantRouters;
