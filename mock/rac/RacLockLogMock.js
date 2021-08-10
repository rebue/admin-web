const moment = require('moment');
const { parse } = require('url');
const Mock = require('mockjs');

const mockList = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
    'list|1-20000': [{
        'id|+1': 10000000,
        'realmId|+1': ['default', 'platform', 'ops'],
        "accountId|1-1000000": 193201,
        "accountName": "@name()",
        "lockOpName": "@name()",
        "unlockOpName": "@name()",
        "realmName": "@pick(['默认系统'])",
        //'opType': '@pick(["锁定", "启用"])',
        //'opTitle': '@title()',
        //'opDetail': '@cparagraph',
        'lockReason': '@cparagraph',
        'unlockReason': '@cparagraph',
        'lockDatetime': '@datetime("yyyy-MM-dd HH:mm:ss")',
        'unlockDatetime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    }]
})

const opLockLoglist = () => mockList.list;

module.exports = {
    opLockLoglist,
    routes: {
        /** 查询记录 */
        'GET /rac/lock-log/page': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            const { pageNum, pageSize, opType } = params;
            let l = mockList.list.filter(item => item.realmId === params.realmId);
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
