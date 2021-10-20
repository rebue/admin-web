const moment = require('moment');
const Mock = require('mockjs');
const Random = Mock.Random;
const { parse } = require('url');

const list = [
    {
        'id': '833',
        'idType': 'baa9l8',
        'mobile': '13713883144',
        'isVerifiedMobile': false,
        'email': '234@gmail.com',
        'isVerifiedEmail': false,
        'realName': '2',
        'isVerifiedRealname': false,
        'idCard': '234567892345678923',
        'isVerifiedIdcard': false,
        'sex': 1,
        'updateTimestamp': 1631003031598,
        'createTimestamp': 1631003031598
    },
    {
        "id":"923369937621876736",
        "isVerifiedMobile":false,
        "isVerifiedEmail":false,
        "realName":"zzm",
        "isVerifiedRealname":false,
        "idCard":"000000000000000000",
        "isVerifiedIdcard":false,
        "sex":0,
        "updateTimestamp":"1634090676318",
        "createTimestamp":"1634090676318"
        },{"id":"923385002014277632","isVerifiedMobile":false,"isVerifiedEmail":false,"realName":"钟嘻嘻","isVerifiedRealname":false,"idCard":"000000000000000001","isVerifiedIdcard":false,"sex":0,"updateTimestamp":"1634094267941","createTimestamp":"1634094267941"},{"id":"923491797007073280","isVerifiedMobile":false,"isVerifiedEmail":false,"realName":"钟哈哈","isVerifiedRealname":false,"idCard":"000000000000000002","isVerifiedIdcard":false,"sex":0,"updateTimestamp":"1634119729860","createTimestamp":"1634119729860"},{"id":"923758556830892032","isVerifiedMobile":false,"isVerifiedEmail":false,"realName":"钟可可","isVerifiedRealname":false,"idCard":"000000000000000003","isVerifiedIdcard":false,"sex":0,"updateTimestamp":"1634183330331","createTimestamp":"1634183330331"}
];

const listRacUser = () => list;

module.exports = {
    listRacUser,
    routes: {
        'GET /rac-svr/rac/user/list': listRacUser,
        /** 添加 */
        'POST /rac-svr/rac/user': (req, res, u, b) => {
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
        'PUT /rac-svr/rac/user': (req, res, u, b) => {
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
        'DELETE /rac-svr/rac/user': (req, res, u) => {
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
        'PUT /rac-svr/rac/user/enable': (req, res, u, b) => {
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
        'GET /rac-svr/rac/user/get-by-id': (req, res, u) => {
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
        'GET /rac-svr/rac/user/page': (req, res, u, b) => {
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

        /** 根据姓名和身份张号查询用户信息  */
        'GET /rac-svr/rac/user/get-by-real-name-id-card': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            const eo = list.find(item => (item.realName === params.realName && item.idCard === params.idCard));
            if (eo) {
                return res.json({
                    result: 1,
                    msg: '查询成功',
                    extra: {
                        ...eo,
                    },
                });
            } else {
                return res.json({
                    result: 1,
                    msg: '查询失败',
                });
            }
        }
    },
};
