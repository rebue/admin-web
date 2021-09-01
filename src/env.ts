/** 当前nodejs运行环境 */
export const nodeEnv = process.env.NODE_ENV;
/** 请求基础URL的协议部分 */
export const requestBaseScheme = process.env.VUE_APP_REQUEST_BASE_SCHEME;
/** 请求基础URL的主机部分 */
export const requestBaseHost = process.env.VUE_APP_REQUEST_BASE_HOST;
/** 请求基础URL的端口号部分 */
export const requestBasePort = process.env.VUE_APP_REQUEST_BASE_PORT;
/** 请求基础URL */
export const requestBaseUrl =
    process.env.VUE_APP_REQUEST_BASE_SCHEME +
    '://' +
    process.env.VUE_APP_REQUEST_BASE_HOST +
    (process.env.VUE_APP_REQUEST_BASE_PORT &&
    process.env.VUE_APP_REQUEST_BASE_PORT.trim() !== '' &&
    ((process.env.VUE_APP_REQUEST_BASE_SCHEME === 'http' && process.env.VUE_APP_REQUEST_BASE_PORT === 80) ||
        (process.env.VUE_APP_REQUEST_BASE_SCHEME === 'https' && process.env.VUE_APP_REQUEST_BASE_PORT === 443))
        ? ''
        : ':' + process.env.VUE_APP_REQUEST_BASE_PORT);

/** JWT Token的Key */
export const jwtTokenKey = process.env.VUE_APP_JWT_TOKEN_KEY;
export const appIdKey = process.env.VUE_APP_APP_ID_KEY;

/** 是否模拟网络延迟 */
export const isSimulateNetDelay: boolean = JSON.parse(process.env.VUE_APP_SIMULATE_NET_DELAY);

/**  iconfont.cn中项目库的地址 */
export const iconFontUrl = process.env.VUE_APP_ICON_FONT_URL;

/** 是否开启将delete、put等请求转换为post请求 */
export const xHTTPMethodOverride = process.env.VUE_APP_X_HTTP_METHOD_OVERRIDE != 'false' || false;
