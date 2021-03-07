const moment = require('moment');
const { parse } = require('url');

const list = [
    {
        id: '1611197906000',
        domainId: 'platform',
        accountId: '193201',
        opType: 1,
        opTitle: '操作类型',
        opDetail: '拥有所有管理权限，必须对开发/运维都了解得非常透彻',
        opDateTime: '2021-03-03 12:12:12'
    },
    {
        id: '1611197906001',
        domainId: 'platform',
        accountId: '193201',
        opType: 1,
        opTitle: '操作类型',
        opDetail: '拥有所有管理权限，必须对开发/运维都了解得非常透彻',
        opDateTime: '2021-03-03 12:12:12'
    },
];
const opLoglist = () => list;

module.exports = {
    opLoglist,
    routes: {
        /** 查询记录 */
        'GET /rac/opLog/list': (req, res, u, b) => {
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
    },
};
