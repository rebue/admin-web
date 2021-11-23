/*
 * @Date: 2021-09-09 14:27:26
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-22 09:13:04
 * @FilePath: \admin-web\vue.config.js
 */
const path = require('path');
const apiMocker = require('mocker-api');

const CopyPlugin = require("copy-webpack-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
        
        //页面加载优化------“vue页面运行时，把所有的js文件全部加载了”的解决方案
        config.plugins.delete("prefetch") //只加载当前页面需要的js

        // 客户主题start
        let CLIENT = 'default';
        // 命令 npm run  dev --client=anan
        // 接收参数 console.log('--Theme',process.env.npm_config_client);
        // 命令 yarn dev --client=anan
        // 接收参数 console.log('---Theme', process.argv.find((v)=>{return v.includes('--client=')}).replace('--client=',''))
        const yarn_config_client = process.argv.find((v)=>{return v.includes('--client=')})
        if(process.env.VUE_APP_CLIENT){
            CLIENT = process.env.VUE_APP_CLIENT
        }else if(yarn_config_client) {
            CLIENT = yarn_config_client.replace('--client=','')
        }else if(process.env.npm_config_client){
            CLIENT = process.env.npm_config_client
        }
        //设置对接的客户，如南宁学院
        config.plugin('define').tap(args => {
            args[0]['process.env'].VUE_APP_CLIENT = JSON.stringify(CLIENT)
            return args
        })
        // 映射对接的客户目录
        config.resolve.alias
            .set("@client", path.resolve(__dirname,`./src/client/${CLIENT}`))
        // 客户主题end
    },
    configureWebpack(config){
        config.plugins.push(new CopyPlugin(
            [
                { from: path.resolve(__dirname,'./src/view/app/security-center/wechat.css'), to: 'css' },
                { from: path.resolve(__dirname,'./src/view/sign-in/unified/wechat-login.css'), to: 'css' }
            ]
        ))
        if(process.env.npm_config_report) {
            // npm run dev --report 访问http://127.0.0.1:8888/ 查看打包分析
            config.plugins.push(new BundleAnalyzerPlugin())
        }
        
    },
    devServer: {
        // 调试时自动打开浏览器
        // open: true,
        before(app) {
            apiMocker(app, path.resolve('./mock/mock'));
        },
        //配置是否关闭用于DNS重绑定的HTTP请求的HOST检查 因为用到钉钉和微信扫码登录 所以将其设置为true
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
