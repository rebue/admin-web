const { parse } = require('url');

let redirect_uri = ''
module.exports = {
    routes: {
         /** 第一步，获取认证全路径 ajax，最终返回认证全路径 */
        'GET /orp-svr/orp/get-auth-url/oidc/unified-auth': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            console.log('---req',req.cookie);
            const params = parse(url, true).query;

            if (params.redirect_uri) {
                redirect_uri = params.redirect_uri
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    detail:  `http://${req.headers.host}/oap-svr/oidc/authorize?scope=openid&response_type=code&client_id=unified-auth&state=RECOMMENDED&redirect_uri=${params.redirect_uri}`,
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
         /** 第二步，请求认证全路径，最终302 后端api?state&code */
         'GET /oap-svr/oidc/authorize': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            const auth_info = 'eyJjbGllbnRJZCI6InVuaWZpZWQtYXV0aCIsInJlZGlyZWN0VXJpIjoiaHR0cHM6Ly9hdXRoLm1haXl1ZXNvZnQuY29tL29ycC1zdnIvb3JwL2NhbGxiYWNrIiwic2NvcGUiOiJvcGVuaWQiLCJzdGF0ZSI6ImUwMmVhZjQ5LWI3MDMtNGQ2OC05ZjNmLWU4MmI1ZDYwYTNmYyJ9'
            const authInfoKey = process.env.VUE_APP_AUTH_INFO_KEY;
            res.cookie(authInfoKey, auth_info, { expires: new Date(Date.now() + 1800000) });
            if (!false) {
                //去登录页
                res.writeHead(302, {'Location': `http://${req.headers.host}/admin-web/unified-auth/sign-in/unified`});
            } else {
                let redirect_uri = params.redirect_uri
                redirect_uri = `${redirect_uri}${redirect_uri.includes('?') ? '&' : '?'}state=RECOMMENDED&code=1111` 
                res.writeHead(302, {'Location': redirect_uri});
            }
            res.end();
        },
        // 后端API
        'GET /orp-svr/oidc/callback': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            // code,state,callbackUri
            console.log('---callback',params, params.callbackUri)
            const jwtTokenKey = process.env.VUE_APP_JWT_TOKEN_KEY;
            res.cookie(jwtTokenKey, 'xxxx', { expires: new Date(Date.now() + 1800000) });
            res.writeHead(302, {
                'Location': params.callbackUri,
            });
            res.end();
        },

        // 统一帐密登录
        'POST /oap-svr/oap/login': (req, res, u) => {
            console.log('---登录后302', redirect_uri);
            return res.json({
                result: 1,
                msg: '查询成功',
                extra:  decodeURIComponent(redirect_uri)
            });
        },
        
    },
};
