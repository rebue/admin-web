const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo4',
    name: 'launch-demo4',
    component: () => import('@/view/launch-demo4/index/Index.vue'),
    redirect: '/launch-demo4/online-registration',
    children: [
        {
            path: '/launch-demo4/online-registration',
            name: 'launch-demo4-online-registration',
            component: RouteView,
            hidden: true,
            meta: {
                title: '入学网上报名',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/online-registration-config',
                    name: 'launch-demo4-online-registration-config',
                    component: () => import('@/view/launch-demo4/online-registration/signupConf.vue'),
                    hidden: true,
                    meta: {
                        title: '网上报名配置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/online-registration-input',
                    name: 'launch-demo4-online-registration-input',
                    component: () => import('@/view/launch-demo4/online-registration/signupInput.vue'),
                    hidden: true,
                    meta: {
                        title: '报名录入',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/online-registration-review',
                    name: 'launch-demo4-online-registration-review',
                    component: () => import('@/view/launch-demo4/online-registration/signupReview.vue'),
                    hidden: true,
                    meta: {
                        title: '报考资格审核',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/online-registration-exemptionReview',
                    name: 'launch-demo4-online-registration-exemptionReview',
                    component: () => import('@/view/launch-demo4/online-registration/exemptionReview.vue'),
                    hidden: true,
                    meta: {
                        title: '免试资格审核',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/online-registration-statisticalReport',
                    name: 'launch-demo4-online-registration-statisticalReport',
                    component: () => import('@/view/launch-demo4/online-registration/statisticalReport.vue'),
                    hidden: true,
                    meta: {
                        title: '统计报表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/online-registration-signupHistory',
                    name: 'launch-demo4-online-registration-signupHistory',
                    component: () => import('@/view/launch-demo4/online-registration/signupHistory.vue'),
                    hidden: true,
                    meta: {
                        title: '报名历史',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/exam-management',
            name: 'launch-demo4-exam-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '入学考试管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/exam-management-examCourseManagement',
                    name: 'launch-demo4-exam-management-examCourseManagement',
                    component: () => import('@/view/launch-demo4/exam-management/examCourseManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '考试课程管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/exam-management-testSiteManagement',
                    name: 'launch-demo4-exam-management-testSiteManagement',
                    component: () => import('@/view/launch-demo4/exam-management/testSiteManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '考点管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/exam-management-testRoomManagement',
                    name: 'launch-demo4-exam-management-testRoomManagement',
                    component: () => import('@/view/launch-demo4/exam-management/testRoomManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '考场管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/exam-management-layoutExaminee',
                    name: 'launch-demo4-exam-management-layoutExaminee',
                    component: () => import('@/view/launch-demo4/exam-management/layoutExaminee.vue'),
                    hidden: true,
                    meta: {
                        title: '编排考生',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/exam-management-admissionTicketManagement',
                    name: 'launch-demo4-exam-management-admissionTicketManagement',
                    component: () => import('@/view/launch-demo4/exam-management/admissionTicketManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '准考证管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/achievement-management',
            name: 'launch-demo4-achievement-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '入学成绩管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/achievement-management-scoreEntry',
                    name: 'launch-demo4-achievement-management-scoreEntry',
                    component: () => import('@/view/launch-demo4/achievement-management/scoreEntry.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩录入',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/achievement-management-gradeFile',
                    name: 'launch-demo4-achievement-management-gradeFile',
                    component: () => import('@/view/launch-demo4/achievement-management/gradeFile.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩归档',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
    ],
};
export default constantRouters;
