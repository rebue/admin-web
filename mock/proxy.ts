// https://github.com/chimurai/http-proxy-middleware#proxycontext-config
module.exports = {
    '/api': {
        target: '<url>',
    },
    '/foo': {
        target: '<other_url>',
    },
};
