module.exports = {
    proxy: {
         '/rac-svr/rac/(.*)': 'http://127.0.0.1:9605/',
         //'/rac-svr/(.*)': 'http://127.0.0.1:10080/',
    },
    pathRewrite: {
        '^/(\\w*)/': '/', // 请求独立的微服务地址将路径中第一节去掉
    },
};
