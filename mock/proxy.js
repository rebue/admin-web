const config = {
    mock: '',
    host: 'http://127.0.0.1:10085/',
    luqing: 'http://172.20.11.113:10085',
    yuanman: 'http://172.20.11.244:10085',
    release: 'https://auth.maiyuesoft.com',
};
const target = config.yuanman;

module.exports = {
    proxy: {} || {
        //'/rac-svt/(.*)': target,
        // '/oidc/authorize/(.*)': target
        '/rac-svr/(.*)': target,
        '/oap-svr/(.*)': target,
        '/orp-svr/(.*)': target,
        '/cap-svr/(.*)': target,
        '/oss-svr/(.*)': target,
        '/etl-svr/(.*)': target,
    },
    pathRewrite: {
        '^/(\\w*)/': '/', // 请求独立的微服务地址将路径中第一节去掉
    },
};
