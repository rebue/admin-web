const RouteView = {
    name: 'RouteView',
    render: h => h('router-view'),
};

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouters = {
    path: '/launch-demo9',
    name: 'launch-demo9',
    meta: { title: '系统9', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo9/index/Index.vue'),
    redirect: '/launch-demo9/archiveModule/fileCollection',
    children: [
        {
            path: '/launch-demo9/archiveModule',
            name: 'launch-demo9-archiveModule',
            component: RouteView,
            hidden: true,
            meta: { title: '档案模块', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/archiveModule/fileCollection',
                    name: 'launch-demo9-archiveModule-fileCollection',
                    component: () => import('@/view/launch-demo9/archiveModule/fileCollection/Index.vue'),
                    hidden: true,
                    meta: { title: '档案收集中心', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/archiveModule/fileManage',
                    name: 'launch-demo9-archiveModule-fileManage',
                    component: () => import('@/view/launch-demo9/archiveModule/fileManage/Index.vue'),
                    hidden: true,
                    meta: { title: '档案管理中心', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/archiveModule/filePreservation',
                    name: 'launch-demo9-archiveModule-filePreservation',
                    component: () => import('@/view/launch-demo9/archiveModule/filePreservation/Index.vue'),
                    hidden: true,
                    meta: { title: '档案保存中心', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/archiveModule/orderManage',
                    name: 'launch-demo9-archiveModule-orderManage',
                    component: () => import('@/view/launch-demo9/archiveModule/orderManage/Index.vue'),
                    hidden: true,
                    meta: { title: '流程管理中心', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/archiveModule/businessManage',
                    name: 'launch-demo9-archiveModule-businessManage',
                    component: () => import('@/view/launch-demo9/archiveModule/businessManage/Index.vue'),
                    hidden: true,
                    meta: { title: '业务管理中心', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
