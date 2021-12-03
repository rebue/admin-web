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
    meta: {
        title: '区党校学员管理系统',
        keepAlive: true,
        icon: 'setting',
    },
    component: () => import('@/view/launch-demo1/index/Index.vue'),
    redirect: '/launch-demo1/base/playground',
    children: [
        {
            path: '/launch-demo1/desktop',
            name: 'launch-demo1-desktop',
            component: RouteView,
            hidden: true,
            meta: {
                title: '基础桌面',
                keepAlive: true,
                icon: 'global',
            },
        },
        {
            path: '/launch-demo1/base',
            name: 'launch-demo1-base',
            component: RouteView,
            hidden: true,
            meta: {
                title: '基础数据（暂停）',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/base/playground',
                    name: 'launch-demo1-base-playground',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '场地信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/org',
                    name: 'launch-demo1-base-org',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '管理部门',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/teacher',
                    name: 'launch-demo1-base-teacher',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '教师信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/term',
                    name: 'launch-demo1-base-term',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学期信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/class',
                    name: 'launch-demo1-base-class',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '班级信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/teach',
                    name: 'launch-demo1-base-teach',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '教学模块',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/course',
                    name: 'launch-demo1-base-course',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '课程信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/compulsory',
                    name: 'launch-demo1-base-compulsory',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '必修课表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/electives',
                    name: 'launch-demo1-base-electives',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '选修课表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/base/data',
                    name: 'launch-demo1-base-data',
                    component: () => import('@/view/launch-demo1/base/playground/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '数据同步',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/student-status',
            name: 'launch-demo1-student-status',
            component: RouteView,
            hidden: true,
            meta: {
                title: '学籍管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/student-status/files',
                    name: 'launch-demo1-student-status-files',
                    component: () => import('@/view/launch-demo1/student-status/files/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学籍档案',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-status/class',
                    name: 'launch-demo1-student-status-class',
                    component: () => import('@/view/launch-demo1/student-status/class/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '班级管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-status/student-report',
                    name: 'launch-demo1-student-status-student-report',
                    component: () => import('@/view/launch-demo1/student-status/student-report/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学员报表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-status/student-conf',
                    name: 'launch-demo1-student-status-student-conf',
                    component: () => import('@/view/launch-demo1/student-status/student-conf/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学员配置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-status/log',
                    name: 'launch-demo1-student-status-log',
                    component: () => import('@/view/launch-demo1/student-status/log/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '版本记录',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-status/identity',
                    name: 'launch-demo1-student-status-identity',
                    component: () => import('@/view/launch-demo1/student-status/identity/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学员身份',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/attendance',
            name: 'launch-demo1-attendance',
            component: RouteView,
            hidden: true,
            meta: {
                title: '考勤管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/attendance-course',
                    name: 'launch-demo1-attendance-course',
                    component: () => import('@/view/launch-demo1/attendance/cource/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤课程',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-log',
                    name: 'launch-demo1-attendance-log',
                    component: () => import('@/view/launch-demo1/attendance/log/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤记录',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-data',
                    name: 'launch-demo1-attendance-data',
                    component: () => import('@/view/launch-demo1/attendance/data/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤统计',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-card',
                    name: 'launch-demo1-attendance-card',
                    component: () => import('@/view/launch-demo1/attendance/card/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '刷卡记录',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-signup',
                    name: 'launch-demo1-attendance-signup',
                    component: () => import('@/view/launch-demo1/attendance/signup/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '人员登记(暂停)',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-device',
                    name: 'launch-demo1-attendance-device',
                    component: () => import('@/view/launch-demo1/attendance/device/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤机管理(暂停)',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-set',
                    name: 'launch-demo1-attendance-set',
                    component: () => import('@/view/launch-demo1/attendance/set/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '考勤配置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/attendance-edit-log',
                    name: 'launch-demo1-attendance-edit-log',
                    component: () => import('@/view/launch-demo1/attendance/edit-log/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '修改日志(暂停)',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },

        {
            path: '/launch-demo1/selectd-course',
            name: 'launch-demo1-selectd-course',
            component: RouteView,
            hidden: true,
            meta: {
                title: '选修课管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/selectd-course-table',
                    name: 'launch-demo1-selectd-course-table',
                    component: () => import('@/view/launch-demo1/selectd-course/table/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '选择课表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/selectd-course-set',
                    name: 'launch-demo1-selectd-course-set',
                    component: () => import('@/view/launch-demo1/selectd-course/set/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '网上选课设置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/selectd-course-plan',
                    name: 'launch-demo1-selectd-course-plan',
                    component: () => import('@/view/launch-demo1/selectd-course/plan/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '选修课安排',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/selectd-course-change',
                    name: 'launch-demo1-selectd-course-change',
                    component: RouteView,
                    hidden: true,
                    meta: {
                        title: '选修课改选管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/selectd-course-student',
                    name: 'launch-demo1-selectd-course-student',
                    component: RouteView,
                    hidden: true,
                    meta: {
                        title: '学员选课情况',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/evaluate-course',
            name: 'launch-demo1-evaluate-course',
            component: RouteView,
            hidden: true,
            meta: {
                title: '评课管理（暂停）',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/evaluate-course-info',
                    name: 'launch-demo1-evaluate-course-info',
                    component: () => import('@/view/launch-demo1/evaluate-course/info/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '课程评估信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/evaluate-course-undo',
                    name: 'launch-demo1-evaluate-course-undo',
                    component: () => import('@/view/launch-demo1/evaluate-course/undo/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '当日未评课学员',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/evaluate-course-topic',
                    name: 'launch-demo1-evaluate-course-topic',
                    component: RouteView,
                    hidden: true,
                    meta: {
                        title: '专题课管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/evaluate-course-by-student',
                    name: 'launch-demo1-evaluate-course-by-student',
                    component: () => import('@/view/launch-demo1/evaluate-course/by-student/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学员评价信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/evaluate-course-qa-set',
                    name: 'launch-demo1-evaluate-course-qa-set',
                    component: () => import('@/view/launch-demo1/evaluate-course/qa-set/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '评估问卷设置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/evaluate-course-set',
                    name: 'launch-demo1-evaluate-course-set',
                    component: RouteView,
                    hidden: true,
                    meta: {
                        title: '评课配置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },

        {
            path: '/launch-demo1/data-table',
            name: 'launch-demo1-data-table',
            component: RouteView,
            hidden: true,
            meta: {
                title: '统计报表',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/data-table-usual',
                    name: 'launch-demo1-data-table-usual',
                    component: () => import('@/view/launch-demo1/data-table/usual/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '常用统计',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/teacher-system',
            name: 'launch-demo1-teacher-system',
            component: RouteView,
            hidden: true,
            meta: { title: '教师功能', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/teacher-system-member',
                    name: 'launch-demo1-teacher-system-member',
                    component: () => import('@/view/launch-demo1/teacher-system/member/Index.vue'),
                    hidden: true,
                    meta: { title: '组员查询', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo1/teacher-system-client',
            name: 'launch-demo1-teacher-system-client',
            component: RouteView,
            hidden: true,
            meta: { title: '客户端管理', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/teacher-system-client',
                    name: 'launch-demo1-teacher-system-client',
                    component: () => import('@/view/launch-demo1/client/Index.vue'),
                    hidden: true,
                    meta: { title: '客房版客户端', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo1/top-ten-articles',
            name: 'launch-demo1-top-ten-articles',
            component: RouteView,
            hidden: true,
            meta: {
                title: '十佳文章管理入口',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/manage',
                    name: 'launch-demo1-data-manage',
                    component: () => import('@/view/launch-demo1/top-ten-articles/Manage.vue'),
                    hidden: true,
                    meta: {
                        title: '管理文章',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/management-judges',
                    name: 'launch-demo1-management-judges',
                    component: () => import('@/view/launch-demo1/top-ten-articles/ManagementJudges.vue'),
                    hidden: true,
                    meta: {
                        title: '管理评委',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/manage-score',
                    name: 'launch-demo1-manage-score',
                    component: () => import('@/view/launch-demo1/top-ten-articles/ManageScore.vue'),
                    hidden: true,
                    meta: {
                        title: '管理评分',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/class-manage',
                    name: 'launch-demo1-class-manage',
                    component: () => import('@/view/launch-demo1/top-ten-articles/ClassManage.vue'),
                    hidden: true,
                    meta: {
                        title: '评比班级管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/graduation',
            name: 'launch-demo1-graduation',
            component: RouteView,
            hidden: true,
            meta: {
                title: '毕业鉴定',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/graduation/identify',
                    name: 'launch-demo1-graduation-identify',
                    component: () => import('@/view/launch-demo1/graduation/identify/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '毕业鉴定',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/graduation/score-entry',
                    name: 'launch-demo1-graduation-score-entry',
                    component: () => import('@/view/launch-demo1/graduation/score-entry/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '量化考核分数录入',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/graduation/report-paper',
                    name: 'launch-demo1-graduation-report-paper',
                    component: () => import('@/view/launch-demo1/graduation/report-paper/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '报告论文评分',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/graduation/assess-conf',
                    name: 'launch-demo1-graduation-assess-conf',
                    component: () => import('@/view/launch-demo1/graduation/assess-conf/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '量化考核配置',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/graduation/assess-log',
                    name: 'launch-demo1-graduation-assess-log',
                    component: () => import('@/view/launch-demo1/graduation/assess-log/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '量化考核日志',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/homework',
            name: 'launch-demo1-homework',
            component: RouteView,
            hidden: true,
            meta: {
                title: '作业管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/homework/decorate',
                    name: 'launch-demo1-homework-decorate',
                    component: () => import('@/view/launch-demo1/homework/decorate/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '布置批次',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/homework/article',
                    name: 'launch-demo1-homework-article',
                    component: () => import('@/view/launch-demo1/homework/article/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '文章查询',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/score',
            name: 'launch-demo1-score',
            component: RouteView,
            hidden: true,
            meta: {
                title: '成绩管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/score/manage',
                    name: 'launch-demo1-score-manage',
                    component: () => import('@/view/launch-demo1/score/manage/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '作业/论文成绩',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/one-card',
            name: 'launch-demo1-one-card',
            component: RouteView,
            hidden: true,
            meta: {
                title: '一卡通管理',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/one-card/manage',
                    name: 'launch-demo1-one-card-manage',
                    component: () => import('@/view/launch-demo1/one-card/manage/Index.vue'),
                    hidden: true,
                    meta: {
                        title: '学员一卡通',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },

        {
            path: '/launch-demo1/student-system',
            name: 'launch-demo1-student-system',
            component: RouteView,
            hidden: true,
            meta: {
                title: '基本功能',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/student-system/basic-function/students',
                    name: 'launch-demo1-student-system-students-file',
                    component: () => import('@/view/launch-demo1/student-system/basic-function/Student.vue'),
                    hidden: true,
                    meta: {
                        title: '学籍信息',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/student-system/basic-function/course',
                    name: 'launch-demo1-student-system-course',
                    component: () => import('@/view/launch-demo1/student-system/basic-function/course.vue'),
                    hidden: true,
                    meta: {
                        title: '课程表',
                        keepAlive: true,
                        icon: 'global',
                    },
                },

                //
            ],
        },
        {
            path: '/launch-demo1/student-system/attendance',
            name: 'launch-demo1-student-system-attendance',
            component: () => import('@/view/launch-demo1/student-system/attendance/attendance.vue'),
            hidden: true,
            meta: {
                title: '考勤记录',
                keepAlive: true,
                icon: 'global',
            },
        },
        {
            path: '/launch-demo1/student-system/course-selection',
            name: 'launch-demo1-student-system-course-selection',
            component: () => import('@/view/launch-demo1/student-system/course-selection/curriculum.vue'),
            hidden: true,
            meta: {
                title: '网上选课',
                keepAlive: true,
                icon: 'global',
            },
        },
        {
            path: '/launch-demo1/judges-entrance',
            name: 'launch-demo1-judges-entrance',
            component: RouteView,
            //
            hidden: true,
            meta: {
                title: '评委入口',
                keepAlive: true,
                icon: 'global',
            },
            children: [
                {
                    path: '/launch-demo1/judges-entrance/competition-schedule',
                    name: 'launch-demo1-judges-entrance-competition-schedule',
                    component: () =>
                        import('@/view/launch-demo1/student-system/judges-entrance/CompetitionSchedule.vue'),
                    hidden: true,
                    meta: {
                        title: '评比日程',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/judges-entrance/recommend-judges',
                    name: 'launch-demo1-judges-entrance-recommend-judges',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/RecommendJudges.vue'),
                    hidden: true,
                    meta: {
                        title: '推荐评委',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/judges-entrance/choose-article',
                    name: 'launch-demo1-judges-entrance-choose-article',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/ChooseArticle.vue'),
                    hidden: true,
                    meta: {
                        title: '推选文章',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/judges-entrance/grading',
                    name: 'launch-demo1-judges-entrance-grading',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/Grading.vue'),
                    hidden: true,
                    meta: {
                        title: '评分管理',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/judges-entrance/score',
                    name: 'launch-demo1-judges-entrance-score',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/score.vue'),
                    hidden: true,
                    meta: {
                        title: '评分情况',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
                {
                    path: '/launch-demo1/judges-entrance/comparison-results',
                    name: 'launch-demo1-judges-entrance-comparison-results',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/ComparisonResults.vue'),
                    hidden: true,
                    meta: {
                        title: '评比结果',
                        keepAlive: true,
                        icon: 'global',
                    },
                },
            ],
        },
        {
            path: '/launch-demo1/student-system/summary',
            name: 'launch-demo1-student-system-summary',
            component: () => import('@/view/launch-demo1/student-system/personal-summary/summary.vue'),
            hidden: true,
            meta: {
                title: '个人总结',
                keepAlive: true,
                icon: 'global',
            },
        },
        {
            path: '/launch-demo1/judges-entrance/team',
            name: 'launch-demo1-judges-entrance-team',
            component: () => import('@/view/launch-demo1/student-system/team/team.vue'),
            hidden: true,
            meta: {
                title: '小组鉴定',
                keepAlive: true,
                icon: 'global',
            },
        },
    ],
};

export default constantRouters;
