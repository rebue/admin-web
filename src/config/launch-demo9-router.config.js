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
    meta: { title: '档案管理系统', keepAlive: true, icon: 'setting' },
    component: () => import('@/view/launch-demo9/index/Index.vue'),
    redirect: '/launch-demo9/fileCollection/fileArrangement',
    children: [
        {
            path: '/launch-demo9/fileCollection',
            name: 'launch-demo9-fileCollection',
            component: RouteView,
            hidden: true,
            meta: { title: '档案收集中心', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/fileCollection/fileArrangement',
                    name: 'launch-demo9-fileCollection-fileArrangement',
                    component: () => import('@/view/launch-demo9/fileCollection/fileArrangement/Index.vue'),
                    hidden: true,
                    meta: { title: '文件整理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/fileCollection/fileGroupBox',
                    name: 'launch-demo9-fileCollection-fileGroupBox',
                    component: () => import('@/view/launch-demo9/fileCollection/fileGroupBox/Index.vue'),
                    hidden: true,
                    meta: { title: '文件组合', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo9/fileManage',
            name: 'launch-demo9-fileManage',
            component: RouteView,
            hidden: true,
            meta: { title: '档案管理中心', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/fileManage/fileManage',
                    name: 'launch-demo9-fileManage-fileManage',
                    component: () => import('@/view/launch-demo9/fileManage/fileManage/Index.vue'),
                    hidden: true,
                    meta: { title: '档案管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/fileManage/fileTransfer',
                    name: 'launch-demo9-fileManage-fileTransfer',
                    component: () => import('@/view/launch-demo9/fileManage/fileTransfer/Index.vue'),
                    hidden: true,
                    meta: { title: '档案移交', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo9/filePreservation',
            name: 'launch-demo9-filePreservation',
            component: RouteView,
            hidden: true,
            meta: { title: '档案保存中心', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/filePreservation/warehouseMaintenance',
                    name: 'launch-demo9-filePreservation-warehouseMaintenance',
                    component: () => import('@/view/launch-demo9/filePreservation/warehouseMaintenance/Index.vue'),
                    hidden: true,
                    meta: { title: '库房信息维护', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/filePreservation/warehouseManage',
                    name: 'launch-demo9-filePreservation-warehouseManage',
                    component: () => import('@/view/launch-demo9/filePreservation/warehouseManage/Index.vue'),
                    hidden: true,
                    meta: { title: '库房盘点管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo9/programManage',
            name: 'launch-demo9-programManage',
            component: RouteView,
            hidden: true,
            meta: { title: '流程管理中心', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/programManage/workFlow',
                    name: 'launch-demo9-programManage-workFlow',
                    component: () => import('@/view/launch-demo9/programManage/workFlow/Index.vue'),
                    hidden: true,
                    meta: { title: '工作流程管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/programManage/operationFlow',
                    name: 'launch-demo9-programManage-operationFlow',
                    component: () => import('@/view/launch-demo9/programManage/operationFlow/Index.vue'),
                    hidden: true,
                    meta: { title: '业务流程管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
        {
            path: '/launch-demo9/businessManage',
            name: 'launch-demo9-businessManage',
            component: RouteView,
            hidden: true,
            meta: { title: '业务管理中心', keepAlive: true, icon: 'global' },
            children: [
                {
                    path: '/launch-demo9/businessManage/fileClassification',
                    name: 'launch-demo9-businessManage-fileClassification',
                    component: () => import('@/view/launch-demo9/businessManage/fileClassification/Index.vue'),
                    hidden: true,
                    meta: { title: '档案分类管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/businessManage/dataDictionary',
                    name: 'launch-demo9-businessManage-dataDictionary',
                    component: () => import('@/view/launch-demo9/businessManage/dataDictionary/Index.vue'),
                    hidden: true,
                    meta: { title: '数据字典管理', keepAlive: true, icon: 'global' },
                },
                {
                    path: '/launch-demo9/businessManage/annualProject',
                    name: 'launch-demo9-businessManage-annualProject',
                    component: () => import('@/view/launch-demo9/businessManage/annualProject/Index.vue'),
                    hidden: true,
                    meta: { title: '年度项目管理', keepAlive: true, icon: 'global' },
                },
            ],
        },
    ],
};

export default constantRouters;
