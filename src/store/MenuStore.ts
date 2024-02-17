// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)

import { AdmMenuApi } from '~/api/adm/AdmMenuApi';
import { Ro } from '~/ro/Ro';
import { listToTree } from '~/util/tree';
import { AdmMenuVo } from '~/vo/adm/AdmMenuVo';

// 第一个参数是你的应用中 Store 的唯一 ID。
export const useMenuStore = defineStore('menuStore', {
    state: (): State => ({
        menus: [],
    }),
    actions: {
        refreshMenus() {
            AdmMenuApi.list()
                // 处理返回的结果
                .then((ro: Ro) => {
                    if (ro.result > 0) {
                        const list = listToTree(ro.data.list) as AdmMenuVo[];
                        this.$patch({ menus: list });
                    }
                });
        },
    },
    persist: false,
});

interface State {
    /**
     * 菜单列表
     */
    menus: AdmMenuVo[];
}

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot));
}
