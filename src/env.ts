/** 请求的基础URL */
export const requestBasePath = (function () {
    // 如果不自定义，直接返回base项设置的URL(https://cn.vitejs.dev/config/#base)
    if (!import.meta.env.VITE_REQUEST_CUSTOMIZE) {
        return '';
    }

    // 自定义往下走
    /** 请求基础URL的协议部分 */
    const requestBaseScheme = import.meta.env.VITE_REQUEST_BASE_SCHEME;
    /** 请求基础URL的主机部分 */
    const requestBaseHost = import.meta.env.VITE_REQUEST_BASE_HOST;
    /** 请求基础URL的端口号部分 */
    const requestBasePort = import.meta.env.VITE_REQUEST_BASE_PORT;
    // 端口号
    const port = requestBasePort ? ':' + requestBasePort : '';
    // 返回自定义拼接
    return requestBaseScheme + '://' + requestBaseHost + port + import.meta.env.VITE_REQUEST_BASE_PATH;
})();

console.log('requestBasePath', requestBasePath);

/** 模拟网络延迟(单位毫秒，为0或不设置为不模拟) */
export const simulateNetDelay: number = import.meta.env.VITE_SIMULATE_NET_DELAY - 0;

/** 是否将delete、put等请求转换为post请求(默认为false) */
export const xHttpMethodOverride: boolean = import.meta.env.VITE_X_HTTP_METHOD_OVERRIDE
    ? JSON.parse(import.meta.env.VITE_X_HTTP_METHOD_OVERRIDE)
    : false;