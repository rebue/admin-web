const { parse } = require('url');

const list = {
    "result":1,
    "msg":"查询成功",
    "extra":{
        "page":{ "total":"2","pageNum":1,"pageSize":10,"size":2,"startRow":"1","endRow":"2","pages":1,"prePage":0,"nextPage":0,"isFirstPage":true,"isLastPage":true,"hasPreviousPage":false,"hasNextPage":false,"navigatePages":8,"navigatepageNums":[1],"navigateFirstPage":1,"navigateLastPage":1},
        "dicList":[{"id":"923116577378664449","name":"应用标签","remark":"应用标签key，约定为ApplyLabel","dicKey":"ApplyLabel","updateDatetime":"2021-10-12 17:17:51"},{"id":"923116640184172546","name":"字典","dicKey":"dictionary","updateDatetime":"2021-10-12 17:18:06"}],
        "itemList":[{"id":"923389909341569026","dicId":"923116577378664449","name":"教务","treeCode":"000","dicItemKey":"jiaowu","updateDatetime":"2021-10-13 11:23:58"},{"id":"923370532990746628","dicId":"923116640184172546","name":"3","treeCode":"000","dicItemKey":"3","updateDatetime":"2021-10-13 10:06:58"},{"id":"923471165661118464","dicId":"923116640184172546","name":"sdfasd","treeCode":"001","dicItemKey":"dfgvsd","updateDatetime":"2021-10-13 16:46:51"},{"id":"923390559798427653","dicId":"923116577378664449","name":"学工","treeCode":"001","dicItemKey":"xuegong","updateDatetime":"2021-10-13 11:26:33"},{"id":"923358945814773760","dicId":"923116640184172546","name":"2","treeCode":"002","dicItemKey":"2","updateDatetime":"2021-10-13 09:20:56"},{"id":"923380463164981249","dicId":"923116640184172546","name":"ww","treeCode":"002000","dicItemKey":"ww","updateDatetime":"2021-10-13 10:46:26"},{"id":"923393807171190790","dicId":"923116640184172546","name":"12312","treeCode":"002001","dicItemKey":"1123","updateDatetime":"2021-10-13 11:39:27"},{"id":"923395856214523911","dicId":"923116640184172546","name":"13123","treeCode":"002002","dicItemKey":"23123","updateDatetime":"2021-10-13 11:47:36"}]
    },
    "success":true
}
const listAllRacApp = () => list;
module.exports = {
    listAllRacApp,
    routes: {
        /** 查询*/
        'GET /rac-svr/rac/dic/list-with-dic': (req, res, u, b) => {
            return res.json({
                result: 1,
                msg: '查询成功',
                extra: list,
            });
        },
        /** 查询应用标签 */
        'GET /rac-svr/rac/dic/get-by-dic-key': (req, res, u, b) => {
            let url = u;
            if (!url || Object.prototype.toString.call(url) !== '[object String]') {
                url = req.url;
            }
            const params = parse(url, true).query;
            // params dicKey: ApplyLabel 

            const extra = {"id":"923116577378664449","name":"应用标签","remark":"应用标签key，约定为ApplyLabel","dicKey":"ApplyLabel","updateDatetime":"2021-10-12 17:17:51","dicItems":[{"id":"923390559798427653","dicId":"923116577378664449","name":"学工","treeCode":"001","dicItemKey":"xuegong","updateDatetime":"2021-10-13 11:26:33"},{"id":"923389909341569026","dicId":"923116577378664449","name":"教务","treeCode":"000","dicItemKey":"jiaowu","updateDatetime":"2021-10-13 11:23:58"}]}
            return res.json({
                result: 1,
                msg: '查询成功',
                extra: extra,
            });
        },
        
    },
};
