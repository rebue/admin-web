const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo7',
    name: 'launch-demo7',
    meta: { title: '系统4', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo7/index/Index.vue'),
    redirect: '/launch-demo7/framework/department',
    children: [
        {
            path: '/launch-demo7/framework',
            name: 'launch-demo7-framework',
            component: RouteView,
            hidden: true,
            meta: { title: '系统框架', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo7/framework/department',
                    name: 'launch-demo7-framework-department',
                    component: () => import('@/view/launch-demo7/framework/department/Index.vue'),
                    hidden: true,
                    meta: { title: '工作量部门管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo7/framework/year',
                    name: 'launch-demo7-framework-year',
                    component: () => import('@/view/launch-demo7/framework/year/Index.vue'),
                    hidden: true,
                    meta: { title: '工作量年份管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo7/framework/flow',
                    name: 'launch-demo7-framework-flow',
                    component: () => import('@/view/launch-demo7/framework/flow/Index.vue'),
                    hidden: true,
                    meta: { title: '工作量流程管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo7/framework/type',
                    name: 'launch-demo7-framework-type',
                    component: () => import('@/view/launch-demo7/framework/type/Index.vue'),
                    hidden: true,
                    meta: { title: '工作量类型管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo7/framework/employee',
                    name: 'launch-demo7-framework-employee',
                    component: () => import('@/view/launch-demo7/framework/employee/Index.vue'),
                    hidden: true,
                    meta: { title: '职称类型员工', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
