/*
 * @Date: 2021-09-09 14:27:26
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-22 08:35:59
 * @FilePath: \admin-web\vue.config.js
 */
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
        // 配置Vue可源码调试
        config.when(
            process.env.NODE_ENV === 'development', // 开发环境
            // config => config.devtool('cheap-source-map') // 转换过的源码-快
            config => config.devtool('source-map') // 源码-慢
        );

        // 配置打包svg文件
        const svgRule = config.module.rule('svg'); // 找到 svg-loader
        svgRule.uses.clear(); // 清除已有 loader
        svgRule.exclude.add(/node_modules/); // 排除 node_modules 目录
        svgRule // 添加新的 svg loader
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });
    },
    devServer: {
        // 调试时自动打开浏览器
        // open: true,
        before(app) {
            apiMocker(app, path.resolve('./mock/mock'));
        },
        disableHostCheck: true,
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
