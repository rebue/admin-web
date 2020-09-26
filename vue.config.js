// 设置请求的基础URL
process.env.VUE_APP_REQUEST_BASE_URL =
    process.env.VUE_APP_REQUEST_BASE_SCHEME +
    '://' +
    process.env.VUE_APP_REQUEST_BASE_HOST +
    (process.env.VUE_APP_REQUEST_BASE_PORT &&
    process.env.VUE_APP_REQUEST_BASE_PORT.trim() !== '' &&
    ((process.env.VUE_APP_REQUEST_BASE_SCHEME === 'http' && process.env.VUE_APP_REQUEST_BASE_PORT === 80) ||
        (process.env.VUE_APP_REQUEST_BASE_SCHEME === 'https' && process.env.VUE_APP_REQUEST_BASE_PORT === 443))
        ? ''
        : ':' + process.env.VUE_APP_REQUEST_BASE_PORT);

module.exports = {
    devServer: {
        // 调试时自动打开浏览器
        open: true,
        // // 代理
        // proxy: require('./mock/proxy.ts'),
        // https://vuejs-templates.github.io/webpack/proxy.html
        proxy: require('./mock/proxy.ts'),
        // 调用mock服务器
        before: require('./mock/server.ts'),
    },
};
