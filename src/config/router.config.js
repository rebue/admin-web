import { AppIdDic } from '@/dic/AppIdDic';
import { getAppIdByUrl } from '@/util/common';

const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouters = [
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/view/demo/Demo'),
    },
    {
        path: '/unifiedLogin',
        name: 'unifiedLogin',
        component: () => import('@/view/unified/UnifiedLogin'),
    },

    /**扫码中转中间页*/
    {
        path: '/scanTransfer',
        name: 'scanTransfer',
        component: () => import('@/view/app/security-center/ScanTransfer.vue'),
    },
    {
        path: '/',
        redirect() {
            // 在应用下去路由到path: '/'
            const App_Id = getAppIdByUrl();
            if (App_Id) {
                return `/${getAppIdByUrl()}`;
            } else {
                // 手动访问path: '/'， 默认redirect到统一
                return `/${AppIdDic.UnifiedAuth}`;
            }
        },
    },
    /** 平台管理 */
    /** 登录 */
    {
        path: '/platform-admin-web/sign-in/platform',
        name: 'platform-sign-in',
        component: () => import('@/view/sign-in/platform/PlatformSignIn.vue'),
    },
    {
        path: '/platform-admin-web/forget-password',
        name: 'platform-forget-password',
        component: () => import('@/view/forget-password/Platform.vue'),
    },
    /** 页面 */
    {
        path: '/research-workload',
        name: 'research-workload',
        component: () => import('@/view/research-workload/rew-index.vue'),
    },
    {
        path: '/platform-admin-web',
        name: 'platform-admin-web',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/platform-admin-web/base/rac-realm',
        children: [
            {
                path: '/platform-admin-web/person-center',
                name: 'person-center',
                meta: { title: '个人中心', keepAlive: true, icon: 'setting' },
                component: () => import('@/view/rac/rac-account/PersonCenter.vue'),
                hidden: true,
            },
            /** 配置 */
            {
                path: '/platform-admin-web/base',
                name: 'base',
                meta: { title: '基础', keepAlive: true, icon: 'setting' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/base/rac-realm',
                children: [
                    {
                        path: '/platform-admin-web/base/rac-realm',
                        name: 'rac-realm',
                        component: () => import('@/view/rac/rac-realm/Manager.vue'),
                        hidden: true,
                        meta: { title: '领域', keepAlive: true, icon: 'global' },
                    },
                    {
                        path: '/platform-admin-web/base/rac-app',
                        name: 'rac-app',
                        component: () => import('@/view/rac/rac-app/Manager.vue'),
                        hidden: true,
                        meta: { title: '应用', keepAlive: true, icon: 'appstore' },
                    },
                    {
                        path: '/platform-admin-web/base/rac-perm',
                        name: 'rac-perm',
                        component: () => import('@/view/rac/rac-perm/Manager.vue'),
                        hidden: true,
                        meta: { title: '权限', keepAlive: true, icon: 'deployment-unit' },
                    },
                    {
                        path: '/platform-admin-web/base/rac-role',
                        name: 'rac-role',
                        component: () => import('@/view/rac/rac-role/Manager.vue'),
                        hidden: true,
                        meta: { title: '角色', keepAlive: true, icon: 'smile' },
                    },
                    {
                        path: '/platform-admin-web/base/rac-dic',
                        name: 'rac-dic',
                        component: () => import('@/view/rac/rac-dic/Manager.vue'),
                        hidden: true,
                        meta: { title: '字典', keepAlive: true, icon: 'read' },
                    },
                ],
            },
            {
                path: '/platform-admin-web/account',
                name: 'account',
                meta: { title: '账户', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/account/rac-account',
                children: [
                    {
                        path: '/platform-admin-web/account/rac-org',
                        name: 'rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/account/rac-account',
                        name: 'rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                    {
                        path: '/platform-admin-web/account/rac-user',
                        name: 'rac-user',
                        component: () => import('@/view/rac/rac-user/Manager.vue'),
                        hidden: true,
                        meta: { title: '用户', keepAlive: true, icon: 'user' },
                    },
                    {
                        path: '/platform-admin-web/account/rac-account-unlock',
                        name: 'rac-account-unlock',
                        component: () => import('@/view/rac/rac-account/ManagerUnlock.vue'),
                        hidden: true,
                        meta: { title: '解锁', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/platform-admin-web/log',
                name: 'log',
                meta: { title: '日志', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/log/lock-statistics',
                children: [
                    {
                        path: '/platform-admin-web/log/lock-statistics',
                        name: 'lock-statistics',
                        component: () => import('@/view/rac/rac-statistics-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '日志统计', keepAlive: true, icon: 'deployment-unit' },
                    },
                    {
                        path: '/platform-admin-web/log/lock-log',
                        name: 'lock-log',
                        component: () => import('@/view/rac/rac-lock-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户解锁日志', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/log/disable-log',
                        name: 'disable-log',
                        component: () => import('@/view/rac/rac-disable-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户启/禁用日志', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/log/op-log',
                        name: 'op-log',
                        component: () => import('@/view/rac/rac-op-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '操作日志', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/platform-admin-web/user-synchro',
                name: 'user-synchro',
                meta: { title: '数据管理', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-synchro/account-sy',
                children: [
                    {
                        path: '/platform-admin-web/user-synchro/account-sy',
                        name: 'account-sy',
                        component: () => import('@/view/rac/rac-user-synchro/Manager.vue'),
                        hidden: true,
                        meta: { title: '同步策略', keepAlive: true, icon: 'apartment' },
                    },
                ],
            },
            {
                path: '/platform-admin-web/system-manage',
                name: 'system-manage',
                meta: { title: '系统管理', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-system-manage/weChat-config',
                children: [
                    {
                        path: '/platform-admin-web/user-system-manage/weChat-config',
                        name: 'weChat-config',
                        component: () => import('@/view/rac/rac-system-manage/wxManager.vue'),
                        hidden: true,
                        meta: { title: '公众号配置', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/user-system-manage/dingTalk-config',
                        name: 'dingTalk-config',
                        component: () => import('@/view/rac/rac-system-manage/ddManager.vue'),
                        hidden: true,
                        meta: { title: '钉钉配置', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/user-system-manage/level-protect',
                        name: 'level-protect',
                        component: () => import('@/view/rac/rac-level-protect/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户密码安全等级配置', keepAlive: true, icon: 'apartment' },
                    },
                ],
            },
            {
                path: '/platform-admin-web/system-survey',
                name: 'system-survey',
                meta: { title: '系统概况', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-system-survey/today-survey',
                children: [
                    {
                        path: '/platform-admin-web/user-system-survey/today-survey',
                        name: 'today-survey',
                        component: () => import('@/view/rac/rac-system-survey/Manager.vue'),
                        hidden: true,
                        meta: { title: '今日账号概况', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/platform-admin-web/user-system-survey/authentication',
                        name: 'authentication',
                        component: () => import('@/view/rac/rac-system-authentication/Manager.vue'),
                        hidden: true,
                        meta: { title: '认证概况', keepAlive: true, icon: 'laptop' },
                    },
                ],
            },
        ],
    },
    /** 运营管理 */
    /** 登录 */
    {
        path: '/ops-admin-web/sign-in/ops',
        name: 'ops-sign-in',
        component: () => import('@/view/sign-in/ops/OpsSignIn.vue'),
    },
    {
        path: '/ops-admin-web/forget-password',
        name: 'ops-forget-password',
        component: () => import('@/view/forget-password/Ops.vue'),
    },
    /** 页面 */
    {
        path: '/ops-admin-web',
        name: 'ops-admin-web',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/ops-admin-web/account/rac-account',
        children: [
            {
                path: '/ops-admin-web/person-center',
                name: 'ops-person-center',
                meta: { title: '个人中心', keepAlive: true, icon: 'setting' },
                component: () => import('@/view/rac/rac-account/PersonCenter.vue'),
                hidden: true,
            },
            // 配置
            {
                path: '/ops-admin-web/account',
                name: 'ops-account',
                meta: { title: '账户', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/account/rac-account',
                children: [
                    {
                        path: '/ops-admin-web/account/rac-org',
                        name: 'ops-rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/ops-admin-web/account/rac-account',
                        name: 'ops-rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                    {
                        path: '/ops-admin-web/account/rac-user',
                        name: 'ops-rac-user',
                        component: () => import('@/view/rac/rac-user/Manager.vue'),
                        hidden: true,
                        meta: { title: '用户', keepAlive: true, icon: 'user' },
                    },
                    {
                        path: '/ops-admin-web/account/rac-account-unlock',
                        name: 'ops-rac-account-unlock',
                        component: () => import('@/view/rac/rac-account/ManagerUnlock.vue'),
                        hidden: true,
                        meta: { title: '解锁', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/ops-admin-web/log',
                name: 'ops-log',
                meta: { title: '日志', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/log/lock-log',
                children: [
                    {
                        path: '/ops-admin-web/log/lock-log',
                        name: 'ops-lock-log',
                        component: () => import('@/view/rac/rac-lock-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户解锁日志', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/ops-admin-web/log/disable-log',
                        name: 'ops-disable-log',
                        component: () => import('@/view/rac/rac-disable-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户启/禁用日志', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/ops-admin-web/log/op-log',
                        name: 'ops-op-log',
                        component: () => import('@/view/rac/rac-op-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '操作日志', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/ops-admin-web/system-manage',
                name: 'ops-system-manage',
                meta: { title: '系统管理', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/user-system-manage/weChat-config',
                children: [
                    {
                        path: '/ops-admin-web/user-system-manage/weChat-config',
                        name: 'ops-weChat-config',
                        component: () => import('@/view/rac/rac-system-manage/wxManager.vue'),
                        hidden: true,
                        meta: { title: '公众号配置', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/ops-admin-web/user-system-manage/dingTalk-config',
                        name: 'ops-dingTalk-config',
                        component: () => import('@/view/rac/rac-system-manage/ddManager.vue'),
                        hidden: true,
                        meta: { title: '钉钉配置', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/ops-admin-web/user-system-manage/level-protect',
                        name: 'ops-level-protect',
                        component: () => import('@/view/rac/rac-level-protect/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户密码安全等级配置', keepAlive: true, icon: 'apartment' },
                    },
                ],
            },
            {
                path: '/ops-admin-web/system-survey',
                name: 'ops-system-survey',
                meta: { title: '系统概况', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/user-system-survey/today-survey',
                children: [
                    {
                        path: '/ops-admin-web/user-system-survey/today-survey',
                        name: 'ops-today-survey',
                        component: () => import('@/view/rac/rac-system-survey/Manager.vue'),
                        hidden: true,
                        meta: { title: '今日账号概况', keepAlive: true, icon: 'apartment' },
                    },
                ],
            },
        ],
    },
    /** 统一应用*/
    /** 登录 */
    {
        path: '/unified-auth/sign-in/unified',
        name: 'unified-sign-in',
        component: () => import('@/view/sign-in/unified/UnifiedSignIn.vue'),
    },
    /**忘记密码*/
    {
        path: '/unified-auth/forget-password',
        name: 'unified-forget-password',
        component: () => import('@/view/forget-password/Unified.vue'),
    },
    {
        path: '/unified-auth',
        name: 'unified-auth',
        component: RouteView,
        redirect: '/unified-auth/app',
        children: [
            {
                path: '/unified-auth/app',
                name: 'app',
                meta: { title: '个人应用平台菜单', keepAlive: true, icon: 'setting' },
                component: () => import('@/view/app/Index.vue'),
                redirect: '/unified-auth/app/index',
                children: [
                    {
                        path: '/unified-auth/app/index',
                        name: 'app-index',
                        meta: { title: '我的应用', keepAlive: false },
                        component: () => import('@/view/app/index/Index.vue'),
                    },
                    {
                        path: '/unified-auth/app/auth',
                        name: 'app-auth',
                        meta: { title: '安全中心', keepAlive: false },
                        component: () => import('@/view/app/security-center/Index.vue'),
                    },
                    {
                        path: '/unified-auth/app/log',
                        name: 'app-log',
                        meta: { title: '操作日志', keepAlive: false },
                        component: () => import('@/view/app/log/Index.vue'),
                    },
                ],
            },
        ],
    },
    /** launch-demo1*/

    {
        path: '/launch-demo1',
        name: 'launch-demo1',
        meta: { title: '系统1', keepAlive: true, icon: 'setting' },
        component: () => import('@/view/launch-demo1/index/Index.vue'),
        redirect: '/launch-demo1/framework/department',
        children: [
            {
                path: '/launch-demo1/framework',
                name: 'launch-demo1-framework',
                component: RouteView,
                hidden: true,
                meta: { title: '系统框架', keepAlive: true, icon: 'global' },
                children: [
                    {
                        path: '/launch-demo1/framework/department',
                        name: 'launch-demo1-framework-department',
                        component: () => import('@/view/launch-demo1/framework/department/Index.vue'),
                        hidden: true,
                        meta: { title: '工作量管理部门', keepAlive: true, icon: 'global' },
                    },
                ],
            },
        ],
    },

    //demo3
    {
        path: '/launch-demo3',
        name: 'launch-demo3',
        component: () => import('@/view/launch-demo3/index/Index.vue'),
        redirect: '/launch-demo3/annual-declaration/personal-profile-table',
        children: [
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
                        meta: { title: '全年概况', keepAlive: true, icon: 'global' },
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
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
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
                    {
                        path: '/launch-demo3/annual-statistic/statistical-encapsulation',
                        name: 'launch-demo3-annual-statistic-statistical-encapsulation',
                        component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
                        meta: { title: '统计/封装', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/personal-statistics-table',
                        name: 'launch-demo3-annual-statistic-personal-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-overview-table.vue'),
                        meta: { title: '个人统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/department-statistics-table',
                        name: 'launch-demo3-annual-statistic-department-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-reward-table.vue'),
                        meta: { title: '部门统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/teacher-statistics-table',
                        name: 'launch-demo3-annual-statistic-teacher-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '专职教师统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/school-statistics-table',
                        name: 'launch-demo3-annual-statistic-school-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '全校统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/workload',
                        name: 'launch-demo3-annual-statistic-workload',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '本年度工作量报表', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/annual-statistic/labor-cost',
                        name: 'launch-demo3-annual-statistic-labor-cost',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '劳务费发放报表', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
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
                        path: '/launch-demo3/summary-years/statistical-encapsulation',
                        name: 'launch-demo3-summary-years-statistical-encapsulation',
                        component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
                        meta: { title: '历年未通过成果', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/personal-statistics-table',
                        name: 'launch-demo3-summary-years-personal-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-overview-table.vue'),
                        meta: { title: '个人历年概况', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/department-statistics-table',
                        name: 'launch-demo3-summary-years-department-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-reward-table.vue'),
                        meta: { title: '全校历年概况', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/teacher-statistics-table',
                        name: 'launch-demo3-summary-years-teacher-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '个人统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/school-statistics-table',
                        name: 'launch-demo3-summary-years-school-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '部门统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/workload',
                        name: 'launch-demo3-summary-years-workload',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '专职教师统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/labor-cost',
                        name: 'launch-demo3-summary-years-labor-cost',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '全校统计查看', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/summary-years/labor1-cost',
                        name: 'launch-demo3-summary-years-labor1-cost',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '历年工作量报表', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
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
                        path: '/launch-demo3/result-allocation/statistical-encapsulation',
                        name: 'launch-demo3-result-allocation-statistical-encapsulation',
                        component: () => import('@/view/launch-demo3/annual-declaration/personal-profile-table.vue'),
                        meta: { title: '用户管理', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/result-allocation/personal-statistics-table',
                        name: 'launch-demo3-result-allocation-personal-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-overview-table.vue'),
                        meta: { title: '职称管理', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/result-allocation/department-statistics-table',
                        name: 'launch-demo3-result-allocation-department-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-reward-table.vue'),
                        meta: { title: '日志', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                    {
                        path: '/launch-demo3/result-allocation/teacher-statistics-table',
                        name: 'launch-demo3-result-allocation-teacher-statistics-table',
                        component: () => import('@/view/launch-demo3/annual-declaration/annual-auxiliary-table.vue'),
                        meta: { title: '部门管理', keepAlive: true, icon: 'global' },
                        hidden: true,
                    },
                ],
            },
        ],
    },

    /** 404 */
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];
