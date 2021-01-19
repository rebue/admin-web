const path = require('path');
const apiMocker = require('mocker-api');

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
    chainWebpack(config) {
        config.when(
            process.env.NODE_ENV === 'development', // 开发环境
            // config => config.devtool('cheap-source-map') // 转换过的源码-快
            config => config.devtool('source-map') // 源码-慢
        );
    },
    devServer: {
        // 调试时自动打开浏览器
        // open: true,
        before(app) {
            apiMocker(app, path.resolve('./mock/mock'));
        },
    },
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
};
