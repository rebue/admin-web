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
    redirect: '/launch-demo4/online-registration-config',
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
            path: '/launch-demo4/entrance-achievement-management',
            name: 'launch-demo4-entrance-achievement-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '入学成绩管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/entrance-achievement-management-scoreEntry',
                    name: 'launch-demo4-entrance-achievement-management-scoreEntry',
                    component: () => import('@/view/launch-demo4/entrance-achievement-management/scoreEntry.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩录入',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/entrance-achievement-management-gradeFile',
                    name: 'launch-demo4-entrance-achievement-management-gradeFile',
                    component: () => import('@/view/launch-demo4/entrance-achievement-management/gradeFile.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩归档',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/entrance-achievement-management-gradeSubsection',
                    name: 'launch-demo4-entrance-achievement-management-gradeSubsection',
                    component: () => import('@/view/launch-demo4/entrance-achievement-management/gradeSubsection.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩分段',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/entrance-achievement-management-scoreView',
                    name: 'launch-demo4-entrance-achievement-management-scoreView',
                    component: () => import('@/view/launch-demo4/entrance-achievement-management/scoreView.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩查看',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/entrance-achievement-management-scoreQuery',
                    name: 'launch-demo4-entrance-achievement-management-scoreQuery',
                    component: () => import('@/view/launch-demo4/entrance-achievement-management/scoreQuery.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩查询',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/entrance-achievement-management-releaseManagement',
                    name: 'launch-demo4-entrance-achievement-management-releaseManagement',
                    component: () =>
                        import('@/view/launch-demo4/entrance-achievement-management/releaseManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '发布管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/newstudent-admission',
            name: 'launch-demo4-newstudent-admission',
            component: RouteView,
            hidden: true,
            meta: {
                title: '入学新生录取',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/newstudent-admission-enrollmentIndex',
                    name: 'launch-demo4-newstudent-admission-enrollmentIndex',
                    component: () => import('@/view/launch-demo4/newstudent-admission/enrollmentIndex.vue'),
                    hidden: true,
                    meta: {
                        title: '招生指标',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/newstudent-admission-admissionManagement',
                    name: 'launch-demo4-newstudent-admission-admissionManagement',
                    component: () => import('@/view/launch-demo4/newstudent-admission/admissionManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '录取管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/newstudent-admission-newStuRegister',
                    name: 'launch-demo4-newstudent-admission-newStuRegister',
                    component: () => import('@/view/launch-demo4/newstudent-admission/newStuRegister.vue'),
                    hidden: true,
                    meta: {
                        title: '新生注册',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/basics-data',
            name: 'launch-demo4-basics-data',
            component: RouteView,
            hidden: true,
            meta: {
                title: '基础数据',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/basics-data-stuTypeManagement',
                    name: 'launch-demo4-basics-data-stuTypeManagement',
                    component: () => import('@/view/launch-demo4/basics-data/stuTypeManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '研究生类型管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-gradeManagement',
                    name: 'launch-demo4-basics-data-gradeManagement',
                    component: () => import('@/view/launch-demo4/basics-data/gradeManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '年级管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-majorManagement',
                    name: 'launch-demo4-basics-data-majorManagement',
                    component: () => import('@/view/launch-demo4/basics-data/majorManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '专业管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-teachPointManagement',
                    name: 'launch-demo4-basics-data-teachPointManagement',
                    component: () => import('@/view/launch-demo4/basics-data/teachPointManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '教学点管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-semesterManagement',
                    name: 'launch-demo4-basics-data-semesterManagement',
                    component: () => import('@/view/launch-demo4/basics-data/semesterManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '学期管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-classManagement',
                    name: 'launch-demo4-basics-data-classManagement',
                    component: () => import('@/view/launch-demo4/basics-data/classManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '班级管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/basics-data-teachPointUser',
                    name: 'launch-demo4-basics-data-teachPointUser',
                    component: () => import('@/view/launch-demo4/basics-data/teachPointUser.vue'),
                    hidden: true,
                    meta: {
                        title: '教学点用户',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/studentstatus-management',
            name: 'launch-demo4-studentstatus-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '学籍管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/studentstatus-management-stuArchives',
                    name: 'launch-demo4-studentstatus-management-stuArchives',
                    component: () => import('@/view/launch-demo4/studentstatus-management/stuArchives.vue'),
                    hidden: true,
                    meta: {
                        title: '学员档案',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/studentstatus-management-classManagement',
                    name: 'launch-demo4-studentstatus-management-classManagement',
                    component: () => import('@/view/launch-demo4/studentstatus-management/classManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '班级管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/studentstatus-management-studentStatusChange',
                    name: 'launch-demo4-studentstatus-management-studentStatusChange',
                    component: () => import('@/view/launch-demo4/studentstatus-management/studentStatusChange.vue'),
                    hidden: true,
                    meta: {
                        title: '学籍变动',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/curriculum-management',
            name: 'launch-demo4-curriculum-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '课程管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/curriculum-management-curriculumInfo',
                    name: 'launch-demo4-curriculum-management-curriculumInfo',
                    component: () => import('@/view/launch-demo4/curriculum-management/curriculumInfo.vue'),
                    hidden: true,
                    meta: {
                        title: '课程信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/score-entry',
            name: 'launch-demo4-score-entry',
            component: RouteView,
            hidden: true,
            meta: {
                title: '成绩录入',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/score-entry-usualPerformance',
                    name: 'launch-demo4-score-entry-usualPerformance',
                    component: () => import('@/view/launch-demo4/score-entry/usualPerformance.vue'),
                    hidden: true,
                    meta: {
                        title: '平时成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/score-entry-subjectAchievement',
                    name: 'launch-demo4-score-entry-subjectAchievement',
                    component: () => import('@/view/launch-demo4/score-entry/subjectAchievement.vue'),
                    hidden: true,
                    meta: {
                        title: '各科成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/score-entry-makeUpExamAchievement',
                    name: 'launch-demo4-score-entry-makeUpExamAchievement',
                    component: () => import('@/view/launch-demo4/score-entry/makeUpExamAchievement.vue'),
                    hidden: true,
                    meta: {
                        title: '补考成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/score-entry-allMakeUpExamAchievement',
                    name: 'launch-demo4-score-entry-allMakeUpExamAchievement',
                    component: () => import('@/view/launch-demo4/score-entry/allMakeUpExamAchievement.vue'),
                    hidden: true,
                    meta: {
                        title: '总补考成绩',
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
                title: '成绩管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/achievement-management-courseAchievement',
                    name: 'launch-demo4-achievement-management-courseAchievement',
                    component: () => import('@/view/launch-demo4/achievement-management/courseAchievement.vue'),
                    hidden: true,
                    meta: {
                        title: '课程成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/achievement-management-comprehensiveScore',
                    name: 'launch-demo4-achievement-management-comprehensiveScore',
                    component: () => import('@/view/launch-demo4/achievement-management/comprehensiveScore.vue'),
                    hidden: true,
                    meta: {
                        title: '综合成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/achievement-management-achievementRelease',
                    name: 'launch-demo4-achievement-management-achievementRelease',
                    component: () => import('@/view/launch-demo4/achievement-management/achievementRelease.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩发布',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/achievement-management-scoreCalculationSetting',
                    name: 'launch-demo4-achievement-management-scoreCalculationSetting',
                    component: () => import('@/view/launch-demo4/achievement-management/scoreCalculationSetting.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩计算设置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/achievement-management-scoreQuery',
                    name: 'launch-demo4-achievement-management-scoreQuery',
                    component: () => import('@/view/launch-demo4/achievement-management/scoreQuery.vue'),
                    hidden: true,
                    meta: {
                        title: '成绩查询',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/graduation-management',
            name: 'launch-demo4-graduation-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '毕业管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/graduation-management-graduationQualificationAudit',
                    name: 'launch-demo4-graduation-management-graduationQualificationAudit',
                    component: () =>
                        import('@/view/launch-demo4/graduation-management/graduationQualificationAudit.vue'),
                    hidden: true,
                    meta: {
                        title: '毕业资格审核',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-scoreLessThanFive',
                    name: 'launch-demo4-graduation-management-scoreLessThanFive',
                    component: () => import('@/view/launch-demo4/graduation-management/scoreLessThanFive.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤低于5分',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-diplomaPrefixManagement',
                    name: 'launch-demo4-graduation-management-diplomaPrefixManagement',
                    component: () => import('@/view/launch-demo4/graduation-management/diplomaPrefixManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '证号前缀管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-canGraduateManagement',
                    name: 'launch-demo4-graduation-management-canGraduateManagement',
                    component: () => import('@/view/launch-demo4/graduation-management/canGraduateManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '可毕业管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-postponeGraduation',
                    name: 'launch-demo4-graduation-management-postponeGraduation',
                    component: () => import('@/view/launch-demo4/graduation-management/postponeGraduation.vue'),
                    hidden: true,
                    meta: {
                        title: '缓毕业管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-cannotGraduation',
                    name: 'launch-demo4-graduation-management-cannotGraduation',
                    component: () => import('@/view/launch-demo4/graduation-management/cannotGraduation.vue'),
                    hidden: true,
                    meta: {
                        title: '不可毕业管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-diplomaManagement',
                    name: 'launch-demo4-graduation-management-diplomaManagement',
                    component: () => import('@/view/launch-demo4/graduation-management/diplomaManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '毕业证管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/graduation-management-diplomaTemplate',
                    name: 'launch-demo4-graduation-management-diplomaTemplate',
                    component: () => import('@/view/launch-demo4/graduation-management/diplomaTemplate.vue'),
                    hidden: true,
                    meta: {
                        title: '毕业证模板',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/print-report',
            name: 'launch-demo4-print-report',
            component: RouteView,
            hidden: true,
            meta: {
                title: '打印报表',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/print-report-diplomaTemplate',
                    name: 'launch-demo4-print-report-diplomaTemplate',
                    component: () => import('@/view/launch-demo4/print-report/printManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '打印管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo4/config-management',
            name: 'launch-demo4-config-management',
            component: RouteView,
            hidden: true,
            meta: {
                title: '配置管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo4/config-management-permissionGroup',
                    name: 'launch-demo4-config-management-permissionGroup',
                    component: () => import('@/view/launch-demo4/config-management/permissionGroup.vue'),
                    hidden: true,
                    meta: {
                        title: '权限组管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/config-management-codeManagement',
                    name: 'launch-demo4-config-management-codeManagement',
                    component: () => import('@/view/launch-demo4/config-management/codeManagement.vue'),
                    hidden: true,
                    meta: {
                        title: '编码管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo4/config-management-functionSwitch',
                    name: 'launch-demo4-config-management-functionSwitch',
                    component: () => import('@/view/launch-demo4/config-management/functionSwitch.vue'),
                    hidden: true,
                    meta: {
                        title: '功能开关',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
    ],
};
export default constantRouters;
