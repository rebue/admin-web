const { parse } = require('url');

const list = [
    {
        id: 'platform-admin-web',
        name: '平台后台管理',
        realmId: 'platform',
        menuUrn: 'http://127.0.0.1:13080/menus/platform',
        remark: '对平台的后台管理提供最基本的功能',
        isEnabled: false
    },
    {
        id: 'ops-admin-web',
        name: '运营后台管理',
        realmId: 'ops',
        menuUrn: 'http://127.0.0.1:13080/menus/ops',
        remark: '对平台的后台管理提供最基本的功能',
        isEnabled: false
    },
];

const listAllRacApp = () => list;

module.exports = {
    listAllRacApp,
    routes: {
        /** 添加 */
        'POST /rac-svr/rac/app': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
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
        'PUT /rac-svr/rac/app': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const replacedIndex = list.findIndex(item => item.id === body.id);
            if (replacedIndex !== -1) {
                list.splice(replacedIndex, 1, { ...list[replacedIndex], ...body});
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
        'DELETE /rac-svr/rac/app': (req, res, u) => {
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
        'GET /rac-svr/rac/app/get-by-id': (req, res, u) => {
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
        'GET /rac-svr/rac/app/list': (req, res, u, b) => {
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
        /** 启用或禁用 */
        'PUT /rac-svr/rac/app/enable': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const findIndex = list.findIndex(item => item.id === body.id);
            if (findIndex !== -1) {
                list[findIndex].isEnabled = body.isEnabled;
                return res.json({
                    result: 1,
                    msg: body.isEnabled ? '启用' : '禁用' + '成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: body.isEnabled ? '启用' : '禁用' + '失败，找不到要修改的记录',
                });
            }
        }
    },
};
