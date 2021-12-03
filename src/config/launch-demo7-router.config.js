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
    meta: {
        title: '系统4',
        keepAlive: true,
        icon: 'setting',
    },
    component: () => import('@/view/launch-demo7/index/Index.vue'),
    redirect: '/launch-demo7/framework/department',
    children: [
        {
            path: '/launch-demo7/framework',
            name: 'launch-demo7-framework',
            component: RouteView,
            hidden: true,
            meta: {
                title: '系统框架',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo7/framework/department',
                    name: 'launch-demo7-framework-department',
                    component: () => import('@/view/launch-demo7/framework/department/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '工作量部门管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/framework/year',
                    name: 'launch-demo7-framework-year',
                    component: () => import('@/view/launch-demo7/framework/year/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '工作量年份管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/framework/flow',
                    name: 'launch-demo7-framework-flow',
                    component: () => import('@/view/launch-demo7/framework/flow/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '工作量流程管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/framework/type',
                    name: 'launch-demo7-framework-type',
                    component: () => import('@/view/launch-demo7/framework/type/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '工作量类型管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/framework/employee',
                    name: 'launch-demo7-framework-employee',
                    component: () => import('@/view/launch-demo7/framework/employee/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '职称类型员工',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo7/total-work',
            name: 'launch-demo7-total-work',
            component: RouteView,
            hidden: true,
            meta: {
                title: '查询工作量',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo7/total-work/me',
                    name: 'launch-demo7-total-work-me',
                    component: () => import('@/view/launch-demo7/total-work/me/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '我的工作量',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/total-work/school',
                    name: 'launch-demo7-total-work-school',
                    component: () => import('@/view/launch-demo7/total-work/school/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '全校工作量',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/total-work/query-report',
                    name: 'launch-demo7-total-work-query-report',
                    component: () => import('@/view/launch-demo7/total-work/query-report/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '工作量报表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/total-work/trial',
                    name: 'launch-demo7-total-work-trial',
                    component: () => import('@/view/launch-demo7/total-work/trial/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '初审表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/total-work/query-workload',
                    name: 'launch-demo7-total-work-query-workload',
                    component: () => import('@/view/launch-demo7/total-work/query-workload/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '查询工作量',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo7/total-work/audit-workload',
                    name: 'launch-demo7-total-work-audit-workload',
                    component: () => import('@/view/launch-demo7/total-work/audit-workload/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '审核工作量',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
    ],
};

export default constantRouters;
