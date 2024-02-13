/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

// Reactivity Transform
// https://vue-macros.sxzz.moe/zh-CN/features/reactivity-transform.html#typescript-integration
/// <reference types="@vue-macros/reactivity-transform/macros-global" />

declare interface ImportMetaEnv {
    /** 基础路径 */
    readonly VITE_BASE_URL: string;
    /** 模拟网络延迟(单位毫秒，为0或不设置为不模拟) */
    readonly VITE_SIMULATE_NET_DELAY: number;
    /** 是否将delete、put等请求转换为post请求(默认为false) */
    readonly VITE_X_HTTP_METHOD_OVERRIDEE: string;
    /** 是否自定义请求地址 */
    readonly VITE_REQUEST_CUSTOMIZE: string;
    /** 自定义请求的协议 */
    readonly VITE_REQUEST_BASE_SCHEME: string;
    /** 自定义请求的主机 */
    readonly VITE_REQUEST_BASE_HOST: string;
    /** 自定义请求的端口号 */
    readonly VITE_REQUEST_BASE_PORT: string;
    /** 自定义请求的基础路径 */
    readonly VITE_REQUEST_BASE_PATH: string;
    /** Vite代理数组 */
    readonly VITE_PROXIES: string;
}

declare interface ImportMeta {
    readonly env: ImportMetaEnv;
}
