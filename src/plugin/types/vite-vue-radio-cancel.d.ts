/// <reference types="vite/client"

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 点击radio可取消选择 */
        vRadioCancel: boolean;
    }
}
