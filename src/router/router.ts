import { RouteRecordRaw } from 'vue-router';
import { useMenuStore } from '~/store/MenuStore';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('~/component/hlw/HelloWorld.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// 全局前置守卫
router.beforeEach(() => {
    const menuStore = useMenuStore();
    const { menus, refreshMenus } = $(menuStore);
    if (menus.length === 0) {
        menuStore.$subscribe((_mutation, state) => {
            state.menus.forEach((menu) => {
                router.addRoute({
                    path: menu.path,
                    name: menu.name,
                    component: () => import(/* @vite-ignore */ menu.component),
                });
            });
        });
        refreshMenus();
    }
    return true;
});

export default router;
