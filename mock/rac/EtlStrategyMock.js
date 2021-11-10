const list = {
    list:[{
        "name": "君浩.董",
        "isEnabled": true,
        "srcConnId": 235,
        "srcName": "君浩.董",
        "dstConnId": 683,
        "dstName": "君浩.董",
        "remark": "crdp6z",
        "srcTableNames": "rkssvj",
        "dstTableNames": "h2pwa8",
        "srcDstMap": "1ydp9m"
    }]
};

const listEtlStrategy = () => list;

module.exports = {
    listEtlStrategy,
    routes: {
        /** 获取配置信息 */
        'GET /etl-svr/etl/sync-strategy/page': {
            result: 1,
            msg: '查询列表成功',
            extra: {
                page: listEtlStrategy(),
            },
        },
    },
};
