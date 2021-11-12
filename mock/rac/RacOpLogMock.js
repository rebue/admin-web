const moment = require('moment');
const { parse } = require('url');
const Mock = require('mockjs');

const mockList = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
    'list|1-20000': [{
        'id|+1': 10000000,
        'realmId|+1': ['default', 'platform', 'ops'],
        "accountId|1-1000000": 193201,
        "signInName": "@name()",
        'opType': '@pick(["登录", "注册", "操作", "查询"])',
        'opTitle': '@title()',
        'opDetail': '@cparagraph',
        'opDatetime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    }]
})
const toDayList = {
    "账户添加": "1",
    "账户修改": "1",
    "账户删除": "1",
    "密码修改": "1",
    "启用账户": "1",
    "禁用账户":"1",
};

const opLoglist = () => mockList.list;
const listCountSurvey = () => toDayList;

module.exports = {
    opLoglist,
    listCountSurvey,
    routes: {
        /** 查询记录 */
        'GET /rac-svr/rac/op-log/page': (req, res, u, b) => {
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
        /** 查询记录 */
        'GET /rac-svr/rac/op-log/count-survey': {
            result: 1,
            msg: '查询列表成功',
            extra: {
                id: listCountSurvey(),
            },
        },
    },

};
