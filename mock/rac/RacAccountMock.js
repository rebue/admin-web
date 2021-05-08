const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;
const { parse } = require('url');

const list = [
    {
        id: '10',
        domainId: 'platform',
        signInName: 'super',
        signInPswd: '43b90920409618f188bfc6923f16b9fa',
        signInNickname: '平台管理员',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIxIiwibmJmIjoxNjE1MjU4NDY2LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MDI2NiwiaWF0IjoxNjE1MjU4NDY2fQ.qK-A2UjqwDoI6nt49z1O2iyTwno0qrU_VzeTNkbXFDjBGfhx2wBldO1BMUQv0EaHPInytBKWw7vn1zP4HIwaUg',
        menus: [
            '/base/rac-domain',
            '/base/rac-sys',
            '/base/rac-perm',
            '/base/rac-role',
            '/account/rac-org',
            '/account/rac-account',
            '/log/lock-log',
            '/log/op-log',
        ],
    },
    {
        id: '20',
        domainId: 'ops',
        signInName: 'admin',
        signInPswd: '52569c045dc348f12dfc4c85000ad832',
        signInNickname: '运营管理员',
        sign:
            'eyJhbGciOiJIUzUxMiJ9.eyJhY2NvdW50SWQiOiIyIiwibmJmIjoxNjE1MjU5MjI3LCJpc3MiOiJ6Ym9zcyIsImV4cCI6MTYxNTI2MTAyNywiaWF0IjoxNjE1MjU5MjI3fQ.9e-k4k-TBCAUhoYO6-UKSJXgHIhdRwmlBDVnAWN99LwPWX3w1FhZoaJboz4nuFyi0pEqJUybYXn5WP2h0P71eQ',
        menus: ['/user/ops-org', '/user/ops-account'],
    },
];

const listRacAccount = () => list;

const findRacAccountBySignInName = signInName => list.find(item => item.signInName === signInName);

module.exports = {
    findRacAccountBySignInName,
    listRacAccount,
    routes: {
        'GET /rac/account/list': listRacAccount,
        'GET /rac/account/get-cur-account-info': (req, res, u) => {
            const cookies = req.headers.cookie.split(';');
            let accountId;
            for (const cookie of cookies) {
                const keyAndName = cookie.split('=');
                const key = keyAndName[0].trim();
                const name = keyAndName[1].trim();
                if (key === 'sys_id') {
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
        'POST /rac/account': (req, res, u, b) => {
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
        'PUT /rac/account': (req, res, u, b) => {
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
        'DELETE /rac/account': (req, res, u) => {
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
        'POST /rac/account/enable': (req, res, u, b) => {
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
        'GET /rac/account/get-by-id': (req, res, u) => {
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
        'GET /rac/account/page': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const { pageNum, pageSize } = params;

            let l = list.filter(item => item.domainId === params.domainId);
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
    },
};
