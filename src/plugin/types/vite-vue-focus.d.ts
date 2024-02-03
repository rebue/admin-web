/// <reference types="vite/client"

export {};

declare module 'vue' {
    interface ComponentCustomProperties {
        /**
         * 设置焦点
         *
         * @param el 要设置焦点的元素(如果传入的值是null，则不处理且返回false)
         * @returns 返回是否成功设置焦点
         */
        $forcus: (el: Element | null) => boolean;
        /**
         * 设置焦点到第一个提示错误的输入框
         */
        $focusError: () => boolean;
    }
}
