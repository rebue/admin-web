const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;
const { parse } = require('url');

const list = [
    {
        id: '1',
        realmId: 'platform',
        signInName: 'super',
        signInPswd: '43b90920409618f188bfc6923f16b9fa',
        signInNickname: '平台管理员',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIxIiwibmJmIjoxNjE1MjU4NDY2LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MDI2NiwiaWF0IjoxNjE1MjU4NDY2fQ.qK-A2UjqwDoI6nt49z1O2iyTwno0qrU_VzeTNkbXFDjBGfhx2wBldO1BMUQv0EaHPInytBKWw7vn1zP4HIwaUg',
        menus: [
            '/base/rac-realm',
            '/base/rac-app',
            '/base/rac-perm',
            '/base/rac-role',
            '/account/rac-org',
            '/account/rac-account',
            '/log/lock-log',
            '/log/op-log',
        ],
    },
    {
        id: '2',
        realmId: 'ops',
        signInName: 'admin',
        signInPswd: '52569c045dc348f12dfc4c85000ad832',
        signInNickname: '运营管理员',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIyIiwibmJmIjoxNjE1MjU5MjI3LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MTAyNywiaWF0IjoxNjE1MjU5MjI3fQ.9e-k4k-TBCAUhoYO6-UKSJXgHIhdRwmlBDVnAWN99LwPWX3w1FhZoaJboz4nuFyi0pEqJUybYXn5WP2h0P71eQ',
        menus: ['/user/ops-org', '/user/ops-account', '/user/ops-user']
    },
    {
        "id": 803,
        "idType": "2y5qeu",
        "isEnabled": true,
        "signInName": "子骞.黎",
        "signInMobile": "13713883144",
        "signInEmail": "明.汪@gmail.com",
        "signInPswd": "7ri9c7",
        "signInPswdSalt": "fyc22w",
        "signInNickname": "jc.stark",
        "signInAvatar": "x3yixa",
        "wxOpenId": "117",
        "wxUnionId": "117",
        "wxNickname": "jc.stark",
        "wxAvatar": "wnp3ny",
        "qqOpenId": "117",
        "qqUnionId": "117",
        "qqNickname": "jc.stark",
        "qqAvatar": "e6uff2",
        "isTester": true,
        "createTimestamp": 1631003031598,
        "updateTimestamp": 1631003031598,
        "orgId": 325,
        "org": {
            "id": 508,
            "idType": "cx1tu5",
            "keywords": "e0g1by",
            "name": "子骞.黎",
            "parentId": 200,
            "orgType": 79,
            "fullName": "子骞.黎",
            "introduction": "eftavl",
            "remark": "pybpb3",
            "treeCode": "64605",
            "attrType": "56hgqp",
            "addr": "cw9c8y",
            "contactPerson": "oh4i68",
            "contactWay": "68apmy",
            "email": "明.汪@gmail.com",
            "realmId": "117",
            "realm": {
                "id": "117",
                "idType": "o7neve",
                "name": "子骞.黎",
                "remark": "yq4ss3"
            }
        },
        "payPswd": "fo2uxj",
        "payPswdSalt": "ct57vj",
        "userId": 505,
        "user": {
            "id": 368,
            "idType": "or58n3",
            "mobile": "13713883144",
            "isVerifiedMobile": true,
            "email": "明.汪@gmail.com",
            "isVerifiedEmail": true,
            "realName": "子骞.黎",
            "isVerifiedRealname": true,
            "idCard": "210216197304273039",
            "isVerifiedIdcard": true,
            "sex": 90,
            "updateTimestamp": 1631003031598,
            "createTimestamp": 1631003031598
        },
        "remark": "c0ypd2",
        "realmId": "117",
        "realm": {
            "id": "117",
            "idType": "af028j",
            "name": "子骞.黎",
            "remark": "hjee2k"
        }
    }

];

const listRacAccount = () => list;

const findRacAccountBySignInName = signInName => list.find(item => item.signInName === signInName);

module.exports = {
    findRacAccountBySignInName,
    listRacAccount,
    routes: {
        'GET /rac-svr/rac/account/list': listRacAccount,
        'GET /rac-svr/rac/account/get-cur-account-info': (req, res, u) => {
            const cookies = req.headers.cookie.split(';');
            let accountId;
            for (const cookie of cookies) {
                const keyAndName = cookie.split('=');
                const key = keyAndName[0].trim();
                const name = keyAndName[1].trim();
                if (key === 'app_id') {
                    switch (name) {
                        case 'platform-admin-web':
                            accountId = '1';
                            break;
                        case 'ops-admin-web':
                            accountId = '2';
                            break;
                        default:
                            break;
                    }
                    break;
                }
            }

            const eo = list.find(item => item.id === accountId);
            if (eo) {
                return res.json({
                    result: 1,
                    msg: '获取当前账户信息成功',
                    extra: eo,
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
        /** 添加 */
        'POST /rac-svr/rac/account': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            body.id = new Date().getTime() + '';
            list.push(body);
            return res.json({
                result: 1,
                msg: '添加成功',
                extra: {
                    id: body.id,
                },
            });
        },
        /** 修改 */
        'PUT /rac-svr/rac/account': (req, res, u, b) => {
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
        'DELETE /rac-svr/rac/account': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            const removedIndex = list.findIndex(item => item.id === params.id);
            if (removedIndex !== -1) {
                list.splice(removedIndex, 1);
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
        /** 启用或禁用 */
        'PUT /rac-svr/rac/account/enable': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const findIndex = list.findIndex(item => item.id === body.id);
            if (findIndex !== -1) {
                list[findIndex].isEnabled = body.enable;
                return res.json({
                    result: 1,
                    msg: body.enable ? '启用' : '禁用' + '成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: body.enable ? '启用' : '禁用' + '失败，找不到要修改的记录',
                });
            }
        },
        'GET /rac-svr/rac/account/get-by-id': (req, res, u) => {
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
        /** 查询记录 */
        'GET /rac-svr/rac/account/page': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const { pageNum, pageSize } = params;

            let l = list.filter(item => item.realmId === params.realmId);
            let total = l.length;

            const begin = (pageNum - 1) * pageSize;
            const end = begin + (pageSize - 0);
            l = l.slice(begin, end);

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    page: {
                        total,
                        list: l,
                    },
                },
            });
        },
        'POST /rac-svr/rac/account/upload-avatar': (req, res, u, b) => {
            return res.json({
                result:1,
                msg:'上传头像成功',
                success:true
            });
        },
        //通用上传接口
        'POST /oss-svr/oss/obj/upload': (req, res, u, b) => {
            return res.json({
                    "result":1,
                    "msg":"上传对象成功",
                    "extra":{"id":"906445814724034561","objType":"png","objSize":"0","url":"http://172.20.10.154:9000/oss-obj/906445814724034561.png?a=1630055651049","creatorId":"10","createDatetime":"2021-08-27 17:14:11","objName":"avatar.png","objGroup":"1"},
                    "success":true
                }
            );
        }
    },
};
