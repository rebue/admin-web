// https://github.com/chimurai/http-proxy-middleware#proxycontext-config
module.exports = {
    '/rac': {
        target: 'http://127.0.0.1:9605/',
        pathRewrite: { '^/rac': '' },
    },
};
