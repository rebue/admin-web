const moment = require('moment');
const { parse } = require('url');

const list = [
    {
        id: '1611197906000',
        name: '超级管理角色',
        domainId: 'platform',
        isEnabled: true,
        seqNo: 0,
        remark: '拥有所有管理权限，必须对开发/运维都了解得非常透彻',
    },
    {
        id: '1611197945000',
        name: '平台管理角色',
        domainId: 'platform',
        isEnabled: true,
        seqNo: 1,
        remark: '拥有管理平台的基本权限，主要负责账户授权方面的管理',
    },
];

const listAllRacRole = () => list;

module.exports = {
    listAllRacRole,
    routes: {
        /** 添加 */
        'POST /rac/role': (req, res, u, b) => {
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
        'PUT /rac/role': (req, res, u, b) => {
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
        'DELETE /rac/role': (req, res, u) => {
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
        'POST /rac/role/enable': (req, res, u, b) => {
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
        'POST /rac/role/move-up': (req, res, u, b) => {
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
        'POST /rac/role/move-down': (req, res, u, b) => {
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
        'GET /rac/role/get-by-id': (req, res, u) => {
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
        'GET /rac/role/list': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    list: list.filter(item => item.domainId === params.domainId),
                },
            });
        },
        /** 查询记录 */
        'GET /rac/role/list-with-group': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    groupList: listAllRacRoleGroup().filter(item => item.domainId === params.domainId),
                    roleList: list.filter(item => item.domainId === params.domainId),
                },
            });
        },
    },
};
