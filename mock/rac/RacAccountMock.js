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
        signInMobile: '13265019973',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIxIiwibmJmIjoxNjE1MjU4NDY2LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MDI2NiwiaWF0IjoxNjE1MjU4NDY2fQ.qK-A2UjqwDoI6nt49z1O2iyTwno0qrU_VzeTNkbXFDjBGfhx2wBldO1BMUQv0EaHPInytBKWw7vn1zP4HIwaUg',
        menus: [
            '/platform-admin-web/base/rac-realm',
            '/platform-admin-web/base/rac-app',
            '/platform-admin-web/base/rac-perm',
            '/platform-admin-web/base/rac-role',
            '/platform-admin-web/base/rac-dic',
            '/platform-admin-web/account/rac-org',
            '/platform-admin-web/account/rac-account',
            '/platform-admin-web/account/rac-user',
            '/platform-admin-web/account/rac-account-unlock',
            '/platform-admin-web/log/lock-log',
            '/platform-admin-web/log/disable-log',
            '/platform-admin-web/log/op-log',
            '/platform-admin-web/user-synchro/account-sy',
            '/platform-admin-web/log/lock-statistics',
            '/platform-admin-web/user-system-survey/authentication',
            '/platform-admin-web/user-system-manage/weChat-config',
            '/platform-admin-web/user-system-manage/dingTalk-config',
            '/platform-admin-web/user-system-manage/level-protect',
            '/platform-admin-web/user-system-survey/today-survey'
        ],
        unionId: '1',
    },
    {
        id: '2',
        realmId: 'ops',
        signInName: 'admin',
        signInPswd: '52569c045dc348f12dfc4c85000ad832',
        signInNickname: '运营管理员',
        signInMobile: '18503096697',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIyIiwibmJmIjoxNjE1MjU5MjI3LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MTAyNywiaWF0IjoxNjE1MjU5MjI3fQ.9e-k4k-TBCAUhoYO6-UKSJXgHIhdRwmlBDVnAWN99LwPWX3w1FhZoaJboz4nuFyi0pEqJUybYXn5WP2h0P71eQ',
        menus: [
            '/ops-admin-web/account/rac-org',
            '/ops-admin-web/account/rac-account',
            '/ops-admin-web/account/rac-user',
            '/ops-admin-web/account/rac-account-unlock',
            '/ops-admin-web/log/lock-log',
            '/ops-admin-web/log/disable-log',
            '/ops-admin-web/log/op-log',
        ],
    },
    {
        id: 803,
        idType: '2y5qeu',
        isEnabled: true,
        signInName: 'adminer',
        signInMobile: '13713883144',
        signInEmail: 'adminer@gmail.com',
        signInPswd: '7ri9c7',
        signInPswdSalt: 'fyc22w',
        signInNickname: 'jc.stark',
        signInAvatar: 'x3yixa',
        wxOpenId: '117',
        wxUnionId: '117',
        wxNickname: 'jc.stark',
        wxAvatar: 'wnp3ny',
        qqOpenId: '117',
        qqUnionId: '117',
        qqNickname: 'jc.stark',
        qqAvatar: 'e6uff2',
        isTester: true,
        createTimestamp: 1631003031598,
        updateTimestamp: 1631003031598,
        orgId: 325,
        org: {
            id: 508,
            idType: 'cx1tu5',
            keywords: 'e0g1by',
            name: '子骞.黎',
            parentId: 200,
            orgType: 79,
            fullName: '子骞.黎',
            introduction: 'eftavl',
            remark: 'pybpb3',
            treeCode: '64605',
            attrType: '56hgqp',
            addr: 'cw9c8y',
            contactPerson: 'oh4i68',
            contactWay: '68apmy',
            email: '明.汪@gmail.com',
            realmId: '117',
            realm: {
                id: '117',
                idType: 'o7neve',
                name: '子骞.黎',
                remark: 'yq4ss3',
            },
        },
        payPswd: 'fo2uxj',
        payPswdSalt: 'ct57vj',
        userId: 505,
        user: {
            id: 368,
            idType: 'or58n3',
            mobile: '13713883144',
            isVerifiedMobile: true,
            email: '明.汪@gmail.com',
            isVerifiedEmail: true,
            realName: '子骞.黎',
            isVerifiedRealname: true,
            idCard: '210216197304273039',
            isVerifiedIdcard: true,
            sex: 90,
            updateTimestamp: 1631003031598,
            createTimestamp: 1631003031598,
        },
        remark: 'c0ypd2',
        realmId: '117',
        realm: {
            id: '117',
            idType: 'af028j',
            name: '子骞.黎',
            remark: 'hjee2k',
        },
        unionId: '1',
    },
];

