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
    component: () => import('@/view/launch-demo3/index/Index.vue'),
    redirect: '/launch-demo3/annual-declaration/personal-profile-table',
    children: [
        // {
        //     path: '/launch-demo3/research-workload',
        //     name: 'launch-demo3-research-workload',
        //     component: RouteView,
        //     hidden: true,
        //     meta: { title: '科研工作量', keepAlive: true, icon: 'global' },
        //     children: [
        //         {
        //             path: '/launch-demo3/research-workload/personal-profile-table',
        //             name: 'launch-demo3-research-workload-personal-profile-table',
        //             component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
        //             meta: { title: '成功工作量申报', keepAlive: true, icon: 'global' },
        //             hidden: true,
        //         },
        //         {
        //             path: '/launch-demo3/research-workload/annual-overview-table',
        //             name: 'launch-demo3-research-workload-annual-overview-table',
        //             component: () => import('@/view/launch-demo3/annual-declaration/annual-overview-table.vue'),
        //             meta: { title: '其他工作量申报', keepAlive: true, icon: 'global' },
        //             hidden: true,
        //         },
        //     ],
        // },
        {
            path: '/launch-demo3/annual-declaration',
            name: 'launch-demo3-annual-declaration',
            component: RouteView,
            hidden: true,
            meta: { title: '本年度申报', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo3/annual-declaration/personal-profile-table',
                    name: 'launch-demo3-annual-declaration-personal-profile-table',
                    component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
                    meta: { title: '年度个人概况', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-declaration/annual-overview-table',
                    name: 'launch-demo3-annual-declaration-annual-overview-table',
                    component: () => import('@/view/launch-demo3/annual-declaration/annual-overview-table.vue'),
                    meta: { title: '年度全校概况', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-declaration/annual-reward-table',
                    name: 'launch-demo3-annual-declaration-annual-reward-table',
                    component: () => import('@/view/launch-demo3/annual-declaration/annual-reward-table.vue'),
                    meta: { title: '全年奖励', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-declaration/annual-auxiliary-table',
                    name: 'launch-demo3-annual-declaration-annual-auxiliary-table',
                    component: () => import('@/view/launch-demo3/annual-declaration/AnnualAuxiliaryTable.vue'),
                    meta: { title: '全年辅助', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
            ],
        },
        {
            path: '/launch-demo3/annual-statistic',
            name: 'launch-demo3-annual-statistic',
            component: RouteView,
            hidden: true,
            meta: { title: '本年度统计', keepAlive: true, icon: 'global' },
            children: [
                // {
                //     path: '/launch-demo3/annual-statistic/statistical-encapsulation',
                //     name: 'launch-demo3-annual-statistic-statistical-encapsulation',
                //     component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
                //     meta: { title: '统计/封装', keepAlive: true, icon: 'global' },
                //     hidden: true,
                // },
                {
                    path: '/launch-demo3/annual-statistic/personal-statistics-table',
                    name: 'launch-demo3-annual-statistic-personal-statistics-table',
                    component: () => import('@/view/launch-demo3/annual-statistic/personal-statistics-table.vue'),
                    meta: { title: '个人统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-statistic/department-statistics-table',
                    name: 'launch-demo3-annual-statistic-department-statistics-table',
                    component: () => import('@/view/launch-demo3/annual-statistic/department-statistics-table.vue'),
                    meta: { title: '部门统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-statistic/teacher-statistics-table',
                    name: 'launch-demo3-annual-statistic-teacher-statistics-table',
                    component: () => import('@/view/launch-demo3/annual-statistic/teacher-statistics-table.vue'),
                    meta: { title: '专职教师统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/annual-statistic/school-statistics-table',
                    name: 'launch-demo3-annual-statistic-school-statistics-table',
                    component: () => import('@/view/launch-demo3/annual-statistic/school-statistics-table.vue'),
                    meta: { title: '全校统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                // {
                //     path: '/launch-demo3/annual-statistic/workload',
                //     name: 'launch-demo3-annual-statistic-workload',
                //     component: () => import('@/view/launch-demo3/annual-declaration/AnnualAuxiliaryTable.vue'),
                //     meta: { title: '本年度工作量报表', keepAlive: true, icon: 'global' },
                //     hidden: true,
                // },
                // {
                //     path: '/launch-demo3/annual-statistic/labor-cost',
                //     name: 'launch-demo3-annual-statistic-labor-cost',
                //     component: () => import('@/view/launch-demo3/annual-declaration/AnnualAuxiliaryTable.vue'),
                //     meta: { title: '劳务费发放报表', keepAlive: true, icon: 'global' },
                //     hidden: true,
                // },
            ],
        },
        {
            path: '/launch-demo3/summary-years',
            name: 'launch-demo3-summary-years',
            component: RouteView,
            hidden: true,
            meta: { title: '历年汇总', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo3/summary-years/failed-results-table',
                    name: 'launch-demo3-summary-years-failed-results-table',
                    component: () => import('@/view/launch-demo3/summary-years/failed-results-table.vue'),
                    meta: { title: '历年未通过成果', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/personal-profile-year',
                    name: 'launch-demo3-summary-years-personal-profile-year',
                    component: () => import('@/view/launch-demo3/summary-years/personal-profile-year.vue'),
                    meta: { title: '个人历年概况', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/department-statistics-table',
                    name: 'launch-demo3-summary-years-department-statistics-table',
                    component: () => import('@/view/launch-demo3/summary-years/school-profile-year.vue'),
                    meta: { title: '全校历年概况', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/personal-statistics-years',
                    name: 'launch-demo3-summary-years-personal-statistics-years',
                    component: () => import('@/view/launch-demo3/summary-years/personal-statistics-years.vue'),
                    meta: { title: '个人统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/school-statistics-table',
                    name: 'launch-demo3-summary-years-school-statistics-table',
                    component: () => import('@/view/launch-demo3/summary-years/department-statistics-year.vue'),
                    meta: { title: '部门统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/teacher-statistics-year',
                    name: 'launch-demo3-summary-years-teacher-statistics-year',
                    component: () => import('@/view/launch-demo3/summary-years/teacher-statistics-year.vue'),
                    meta: { title: '专职教师统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/summary-years/labor-cost',
                    name: 'launch-demo3-summary-years-labor-cost',
                    component: () => import('@/view/launch-demo3/summary-years/school-statistics-year.vue'),
                    meta: { title: '全校统计查看', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                // {
                //     path: '/launch-demo3/summary-years/labor1-cost',
                //     name: 'launch-demo3-summary-years-labor1-cost',
                //     component: () => import('@/view/launch-demo3/summary-years/WorkloadYears.vue'),
                //     meta: { title: '历年工作量报表', keepAlive: true, icon: 'global' },
                //     hidden: true,
                // },
            ],
        },
        {
            path: '/launch-demo3/result-allocation',
            name: 'launch-demo3-result-allocation',
            component: RouteView,
            hidden: true,
            meta: { title: '成果配置', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo3/result-allocation/user',
                    name: 'launch-demo3-result-allocation-user',
                    component: () => import('@/view/launch-demo3/result-allocation/user.vue'),
                    meta: { title: '用户管理', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/result-allocation/title-management',
                    name: 'launch-demo3-result-allocation-title-management',
                    component: () => import('@/view/launch-demo3/result-allocation/TitleManagement.vue'),
                    meta: { title: '职称管理', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/result-allocation/log',
                    name: 'launch-demo3-result-allocation-log',
                    component: () => import('@/view/launch-demo3/result-allocation/log.vue'),
                    meta: { title: '日志', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/result-allocation/department-management',
                    name: 'launch-demo3-result-allocation-department-management1',
                    component: () => import('@/view/launch-demo3/result-allocation/DepartmentManagement.vue'),
                    meta: { title: '部门管理', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
            ],
        },
        {
            path: '/launch-demo3/research-workload',
            name: 'launch-demo3-research-workload',
            component: RouteView,
            hidden: true,
            meta: { title: '成果参数', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo3/research-workload/parameter-management',
                    name: 'launch-demo3-research-workload-parameter-management',
                    component: () => import('@/view/launch-demo3/research-workload/ParameterManagement.vue'),
                    meta: { title: '参数管理', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/research-workload/subject-parameters',
                    name: 'launch-demo3-research-workload-subject-parameters',
                    component: () => import('@/view/launch-demo3/research-workload/SubjectParameters.vue'),
                    meta: { title: '课题参数设置', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/research-workload/journal-classification',
                    name: 'launch-demo3-research-workload-journal-classification',
                    component: () => import('@/view/launch-demo3/research-workload/JournalClassification.vue'),
                    meta: { title: '期刊分类管理', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/research-workload/press',
                    name: 'launch-demo3-research-workload-press',
                    component: () => import('@/view/launch-demo3/research-workload/press.vue'),
                    meta: { title: '出版社信息', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                {
                    path: '/launch-demo3/research-workload/workshop',
                    name: 'launch-demo3-research-workload-workshop',
                    component: () => import('@/view/launch-demo3/research-workload/workshop.vue'),
                    meta: { title: '研讨会信息', keepAlive: true, icon: 'global' },
                    hidden: true,
                },
                // {
                //     path: '/launch-demo3/achievement-parameters/teacher-statistics-table2',
                //     name: 'launch-demo3-achievement-parameters-teacher-statistics-table2',
                //     component: () => import('@/view/launch-demo3/annual-declaration/AnnualAuxiliaryTable.vue'),
                //     meta: { title: '显示设置', keepAlive: true, icon: 'global' },
                //     hidden: true,
                // },
            ],
        },
    ],
};

export default constantRouters;
