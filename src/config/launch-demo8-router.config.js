const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo8',
    name: 'launch-demo8',
    meta: { title: '综合信息系统', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo8/index/Index.vue'),
    redirect: '/launch-demo8/desktop',
    children: [
        {
            path: '/launch-demo8/desktop',
            name: 'launch-demo8-desktop',
            component: () => import('@/view/launch-demo8/desktop/Index.vue'),
            hidden: true,
            meta: { title: '智能桌面', keepAlive: true, icon: 'global' },
        },
        {
            path: '/launch-demo8/process',
            name: 'launch-demo8-process',
            component: RouteView,
            hidden: true,
            meta: { title: '日常办公', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/process/my-process',
                    name: 'launch-demo8-process-my-process',
                    component: RouteView,
                    hidden: true,
                    meta: { title: '我的流程', keepAlive: true, icon: 'global' },
                    children: [
                        {
                            path: '/launch-demo8/process/my-process/new-process',
                            name: 'launch-demo8-process-my-process-new-process',
                            component: () => import('@/view/launch-demo8/process/my-process/new-process/Index.vue'),
                            hidden: true,
                            meta: { title: '启动新流程', keepAlive: true, icon: 'global' },
                        },
                        {
                            path: '/launch-demo8/process/my-process/detail-process',
                            name: 'launch-demo8-process-my-process-detail-process',
                            component: () => import('@/view/launch-demo8/process/my-process/detail-process/Index.vue'),
                            hidden: true,
                            meta: { title: '发起流程详情', keepAlive: true, icon: 'global', hideMenu: true },
                        },
                        {
                            path: '/launch-demo8/process/my-process/my-process',
                            name: 'launch-demo8-process-my-process-my-process',
                            component: () => import('@/view/launch-demo8/process/my-process/my-process/Index.vue'),
                            hidden: true,
                            meta: { title: '等待我主办的流程', keepAlive: true, icon: 'global' },
                        },
                        {
                            path: '/launch-demo8/process/my-process/now-process',
                            name: 'launch-demo8-process-my-process-now-process',
                            component: () => import('@/view/launch-demo8/process/my-process/now-process/Index.vue'),
                            hidden: true,
                            meta: { title: '正在流转的流程', keepAlive: true, icon: 'global' },
                        },
                        {
                            path: '/launch-demo8/process/my-process/collection-process',
                            name: 'launch-demo8-process-my-process-collection-process',
                            component: () =>
                                import('@/view/launch-demo8/process/my-process/collection-process/Index.vue'),
                            hidden: true,
                            meta: { title: '我收藏的流程', keepAlive: true, icon: 'global' },
                        },
                        {
                            path: '/launch-demo8/process/my-process/complete-process',
                            name: 'launch-demo8-process-my-process-complete-process',
                            component: () =>
                                import('@/view/launch-demo8/process/my-process/complete-process/Index.vue'),
                            hidden: true,
                            meta: { title: '完成或终止的流程', keepAlive: true, icon: 'global' },
                        },
                        {
                            path: '/launch-demo8/process/my-process/history-process',
                            name: 'launch-demo8-proces-my-processs-history-process',
                            component: () => import('@/view/launch-demo8/process/my-process/history-process/Index.vue'),
                            hidden: true,
                            meta: { title: '流程历史与流程图', keepAlive: true, icon: 'global', hideMenu: true },
                        },
                    ],
                },
                {
                    path: '/launch-demo8/process/urge-process',
                    name: 'launch-demo8-process-urge-process',
                    component: () => import('@/view/launch-demo8/process/urge-process/Index.vue'),
                    hidden: true,
                    meta: { title: '短信提醒', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/process/hospital-committee',
                    name: 'launch-demo8-process-hospital-committee',
                    component: () => import('@/view/launch-demo8/process/hospital-committee/Index.vue'),
                    hidden: true,
                    meta: { title: '院委会研究', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/process/supervision-piece',
                    name: 'launch-demo8-process-supervision-piece',
                    component: () => import('@/view/launch-demo8/process/supervision-piece/Index.vue'),
                    hidden: true,
                    meta: { title: '督办件', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/process/search-process',
                    name: 'launch-demo8-process-search-process',
                    component: () => import('@/view/launch-demo8/process/search-process/Index.vue'),
                    hidden: true,
                    meta: { title: '流程查询', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/process/search-count',
                    name: 'launch-demo8-process-search-count',
                    component: () => import('@/view/launch-demo8/process/search-count/Index.vue'),
                    hidden: true,
                    meta: { title: '数据查询', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/process/admin-process',
                    name: 'launch-demo8-process-admin-process',
                    component: () => import('@/view/launch-demo8/process/admin-process/Index.vue'),
                    hidden: true,
                    meta: { title: '流程管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/schedule',
            name: 'launch-demo8-schedule',
            component: RouteView,
            hidden: true,
            meta: { title: '工作日程', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/schedule/schedule',
                    name: 'launch-demo8-schedule-schedule',
                    component: () => import('@/view/launch-demo8/schedule/schedule/Index.vue'),
                    hidden: true,
                    meta: { title: '工作日程', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/schedule/calendar',
                    name: 'launch-demo8-schedule-calendar',
                    component: () => import('@/view/launch-demo8/schedule/calendar/Index.vue'),
                    hidden: true,
                    meta: { title: '工作日历', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/schedule/schedule-count',
                    name: 'launch-demo8-schedule-schedule-count',
                    component: () => import('@/view/launch-demo8/schedule/schedule-count/Index.vue'),
                    hidden: true,
                    meta: { title: '总结统计', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/schedule/plan-option',
                    name: 'launch-demo8-schedule-plan-option',
                    component: () => import('@/view/launch-demo8/schedule/plan-option/Index.vue'),
                    hidden: true,
                    meta: { title: '计划配置', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/schedule/schedule-option',
                    name: 'launch-demo8-schedule-schedule-option',
                    component: () => import('@/view/launch-demo8/schedule/schedule-option/Index.vue'),
                    hidden: true,
                    meta: { title: '日程配置', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/app',
            name: 'launch-demo8-app',
            component: RouteView,
            hidden: true,
            meta: { title: '应用程序', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/app/app-list',
                    name: 'launch-demo8-app-app-list',
                    component: () => import('@/view/launch-demo8/app/app-list/Index.vue'),
                    hidden: true,
                    meta: { title: '应用列表', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/app/app-option',
                    name: 'launch-demo8-app-app-option',
                    component: () => import('@/view/launch-demo8/app/app-option/Index.vue'),
                    hidden: true,
                    meta: { title: '挂接系统管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/personnel',
            name: 'launch-demo8-personnel',
            component: RouteView,
            hidden: true,
            meta: { title: '基础人事', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/personnel/department',
                    name: 'launch-demo8-personnel-department',
                    component: () => import('@/view/launch-demo8/personnel/department/Index.vue'),
                    hidden: true,
                    meta: { title: '部门管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/personnel/staff',
                    name: 'launch-demo8-personnel-staff',
                    component: () => import('@/view/launch-demo8/personnel/staff/Index.vue'),
                    hidden: true,
                    meta: { title: '员工管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/personnel/quit-retire',
                    name: 'launch-demo8-personnel-quit-retire',
                    component: () => import('@/view/launch-demo8/personnel/quit-retire/Index.vue'),
                    hidden: true,
                    meta: { title: '离退人员', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/personnel/train',
                    name: 'launch-demo8-personnel-train',
                    component: () => import('@/view/launch-demo8/personnel/train/Index.vue'),
                    hidden: true,
                    meta: { title: '培训管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/email',
            name: 'launch-demo8-email',
            // component: () => import('@/view/launch-demo8/email/Index.vue'),
            component: RouteView,
            hidden: true,
            meta: { title: '电子邮件', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/email/write',
                    name: 'launch-demo8-email-write',
                    component: () => import('@/view/launch-demo8/email/write.vue'),
                    hidden: true,
                    meta: { title: '写信', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/email/Inbox',
                    name: 'launch-demo8-email-Inbox',
                    component: () => import('@/view/launch-demo8/email/Inbox.vue'),
                    hidden: true,
                    meta: { title: '收件箱', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/file',
            name: 'launch-demo8-file',
            component: RouteView,
            hidden: true,
            meta: { title: '文档管理', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/file/file-public',
                    name: 'launch-demo8-file-file-public',
                    component: () => import('@/view/launch-demo8/file/file-public/Index.vue'),
                    hidden: true,
                    meta: { title: '公有文档', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/file/file-private',
                    name: 'launch-demo8-file-file-private',
                    component: () => import('@/view/launch-demo8/file/file-private/Index.vue'),
                    hidden: true,
                    meta: { title: '私有文档', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/easy-zone',
            name: 'launch-demo8-easy-zone',
            component: RouteView,
            hidden: true,
            meta: { title: '易空间', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/easy-zone/my-zone',
                    name: 'launch-demo8-easy-zone-my-zone',
                    component: () => import('@/view/launch-demo8/easy-zone/my-zone/Index.vue'),
                    hidden: true,
                    meta: { title: '个人空间', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/easy-zone/notepad',
                    name: 'launch-demo8-easy-zone-notepad',
                    component: () => import('@/view/launch-demo8/easy-zone/notepad/Index.vue'),
                    hidden: true,
                    meta: { title: '记事本', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/easy-zone/article',
                    name: 'launch-demo8-easy-zone-article',
                    component: () => import('@/view/launch-demo8/easy-zone/article/Index.vue'),
                    hidden: true,
                    meta: { title: '文章', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/easy-zone/album',
                    name: 'launch-demo8-easy-zone-album',
                    component: () => import('@/view/launch-demo8/easy-zone/album/Index.vue'),
                    hidden: true,
                    meta: { title: '相册', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/easy-zone/album-detail/:id',
                    name: 'launch-demo8-easy-zone-album-detail',
                    component: () => import('@/view/launch-demo8/easy-zone/album-detail/Index.vue'),
                    hidden: true,
                    meta: { title: '相册', keepAlive: true, icon: 'global', hideMenu: true },
                },
            ],
        },
        {
            path: '/launch-demo8/mail-list',
            name: 'launch-demo8-mail-list',
            component: () => import('@/view/launch-demo8/mail-list/Index.vue'),
            hidden: true,
            meta: { title: '通讯录', keepAlive: true, icon: 'global' },
        },
        {
            path: '/launch-demo8/website',
            name: 'launch-demo8-website',
            component: RouteView,
            hidden: true,
            meta: { title: '网站收藏', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/website/website-public',
                    name: 'launch-demo8-website-website-public',
                    component: () => import('@/view/launch-demo8/website/website-public/Index.vue'),
                    hidden: true,
                    meta: { title: '公共收藏夹', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/website/website-private',
                    name: 'launch-demo8-website-website-private',
                    component: () => import('@/view/launch-demo8/website/website-private/Index.vue'),
                    hidden: true,
                    meta: { title: '个人收藏夹', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/message',
            name: 'launch-demo8-message',
            component: RouteView,
            hidden: true,
            meta: { title: '短信发送', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/message/message-post',
                    name: 'launch-demo8-message-message-post',
                    component: () => import('@/view/launch-demo8/message/message-post/Index.vue'),
                    hidden: true,
                    meta: { title: '短信发送', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/message/message-history',
                    name: 'launch-demo8-message-message-history',
                    component: () => import('@/view/launch-demo8/message/message-history/Index.vue'),
                    hidden: true,
                    meta: { title: '短信历史', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/message/message-option',
                    name: 'launch-demo8-message-message-option',
                    component: () => import('@/view/launch-demo8/message/message-option/Index.vue'),
                    hidden: true,
                    meta: { title: '系统配置', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo8/survey',
            name: 'launch-demo8-survey',
            component: RouteView,
            hidden: true,
            meta: { title: '在线调查', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo8/survey/evaluation-questionnaire',
                    name: 'launch-demo8-survey-evaluation-questionnaire',
                    component: () => import('@/view/launch-demo8/survey/evaluation-questionnaire/Index.vue'),
                    hidden: true,
                    meta: { title: '测评问卷管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/survey/evaluation-detail',
                    name: 'launch-demo8-survey-evaluation-detail',
                    component: () => import('@/view/launch-demo8/survey/evaluation-detail/Index.vue'),
                    hidden: true,
                    meta: { title: '测评内容管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/survey/evaluation-template',
                    name: 'launch-demo8-survey-evaluation-template',
                    component: () => import('@/view/launch-demo8/survey/evaluation-template/Index.vue'),
                    hidden: true,
                    meta: { title: '问卷模板管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/survey/evaluation-online',
                    name: 'launch-demo8-survey-evaluation-online',
                    component: () => import('@/view/launch-demo8/survey/evaluation-online/Index.vue'),
                    hidden: true,
                    meta: { title: '在线测评', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/survey/evaluation-result',
                    name: 'launch-demo8-survey-evaluation-result',
                    component: () => import('@/view/launch-demo8/survey/evaluation-result/Index.vue'),
                    hidden: true,
                    meta: { title: '测评结果', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo8/survey/evaluation-jurisdiction',
                    name: 'launch-demo8-survey-evaluation-jurisdiction',
                    component: () => import('@/view/launch-demo8/survey/evaluation-jurisdiction/Index.vue'),
                    hidden: true,
                    meta: { title: '权限管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
