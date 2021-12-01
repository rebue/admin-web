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
    redirect: '/launch-demo1/base/playground',
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
                {
                    path: '/launch-demo1/student-status/log',
                    name: 'launch-demo1-student-status-log',
                    component: () => import('@/view/launch-demo1/student-status/log/Index.vue'),
                    hidden: true,
                    meta: { title: '版本记录', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/student-status/identity',
                    name: 'launch-demo1-student-status-identity',
                    component: () => import('@/view/launch-demo1/student-status/identity/Index.vue'),
                    hidden: true,
                    meta: { title: '学员身份', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo1/attendance',
            name: 'launch-demo1-attendance',
            component: RouteView,
            hidden: true,
            meta: { title: '考勤管理', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/attendance-course',
                    name: 'launch-demo1-attendance-course',
                    component: () => import('@/view/launch-demo1/attendance/cource/Index.vue'),
                    hidden: true,
                    meta: { title: '考勤课程', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-log',
                    name: 'launch-demo1-attendance-log',
                    component: RouteView,
                    hidden: true,
                    meta: { title: '考勤记录', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-data',
                    name: 'launch-demo1-attendance-data',
                    component: RouteView,
                    hidden: true,
                    meta: { title: '考勤统计', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-card',
                    name: 'launch-demo1-attendance-card',
                    component: () => import('@/view/launch-demo1/attendance/card/Index.vue'),
                    hidden: true,
                    meta: { title: '刷卡记录', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-signup',
                    name: 'launch-demo1-attendance-signup',
                    component: () => import('@/view/launch-demo1/attendance/signup/Index.vue'),
                    hidden: true,
                    meta: { title: '人员登记', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-device',
                    name: 'launch-demo1-attendance-device',
                    component: () => import('@/view/launch-demo1/attendance/device/Index.vue'),
                    hidden: true,
                    meta: { title: '考勤机管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/attendance-edit-log',
                    name: 'launch-demo1-attendance-edit-log',
                    component: () => import('@/view/launch-demo1/attendance/edit-log/Index.vue'),
                    hidden: true,
                    meta: { title: '修改日志', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo1/student-system',
            name: 'launch-demo1-student-system',
            component: RouteView,
            hidden: true,
            meta: { title: '基本功能', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/student-system/basic-function/course',
                    name: 'launch-demo1-student-system-course',
                    component: () => import('@/view/launch-demo1/student-system/basic-function/course.vue'),
                    hidden: true,
                    meta: { title: '课程表', keepAlive: true, icon: 'global' },
                },

                //
            ],
        },
        {
            path: '/launch-demo1/student-system/attendance',
            name: 'launch-demo1-student-system-attendance',
            component: () => import('@/view/launch-demo1/student-system/attendance/attendance.vue'),
            hidden: true,
            meta: { title: '考勤记录', keepAlive: true, icon: 'global' },
        },
        {
            path: '/launch-demo1/judges-entrance',
            name: 'launch-demo1-judges-entrance',
            component: RouteView,
            //
            hidden: true,
            meta: { title: '评委入口', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo1/judges-entrance/competition-schedule',
                    name: 'launch-demo1-judges-entrance-competition-schedule',
                    component: () =>
                        import('@/view/launch-demo1/student-system/judges-entrance/CompetitionSchedule.vue'),
                    hidden: true,
                    meta: { title: '评比日程', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo1/judges-entrance/recommend-judges',
                    name: 'launch-demo1-judges-entrance-recommend-judges',
                    component: () => import('@/view/launch-demo1/student-system/judges-entrance/RecommendJudges.vue'),
                    hidden: true,
                    meta: { title: '推荐评委', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
