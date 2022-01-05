import { AppIdDic } from '@/dic/AppIdDic';
import { getAppIdByUrl } from '@/util/common';
import LaunchDemo1 from './launch-demo1-router.config.js';
import LaunchDemo2 from './launch-demo2-router.config.js';
import LaunchDemo3 from './launch-demo3-router.config.js';
import LaunchDemo4 from './launch-demo4-router.config.js';
import LaunchDemo5 from './launch-demo5-router.config.js';
import LaunchDemo6 from './launch-demo6-router.config.js';
import LaunchDemo7 from './launch-demo7-router.config.js';
import LaunchDemo8 from './launch-demo8-router.config.js';
import LaunchDemo9 from './launch-demo9-router.config.js';

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
        path: '/platform-admin-web/sign-in',
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
                meta: {
                    title: '个人中心',
                    keepAlive: true,
                    icon: 'setting',
                },
                component: () => import('@/view/rac/rac-account/PersonCenter.vue'),
                hidden: true,
            },
            /** 配置 */
            {
                path: '/platform-admin-web/base',
                name: 'base',
                meta: {
                    title: '基础',
                    keepAlive: true,
                    icon: 'setting',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/base/rac-realm',
                children: [
                    {
                        path: '/platform-admin-web/base/rac-realm',
                        name: 'rac-realm',
                        component: () => import('@/view/rac/rac-realm/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '领域',
                            keepAlive: true,
                            icon: 'global',
                        },
                    },
                    {
                        path: '/platform-admin-web/base/rac-app',
                        name: 'rac-app',
                        component: () => import('@/view/rac/rac-app/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '应用',
                            keepAlive: true,
                            icon: 'appstore',
                        },
                    },
                    {
                        path: '/platform-admin-web/base/rac-perm',
                        name: 'rac-perm',
                        component: () => import('@/view/rac/rac-perm/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '权限',
                            keepAlive: true,
                            icon: 'deployment-unit',
                        },
                    },
                    {
                        path: '/platform-admin-web/base/rac-role',
                        name: 'rac-role',
                        component: () => import('@/view/rac/rac-role/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '角色',
                            keepAlive: true,
                            icon: 'smile',
                        },
                    },
                    {
                        path: '/platform-admin-web/base/rac-dic',
                        name: 'rac-dic',
                        component: () => import('@/view/rac/rac-dic/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '字典',
                            keepAlive: true,
                            icon: 'read',
                        },
                    },
                ],
            },
            {
                path: '/platform-admin-web/account',
                name: 'account',
                meta: {
                    title: '账户',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/account/rac-account',
                children: [
                    {
                        path: '/platform-admin-web/account/rac-org',
                        name: 'rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '组织',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/account/rac-account',
                        name: 'rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                    {
                        path: '/platform-admin-web/account/rac-user',
                        name: 'rac-user',
                        component: () => import('@/view/rac/rac-user/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '用户',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                    {
                        path: '/platform-admin-web/account/rac-account-unlock',
                        name: 'rac-account-unlock',
                        component: () => import('@/view/rac/rac-account/ManagerUnlock.vue'),
                        hidden: true,
                        meta: {
                            title: '解锁',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                ],
            },
            {
                path: '/platform-admin-web/log',
                name: 'log',
                meta: {
                    title: '日志',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/log/lock-statistics',
                children: [
                    {
                        path: '/platform-admin-web/log/lock-statistics',
                        name: 'lock-statistics',
                        component: () => import('@/view/rac/rac-statistics-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '日志统计',
                            keepAlive: true,
                            icon: 'deployment-unit',
                        },
                    },
                    {
                        path: '/platform-admin-web/log/lock-log',
                        name: 'lock-log',
                        component: () => import('@/view/rac/rac-lock-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户解锁日志',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/log/disable-log',
                        name: 'disable-log',
                        component: () => import('@/view/rac/rac-disable-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户启/禁用日志',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/log/op-log',
                        name: 'op-log',
                        component: () => import('@/view/rac/rac-op-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '操作日志',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                ],
            },
            {
                path: '/platform-admin-web/user-synchro',
                name: 'user-synchro',
                meta: {
                    title: '数据管理',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-synchro/account-sy',
                children: [
                    {
                        path: '/platform-admin-web/user-synchro/account-sy',
                        name: 'account-sy',
                        component: () => import('@/view/rac/rac-user-synchro/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '同步策略',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                ],
            },
            {
                path: '/platform-admin-web/system-manage',
                name: 'system-manage',
                meta: {
                    title: '系统管理',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-system-manage/weChat-config',
                children: [
                    {
                        path: '/platform-admin-web/user-system-manage/weChat-config',
                        name: 'weChat-config',
                        component: () => import('@/view/rac/rac-system-manage/wxManager.vue'),
                        hidden: true,
                        meta: {
                            title: '公众号配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/user-system-manage/dingTalk-config',
                        name: 'dingTalk-config',
                        component: () => import('@/view/rac/rac-system-manage/ddManager.vue'),
                        hidden: true,
                        meta: {
                            title: '钉钉配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/user-system-manage/level-protect',
                        name: 'level-protect',
                        component: () => import('@/view/rac/rac-level-protect/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户密码安全等级配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                ],
            },
            {
                path: '/platform-admin-web/system-survey',
                name: 'system-survey',
                meta: {
                    title: '系统概况',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/platform-admin-web/user-system-survey/today-survey',
                children: [
                    {
                        path: '/platform-admin-web/user-system-survey/today-survey',
                        name: 'today-survey',
                        component: () => import('@/view/rac/rac-system-survey/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '今日账号概况',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/platform-admin-web/user-system-survey/authentication',
                        name: 'authentication',
                        component: () => import('@/view/rac/rac-system-authentication/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '认证概况',
                            keepAlive: true,
                            icon: 'laptop',
                        },
                    },
                ],
            },
        ],
    },
    /** 运营管理 */
    /** 登录 */
    {
        path: '/ops-admin-web/sign-in',
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
                meta: {
                    title: '个人中心',
                    keepAlive: true,
                    icon: 'setting',
                },
                component: () => import('@/view/rac/rac-account/PersonCenter.vue'),
                hidden: true,
            },
            // 配置
            {
                path: '/ops-admin-web/account',
                name: 'ops-account',
                meta: {
                    title: '账户',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/account/rac-account',
                children: [
                    {
                        path: '/ops-admin-web/account/rac-org',
                        name: 'ops-rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '组织',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/ops-admin-web/account/rac-account',
                        name: 'ops-rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                    {
                        path: '/ops-admin-web/account/rac-user',
                        name: 'ops-rac-user',
                        component: () => import('@/view/rac/rac-user/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '用户',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                    {
                        path: '/ops-admin-web/account/rac-account-unlock',
                        name: 'ops-rac-account-unlock',
                        component: () => import('@/view/rac/rac-account/ManagerUnlock.vue'),
                        hidden: true,
                        meta: {
                            title: '解锁',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                ],
            },
            {
                path: '/ops-admin-web/log',
                name: 'ops-log',
                meta: {
                    title: '日志',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/log/lock-log',
                children: [
                    {
                        path: '/ops-admin-web/log/lock-log',
                        name: 'ops-lock-log',
                        component: () => import('@/view/rac/rac-lock-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户解锁日志',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/ops-admin-web/log/disable-log',
                        name: 'ops-disable-log',
                        component: () => import('@/view/rac/rac-disable-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户启/禁用日志',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/ops-admin-web/log/op-log',
                        name: 'ops-op-log',
                        component: () => import('@/view/rac/rac-op-log/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '操作日志',
                            keepAlive: true,
                            icon: 'user',
                        },
                    },
                ],
            },
            {
                path: '/ops-admin-web/system-manage',
                name: 'ops-system-manage',
                meta: {
                    title: '系统管理',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/user-system-manage/weChat-config',
                children: [
                    {
                        path: '/ops-admin-web/user-system-manage/weChat-config',
                        name: 'ops-weChat-config',
                        component: () => import('@/view/rac/rac-system-manage/wxManager.vue'),
                        hidden: true,
                        meta: {
                            title: '公众号配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/ops-admin-web/user-system-manage/dingTalk-config',
                        name: 'ops-dingTalk-config',
                        component: () => import('@/view/rac/rac-system-manage/ddManager.vue'),
                        hidden: true,
                        meta: {
                            title: '钉钉配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                    {
                        path: '/ops-admin-web/user-system-manage/level-protect',
                        name: 'ops-level-protect',
                        component: () => import('@/view/rac/rac-level-protect/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '账户密码安全等级配置',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                ],
            },
            {
                path: '/ops-admin-web/system-survey',
                name: 'ops-system-survey',
                meta: {
                    title: '系统概况',
                    keepAlive: true,
                    icon: 'ant-design',
                },
                component: RouteView,
                hidden: true,
                redirect: '/ops-admin-web/user-system-survey/today-survey',
                children: [
                    {
                        path: '/ops-admin-web/user-system-survey/today-survey',
                        name: 'ops-today-survey',
                        component: () => import('@/view/rac/rac-system-survey/Manager.vue'),
                        hidden: true,
                        meta: {
                            title: '今日账号概况',
                            keepAlive: true,
                            icon: 'apartment',
                        },
                    },
                ],
            },
        ],
    },
    /** 统一应用*/
    /** 登录 */
    {
        path: '/unified-auth/sign-in',
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
                meta: {
                    title: '个人应用平台菜单',
                    keepAlive: true,
                    icon: 'setting',
                },
                component: () => import('@/view/app/Index.vue'),
                redirect: '/unified-auth/app/index',
                children: [
                    {
                        path: '/unified-auth/app/index',
                        name: 'app-index',
                        meta: {
                            title: '我的应用',
                            keepAlive: false,
                        },
                        component: () => import('@/view/app/index/Index.vue'),
                    },
                    {
                        path: '/unified-auth/app/auth',
                        name: 'app-auth',
                        meta: {
                            title: '安全中心',
                            keepAlive: false,
                        },
                        component: () => import('@/view/app/security-center/Index.vue'),
                    },
                    {
                        path: '/unified-auth/app/log',
                        name: 'app-log',
                        meta: {
                            title: '操作日志',
                            keepAlive: false,
                        },
                        component: () => import('@/view/app/log/Index.vue'),
                    },
                ],
            },
        ],
    },
    {
        ...LaunchDemo1,
    },
    {
        path: '/launch-demo1/login',
        name: 'launch-demo1-login',
        component: () => import('@/view/launch-demo1/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo2,
    },
    {
        path: '/launch-demo2/login',
        name: 'launch-demo2-login',
        component: () => import('@/view/launch-demo2/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo3,
    },
    {
        path: '/launch-demo3/login',
        name: 'launch-demo3-login',
        component: () => import('@/view/launch-demo3/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo4,
    },
    {
        path: '/launch-demo4/login',
        name: 'launch-demo4-login',
        component: () => import('@/view/launch-demo4/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo5,
    },
    {
        ...LaunchDemo6,
    },
    {
        ...LaunchDemo7,
    },
    {
        path: '/launch-demo7/login',
        name: 'launch-demo7-login',
        component: () => import('@/view/launch-demo7/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo8,
    },
    {
        path: '/launch-demo8/login',
        name: 'launch-demo8-login',
        component: () => import('@/view/launch-demo8/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },
    {
        ...LaunchDemo9,
    },
    {
        path: '/launch-demo9/login',
        name: 'launch-demo9-login',
        component: () => import('@/view/launch-demo9/login/Index.vue'),
        hidden: true,
        meta: {
            title: '登录页',
            keepAlive: true,
            icon: 'global',
        },
    },

    /** 404 */
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    {
        path: '/research-workload2',
        name: 'ceshi',
        hidden: true,
        component: () => import('@/view/launch-demo3/search/baseSearch.vue'),
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
    },
];
