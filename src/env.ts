const env = {
    /** 当前nodejs运行环境 */
    nodeEnv: process.env.NODE_ENV,
    /** 请求基础URL的协议部分 */
    requestBaseScheme: process.env.VUE_APP_REQUEST_BASE_SCHEME,
    /** 请求基础URL的主机部分 */
    requestBaseHost: process.env.VUE_APP_REQUEST_BASE_HOST,
    /** 请求基础URL的端口号部分 */
    requestBasePort: process.env.VUE_APP_REQUEST_BASE_PORT,
    /** 请求基础URL */
    requestBaseUrl:
        process.env.VUE_APP_REQUEST_BASE_SCHEME +
        '://' +
        process.env.VUE_APP_REQUEST_BASE_HOST +
        (process.env.VUE_APP_REQUEST_BASE_PORT &&
        process.env.VUE_APP_REQUEST_BASE_PORT.trim() !== '' &&
        ((process.env.VUE_APP_REQUEST_BASE_SCHEME === 'http' && process.env.VUE_APP_REQUEST_BASE_PORT === 80) ||
            (process.env.VUE_APP_REQUEST_BASE_SCHEME === 'https' && process.env.VUE_APP_REQUEST_BASE_PORT === 443))
            ? ''
            : ':' + process.env.VUE_APP_REQUEST_BASE_PORT),
};

console.log('env', env);

export default env;
