const moment = require('moment');
const { parse } = require('url');
const Mock = require('mockjs');

const mockList = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
    'list|1-20000': [{
        'id|+1': 10000000,
        'domainId|+1': ['default', 'platform', 'ops'],
        "accountId|1-1000000": 193201,
        "accountName": "@name()",
        'opType': '@pick(["登录", "注册", "操作", "查询"])',
        'opTitle': '@title()',
        'opDetail': '@cparagraph',
        'opDateTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    }]
})

const opLoglist = () => mockList.list;

module.exports = {
    opLoglist,
    routes: {
        /** 查询记录 */
        'GET /rac/op-log/list': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;

            return res.json({
                result: 1,
                msg: '查询列表成功',
                extra: {
                    list: mockList.list.filter(item => item.domainId === params.domainId),
                },
            });
        },
        /** 查询记录 */
        'GET /rac/op-log/page': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            const { pageNum, pageSize } = params;
            let l = mockList.list.filter(item => item.domainId === params.domainId);
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
