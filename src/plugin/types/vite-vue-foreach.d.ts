/// <reference types="vite/client"

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 遍历VNode的函数 */
        $foreach: (obj: VNode, callback: (node: VNode) => boolean) => boolean;
    }
}
