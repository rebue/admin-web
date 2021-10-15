const { parse } = require('url');

let redirect_uri = ''
module.exports = {
    routes: {
         /** 获取认证全路径 */
        'GET /oap-svr/oidc/get-oidc-auth-uri': (req, res, u) => {
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
         /** 获取认证全路径 */
         'GET /oap-svr/oidc/authorize': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            
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
