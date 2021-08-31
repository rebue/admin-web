const config = {
    host: "http://127.0.0.1:10080/",
    luqing: "http://172.20.11.113:10080/",
    yuanman: "http://172.20.11.244:10080"
}
const target = config.host

module.exports = {
    proxy: {
        //'/rac-svt/(.*)': target,
        // '/oidc/authorize/(.*)': target
        '/rac-svr/(.*)': target,
        '/oap-svr/(.*)': target,
        '/orp-svr/(.*)': target,
        '/cap-svr/(.*)': target,
        '/oss-svr/(.*)': target,
    },
    pathRewrite: {
        '^/(\\w*)/': '/', // 请求独立的微服务地址将路径中第一节去掉
    },
};
