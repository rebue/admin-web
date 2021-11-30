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
    meta: { title: '区党校学员管理系统', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo1/index/Index.vue'),
    redirect: '/launch-demo1/framework/department',
    children: [
        {
            path: '/launch-demo1/desktop',
            name: 'launch-demo1-desktop',
            component: RouteView,
            hidden: true,
            meta: { title: '基础桌面', keepAlive: true, icon: 'global' },
        },
        {
            path: '/launch-demo1/base',
            name: 'launch-demo1-base',
            component: RouteView,
            hidden: true,
            meta: { title: '基础数据', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/base/playground',
                    name: 'launch-demo1-base-playground',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '场地信息', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/org',
                    name: 'launch-demo1-base-org',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '管理部门', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/teacher',
                    name: 'launch-demo1-base-teacher',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '教师信息', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/term',
                    name: 'launch-demo1-base-term',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '学期信息', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/class',
                    name: 'launch-demo1-base-class',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '班级信息', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/teach',
                    name: 'launch-demo1-base-teach',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '教学模块', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/course',
                    name: 'launch-demo1-base-course',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '课程信息', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/compulsory',
                    name: 'launch-demo1-base-compulsory',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '必修课表', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/electives',
                    name: 'launch-demo1-base-electives',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '选修课表', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/base/data',
                    name: 'launch-demo1-base-data',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: { title: '数据同步', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo1/student-status',
            name: 'launch-demo1-student-status',
            component: RouteView,
            hidden: true,
            meta: { title: '学籍管理', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/student-status/files',
                    name: 'launch-demo1-student-status-files',
                    component: () => import('@/view/launch-demo1/student-status/files/Index.vue'),
                    hidden: true,
                    meta: { title: '学籍档案', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/student-status/class',
                    name: 'launch-demo1-student-status-class',
                    component: () => import('@/view/launch-demo1/student-status/class/Index.vue'),
                    hidden: true,
                    meta: { title: '班级管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/student-status/student-report',
                    name: 'launch-demo1-student-status-student-report',
                    component: () => import('@/view/launch-demo1/student-status/student-report/Index.vue'),
                    hidden: true,
                    meta: { title: '学员报表', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/student-status/student-conf',
                    name: 'launch-demo1-student-status-student-conf',
                    component: () => import('@/view/launch-demo1/student-status/student-conf/Index.vue'),
                    hidden: true,
                    meta: { title: '学员配置', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
