const { parse } = require('url');

const list = [
    {
        appId: 'platform-admin-web',
        // id: 'xxx',
        // clientId: "test-app",
        // ipAddrs: ["http://baidu/.com", "http://baidu/.com"],
        // isEnabled: false,
        // name: "平台后台管理",
        // redirectUris: ["http://baidu/.com", "http://baidu/.com"],
        // secret: "test-app-secrert"
       
    },
    // {
    //     appId: 'ops-admin-web',
    //     id: 'bbb',
    //     // name: '运营后台管理',
    //     // realmId: 'ops',
    //     // menuUrn: 'http://127.0.0.1:13080/menus/ops',
    //     // remark: '对平台的后台管理提供最基本的功能',
    //     // isAdd: false,
    //     // isEnabled: false
    // },
    {
        "id": 705,
        "idType": "ftob4m",
        "appId": "176",
        "clientId": "176",
        "secret": "1h73he",
        "createTimestamp": 1630647342711,
        "updateTimestamp": 1630647342711,
        "isEnabled": true,
        "objId": 881
    },
    {
        "id": "176",
        "idType": "6sxcid",
        "name": "健柏.顾",
        "remark": "9feqjy",
        "url": "http://127.0.0.1:13080/admin-web/platform-admin-web/base/rac-realm",
        "menu": "258suw",
        "realmId": "176",
        "realm": {
            "id": "176",
            "idType": "32f1dz",
            "name": "健柏.顾",
            "remark": "pmie7h"
        },
        "isEnabled": true,
        "imgUrl": "www.xn---xn--zzv-d33pw32i.net"
    }
];

const listAllRacApp = () => list;

module.exports = {
    listAllRacApp,
    routes: {
        /** 添加 */
        'POST /oap-svr/oap/app': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            body.id = (new Date()).getTime()
            list.push(body);
            return res.json({
                result: 1,
                msg: '添加成功',
                extra: {
                    id: body.id
                },
            });
        },
        /** 修改 */
        'PUT /oap-svr/oap/app': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const replacedIndex = list.findIndex(item => item.id === body.id);
            if (replacedIndex !== -1) {
                list.splice(replacedIndex, 1, body);
                return res.json({
                    result: 1,
                    msg: '修改成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: '修改失败，找不到要修改的记录',
                });
            }
        },
        'DELETE /oap-svr/oap/app': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            const removedIndex = list.findIndex(item => item.id === params.id);
            if (removedIndex !== -1) {
                return res.json({
                    result: 1,
                    msg: '删除成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: '删除失败，找不到要删除的记录',
                });
            }
        },
        'GET /oap-svr/oap/app/get-by-id': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const eo = list.find(item => item.id === params.id);
            if (eo) {
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: {
                        one: eo,
                    },
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
        'GET /oap-svr/oap/app/get-by-app-id': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const eo = list.find(item => item.appId === params.id);
            console.log('----get-by-app-id', eo);
            if (eo.id) {
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: eo,
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
        'GET /oap-svr/oap/app/exist-by-id': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const eo = list.find(item => item.id === params.id);
            if (eo) {
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: {
                        value: true
                    },
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
        /** 查询记录 */
        'GET /oap-svr/oap/app/list': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    list: list.filter(item => item.realmId === params.realmId),
                },
            });
        },
        'GET /oap-svr/oap/app/list-and-tripartite': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    "oapAppList": list.filter((v)=>{
                        return v.isEnabled && v.isCertified
                    }),
                    "racAppList": list,
                    racAppLabelList: [{"id":"923390559798427653","dicId":"923116577378664449","name":"学工","treeCode":"001","dicItemKey":"xuegong","updateDatetime":"2021-10-13 11:26:33"},{"id":"923389909341569026","dicId":"923116577378664449","name":"教务","treeCode":"000","dicItemKey":"jiaowu","updateDatetime":"2021-10-13 11:23:58"}]
                }
            });
        },
    },
};