const listRacAccount = () => list;

const findRacAccountBySignInName = signInName => list.find(item => item.signInName === signInName);

module.exports = {
    findRacAccountBySignInName,
    listRacAccount,
    routes: {
        'GET /rac-svr/rac/account/list': listRacAccount,
        'GET /rac-svr/rac/account/get-cur-account-info': (req, res, u) => {
            console.log('--req.headers', req.headers);
            let accountId;
            switch (req.headers['app-id']) {
                case 'platform-admin-web':
                    accountId = '1';
                    break;
                case 'ops-admin-web':
                    accountId = '2';
                    break;
                case 'unified-auth':
                    accountId = '1';
                    break;
                default:
                    accountId = '1';
                    break;
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
            const total = l.length;

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
                result: 1,
                msg: '上传头像成功',
                success: true,
            });
        },
        //通用上传接口
        'POST /oss-svr/oss/obj/upload': (req, res, u, b) => {
            return res.json({
                result: 1,
                msg: '上传对象成功',
                extra: {
                    id: '906445814724034561',
                    objType: 'png',
                    objSize: '0',
                    url: 'http://172.20.10.154:9000/oss-obj/906445814724034561.png?a=1630055651049',
                    creatorId: '10',
                    createDatetime: '2021-08-27 17:14:11',
                    objName: 'avatar.png',
                    objGroup: '1',
                },
                success: true,
            });
        },
        'GET /rac-svr/rac/account/get-account-by-union-id': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            // const eo = list.find(item => item.id === params.accountId);
            const result = list.filter(item => item.unionId === params.unionId);
            if (result) {
                return res.json({
                    result: 1,
                    msg: '获取映射账户信息成功',
                    extra: {
                        list: result,
                    },
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        },
        'GET /rac-svr/rac/account/get-account-by-user': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const { pageNum, pageSize } = params;

            let l = list.filter(item => item.realmId === params.realmId);
            const total = l.length;

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
        'POST /rac-svr/rac/account/add-union-mapper': (req, res, u) => {
            return res.json({
                result: 1,
                msg: '添加成功',
                extra: '',
            });
        },
        'POST /rac-svr/rac/account/del-union-mapper': (req, res, u) => {
            return res.json({
                result: 1,
                msg: '删除成功',
                extra: '',
            });
        },
        /**
         * 获取用户下的账号列表
         */
        'GET /rac-svr/rac/account/get-by-user-id': (req, res, u) => {},
        /**
         * 移除账号下的用户
         */
        'POST /rac-svr/rac/account/disassociate-user': (req, res, u) => {
            console.log('---req', req);
            // let url = u;
            // if (!url || Object.prototype.toString.call(url) !== '[object String]') {
            //     url = req.url;
            // }
            // const params = parse(url, true).query;

            // const { pageNum, pageSize } = params;

            // let l = list.filter(item => item.realmId === params.realmId);
            // let total = l.length;

            // const begin = (pageNum - 1) * pageSize;
            // const end = begin + (pageSize - 0);
            // l = l.slice(begin, end);
        },
        'POST /rac-svr/rac/account/bind-mobile': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            //短信验证码 code:'11111'
            const account = list.find(v => {
                return v.id == body.id;
            });
            if (body.bindType == 0) {
                account.signInMobile = body.mobile;
                return res.json({
                    result: 1,
                    msg: '绑定成功',
                });
            } else if (body.bindType == 1) {
                account.signInMobile = undefined;
                return res.json({
                    result: 1,
                    msg: '解绑成功',
                });
            }
        },
        'POST /rac-svr/rac/account/unbind-mobile': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const account = list.find(v => {
                return v.id == body.id;
            });
            account.signInMobile = undefined;
            return res.json({
                result: 1,
                msg: '解绑成功',
            });
        },
        'POST /rac-svr/forget/check-account-number': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const account = list.find(v => {
                return v.signInName == (body.signInName || body.signInMobile || body.signInEmail);
            });
            return res.json({
                result: 1,
                msg: '账号存在',
                extra: account,
            });
        },
        'GET /rac-svr/rac/account/is-phone-exist': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '身份认证，手机号存在',
            });
        },
        'POST /rac-svr/forget/sign-in-pswd-to-set': (req, res, u) => {
            return res.json({
                result: 1,
                msg: '修改密码成功',
            });
        },
        'GET /rac-svr/rac/account/is-email-exist': (req, res, u) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '身份认证，邮箱存在',
            });
        },
    },
};
