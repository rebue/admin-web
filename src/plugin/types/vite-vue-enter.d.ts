/// <reference types="vite/client"

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 按回车键时回调的函数 */
        vEnter: () => void;
    }
}
