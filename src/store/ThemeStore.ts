// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)

// 第一个参数是你的应用中 Store 的唯一 ID。
export const useThemeStore = defineStore('themeStore', {
    state: (): State => ({
        primaryColor: '',
    }),
    persist: true,
});

// 中央状态的类型
// 注意: 目前pinia-plugin-persistedstate插件还不支持map的属性类型
interface State {
    /**
     * 主题色彩
     */
    primaryColor: string;
}

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}
