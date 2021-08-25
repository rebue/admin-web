const moment = require('moment');
const { parse } = require('url');

const list = [
    {
        id: '0',
        name: '基础配置-领域',
        realmId: 'platform',
        isEnabled: true,
        seqNo: 0,
        remark: '领域的基础信息',
    },
    {
        id: '1',
        name: '基础配置-应用',
        realmId: 'platform',
        isEnabled: true,
        seqNo: 1,
        remark: '应用的基础信息',
    },
    {
        id: '2',
        name: '基础配置-权限',
        realmId: 'platform',
        isEnabled: true,
        seqNo: 2,
        remark: '权限的基础信息',
    },
];

const listAllRacPermGroup = () => list;

module.exports = {
    listAllRacPermGroup,
    routes: {
        /** 添加 */
        'POST /rac-svr/perm-group': (req, res, u, b) => {
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
        'PUT /rac-svr/perm-group': (req, res, u, b) => {
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
        'DELETE /rac-svr/perm-group': (req, res, u) => {
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
        'POST /rac-svr/perm-group/enable': (req, res, u, b) => {
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
        /** 上移 */
        'POST /rac-svr/perm-group/move-up': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const findIndex = list.findIndex(item => item.id === body.id);
            if (findIndex !== -1) {
                const temp = list[findIndex];
                list[findIndex] = list[findIndex - 1];
                list[findIndex].seqNo++;
                list[findIndex - 1] = temp;
                list[findIndex - 1].seqNo--;
                return res.json({
                    result: 1,
                    msg: '上移成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: '上移失败，找不到要修改的记录',
                });
            }
        },
        /** 下移 */
        'POST /rac-svr/perm-group/move-down': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            const findIndex = list.findIndex(item => item.id === body.id);
            if (findIndex !== -1) {
                const temp = list[findIndex];
                list[findIndex] = list[findIndex + 1];
                list[findIndex].seqNo--;
                list[findIndex + 1] = temp;
                list[findIndex + 1].seqNo++;
                return res.json({
                    result: 1,
                    msg: '下移成功',
                });
            } else {
                return res.json({
                    result: -1,
                    msg: '下移失败，找不到要修改的记录',
                });
            }
        },
        'GET /rac-svr/perm-group/get-by-id': (req, res, u) => {
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
        'GET /rac-svr/perm-group/list': (req, res, u, b) => {
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
    },
};
