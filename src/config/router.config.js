import { getAppId } from '@/util/cookie';
import { AppIdDic } from '@/dic/AppIdDic';
import UnifiedLogin from '@/view/unified/UnifiedLogin';
import Demo from '@/view/demo/Demo';

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
        component: Demo,
    },
    {
        path: '/unifiedLogin',
        name: 'unifiedLogin',
        component: UnifiedLogin,
    },
    {
        path: '/sign-in',
        name: 'sign-in',
        component: RouteView,
        redirect: () => (getAppId() === AppIdDic.PlatformAdminWeb ? '/sign-in/platform' : '/sign-in/ops'),
        children: [
            {
                path: '/sign-in/platform',
                name: 'platform-sign-in',
                component: () => import('@/view/sign-in/platform/PlatformSignIn.vue'),
            },
            {
                path: '/sign-in/ops',
                name: 'ops-sign-in',
                component: () => import('@/view/sign-in/ops/OpsSignIn.vue'),
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/view/404/404.vue'),
    },
    {
        path: '/',
        name: 'index',
        component: () => import('@/view/index/Index.vue'),
        redirect: '/base/rac-realm',
        children: [
            {
                path: '/person-center',
                name: 'person-center',
                meta: { title: '个人中心', keepAlive: true, icon: 'setting' },
                component: () => import('@/view/rac/rac-account/PersonCenter.vue'),
                hidden: true,
            },
            /** 平台管理应用 */
            {
                path: '/base',
                name: 'base',
                meta: { title: '基础', keepAlive: true, icon: 'setting' },
                component: RouteView,
                hidden: true,
                redirect: '/base/rac-realm',
                children: [
                    {
                        path: '/base/rac-realm',
                        name: 'rac-realm',
                        component: () => import('@/view/rac/rac-realm/Manager.vue'),
                        hidden: true,
                        meta: { title: '领域', keepAlive: true, icon: 'global' },
                    },
                    {
                        path: '/base/rac-app',
                        name: 'rac-app',
                        component: () => import('@/view/rac/rac-app/Manager.vue'),
                        hidden: true,
                        meta: { title: '应用', keepAlive: true, icon: 'appstore' },
                    },
                    {
                        path: '/base/rac-perm',
                        name: 'rac-perm',
                        component: () => import('@/view/rac/rac-perm/Manager.vue'),
                        hidden: true,
                        meta: { title: '权限', keepAlive: true, icon: 'deployment-unit' },
                    },
                    {
                        path: '/base/rac-role',
                        name: 'rac-role',
                        component: () => import('@/view/rac/rac-role/Manager.vue'),
                        hidden: true,
                        meta: { title: '角色', keepAlive: true, icon: 'smile' },
                    },
                    {
                        path: '/base/rac-dic',
                        name: 'rac-dic',
                        component: () => import('@/view/rac/rac-dic/Manager.vue'),
                        hidden: true,
                        meta: { title: '字典', keepAlive: true, icon: 'read' },
                    },
                ],
            },
            {
                path: '/account',
                name: 'account',
                meta: { title: '账户', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/account/rac-account',
                children: [
                    {
                        path: '/account/rac-org',
                        name: 'rac-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/account/rac-account',
                        name: 'rac-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/log',
                name: 'log',
                meta: { title: '日志', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/log/lock-log',
                children: [
                    {
                        path: '/log/lock-log',
                        name: 'lock-log',
                        component: () => import('@/view/rac/rac-lock-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '锁定日志', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/log/op-log',
                        name: 'op-log',
                        component: () => import('@/view/rac/rac-op-log/Manager.vue'),
                        hidden: true,
                        meta: { title: '操作日志', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            /** 运营管理应用 */
            {
                path: '/user',
                name: 'user',
                meta: { title: '用户中心', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/user/rac-account',
                children: [
                    {
                        path: '/user/ops-org',
                        name: 'ops-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/user/ops-account',
                        name: 'ops-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                ],
            },
            {
                path: '/ops',
                name: 'ops',
                meta: { title: '运营管理', keepAlive: true, icon: 'ant-design' },
                component: RouteView,
                hidden: true,
                redirect: '/user/rac-account',
                children: [
                    {
                        path: '/user/ops-org',
                        name: 'ops-org',
                        component: () => import('@/view/rac/rac-org/Manager.vue'),
                        hidden: true,
                        meta: { title: '组织', keepAlive: true, icon: 'apartment' },
                    },
                    {
                        path: '/user/ops-account',
                        name: 'ops-account',
                        component: () => import('@/view/rac/rac-account/Manager.vue'),
                        hidden: true,
                        meta: { title: '账户', keepAlive: true, icon: 'user' },
                    },
                ],
            },
        ],
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' },
];
