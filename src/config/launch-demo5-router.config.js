const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo5',
    name: 'launch-demo5',
    meta: { title: '系统5', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo5/index/Index.vue'),
    redirect: '/launch-demo5/signUpHome',
    children: [
        {
            path: '/launch-demo5/signUpHome',
            name: 'community',
            component: RouteView,
            hidden: true,
            meta: { title: '求是社区', keepAlive: true, icon: 'global' },
            redirect: '/launch-demo5/signUpHome',
            children: [
                {
                    path: '/launch-demo5/signUpHome',
                    name: 'launch-demo5-signUpHome',
                    component: () => import('@/view/launch-demo5/community/signUpHome/SignUpHome.vue'),
                    hidden: true,
                    meta: { title: '报名入口', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/signUpManage',
                    name: 'launch-demo5-signUpManage',
                    component: () => import('@/view/launch-demo5/community/signUpManage/SignUpManage.vue'),
                    hidden: true,
                    meta: { title: '报名管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/manageConfig',
                    name: 'launch-demo5-manageConfig',
                    component: () => import('@/view/launch-demo5/community/manageConfig/ManageConfig.vue'),
                    hidden: true,
                    meta: { title: '管理配置', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/orgInquire',
                    name: 'launch-demo5-orgInquire',
                    component: () => import('@/view/launch-demo5/community/orgInquire/OrgInquire.vue'),
                    hidden: true,
                    meta: { title: '组织员查询', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/debate',
            name: 'debate',
            component: RouteView,
            hidden: true,
            meta: { title: '辩论赛', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/gameHome',
                    name: 'launch-demo5-gameHome',
                    component: () => import('@/view/launch-demo5/debate/gameHome/GameHome.vue'),
                    hidden: true,
                    meta: { title: '比赛入口', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/playerManage',
                    name: 'launch-demo5-playerManage',
                    component: () => import('@/view/launch-demo5/debate/playerManage/PlayerManage.vue'),
                    hidden: true,
                    meta: { title: '选手管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/sessionManage',
                    name: 'launch-demo5-sessionManage',
                    component: () => import('@/view/launch-demo5/debate/sessionManage/SessionManage.vue'),
                    hidden: true,
                    meta: { title: '场次管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/workPersonnel',
                    name: 'launch-demo5-workPersonnel',
                    component: () => import('@/view/launch-demo5/debate/workPersonnel/WorkPersonnel.vue'),
                    hidden: true,
                    meta: { title: '工作人员', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/gameMake',
                    name: 'launch-demo5-gameMake',
                    component: () => import('@/view/launch-demo5/debate/gameMake/GameMake.vue'),
                    hidden: true,
                    meta: { title: '比赛配制', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/lecture',
            name: 'lecture',
            component: RouteView,
            hidden: true,
            meta: { title: '即席演讲', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/lectureHome',
                    name: 'launch-demo5-lectureHome',
                    component: () => import('@/view/launch-demo5/lecture/lectureHome/LectureHome.vue'),
                    hidden: true,
                    meta: { title: '演讲入口', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/sessionTitle',
                    name: 'launch-demo5-sessionTitle',
                    component: () => import('@/view/launch-demo5/lecture/sessionTitle/SessionTitle.vue'),
                    hidden: true,
                    meta: { title: '场次题目', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/peopleManage',
                    name: 'launch-demo5-peopleManage',
                    component: () => import('@/view/launch-demo5/lecture/peopleManage/PeopleManage.vue'),
                    hidden: true,
                    meta: { title: '选手管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/workPeople',
                    name: 'launch-demo5-workPeople',
                    component: () => import('@/view/launch-demo5/lecture/workPeople/WorkPeople.vue'),
                    hidden: true,
                    meta: { title: '工作人员', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/scoreSum',
                    name: 'launch-demo5-scoreSum',
                    component: () => import('@/view/launch-demo5/lecture/scoreSum/ScoreSum.vue'),
                    hidden: true,
                    meta: { title: '评分汇总', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/lectureMake',
                    name: 'launch-demo5-lectureMake',
                    component: () => import('@/view/launch-demo5/lecture/lectureMake/LectureMake.vue'),
                    hidden: true,
                    meta: { title: '演讲配制', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/timerApp',
            name: 'timerApp',
            component: RouteView,
            hidden: true,
            meta: { title: '计时器应用', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/appHome',
                    name: 'launch-demo5-appHome',
                    component: () => import('@/view/launch-demo5/timerApp/appHome/AppHome.vue'),
                    hidden: true,
                    meta: { title: '应用入口', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/seminarAppraisal',
            name: 'seminarAppraisal',
            component: RouteView,
            hidden: true,
            meta: { title: '研讨评比', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/appraisalHome',
                    name: 'launch-demo5-appraisalHome',
                    component: () => import('@/view/launch-demo5/seminarAppraisal/appraisalHome/AppraisalHome.vue'),
                    hidden: true,
                    meta: { title: '评比入口', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/sessionManageApp',
                    name: 'launch-demo5-sessionManageApp',
                    component: () =>
                        import('@/view/launch-demo5/seminarAppraisal/sessionManageApp/SessionManageApp.vue'),
                    hidden: true,
                    meta: { title: '场次管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/resultsManage',
                    name: 'launch-demo5-resultsManage',
                    component: () => import('@/view/launch-demo5/seminarAppraisal/resultsManage/ResultsManage.vue'),
                    hidden: true,
                    meta: { title: '成果管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/workPersonnelApp',
                    name: 'launch-demo5-workPersonnelApp',
                    component: () =>
                        import('@/view/launch-demo5/seminarAppraisal/workPersonnelApp/WorkPersonnelApp.vue'),
                    hidden: true,
                    meta: { title: '工作人员', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/scoreRecord',
                    name: 'launch-demo5-scoreRecord',
                    component: () => import('@/view/launch-demo5/seminarAppraisal/scoreRecord/ScoreRecord.vue'),
                    hidden: true,
                    meta: { title: '评分记录', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/randomNub',
            name: 'randomNub',
            component: RouteView,
            hidden: true,
            meta: { title: '随机选号', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/selectNub',
                    name: 'launch-demo5-selectNub',
                    component: () => import('@/view/launch-demo5/randomNub/selectNub/SelectNub.vue'),
                    hidden: true,
                    meta: { title: '随机选号', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/selectSet',
                    name: 'launch-demo5-selectSet',
                    component: () => import('@/view/launch-demo5/randomNub/selectSet/SelectSet.vue'),
                    hidden: true,
                    meta: { title: '选号设置', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/dangerLife',
            name: 'dangerLife',
            component: RouteView,
            hidden: true,
            meta: { title: '险地求生', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo5/dangerLife',
                    name: 'launch-demo5-dangerLife',
                    component: () => import('@/view/launch-demo5/dangerLife/dangerLife/DangerLife.vue'),
                    hidden: true,
                    meta: { title: '险地求生', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/dangerLifeStu',
                    name: 'launch-demo5-dangerLifeStu',
                    component: () => import('@/view/launch-demo5/dangerLife/dangerLifeStu/DangerLifeStu.vue'),
                    hidden: true,
                    meta: { title: '险地求生（学员）', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo5/dangerLifeSet',
                    name: 'launch-demo5-dangerLifeSet',
                    component: () => import('@/view/launch-demo5/dangerLife/dangerLifeSet/DangerLifeSet.vue'),
                    hidden: true,
                    meta: { title: '参与学员管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
