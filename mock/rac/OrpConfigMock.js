const list = [
    {
        "configType": "ualryv",
        "id": 0,
        "name": "果.白"
    }
];

const listAllOrpConfig = () => list;

module.exports = {
    listAllOrpConfig,
    routes: {
        /** 获取配置信息 */
        'GET /orp-svr/orp/get/nacos/config': {
            result: 1,
            msg: '查询列表成功',
            extra: {
                wechatOpenMapList: listAllOrpConfig(),
                dingTalkMapList: listAllOrpConfig(),
            },
        },
         /** 添加 */
         'POST /orp-svr/orp/nacos/publish/add-config': (req, res, u, b) => {
            const body = (b && b.body) || req.body;
            list.push({
                "configType": body.newAppKey,
                "id": list.length + 1,
                "name": body.newName
            });
            return res.json({
                result: 1,
                msg: '添加成功',
                extra: {
                    id: body.id,
                },
            });
        },
         /** 编辑 */
         'POST /orp-svr/orp/nacos/publish/modify-config': (req, res, u, b) => {
            let body = (b && b.body) || req.body;
            const replacedIndex = list.findIndex(item => item.id === body.oldAppKey);
            body = {
                "configType": body.newAppKey,
                "id": list.length + 1,
                "name": body.newName
            }
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
         /** 删除 */
         'POST /orp-svr/orp/nacos/publish/del-config': (req, res, u, b) => {
            let body = (b && b.body) || req.body;
            const removedIndex = list.findIndex(item => item.id === body.oldAppKey);
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
    },
};
