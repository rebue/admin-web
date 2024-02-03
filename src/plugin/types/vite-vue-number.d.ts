/// <reference types="vite/client"

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /** 只允许输入数字 */
        'vNumber': boolean;
        /** 只允许输入数字和点 */
        'vDecimal': boolean;
    }
}
