const { result } = require('lodash');
const { MongoClient, ReadPreference } = require('mongodb');
const url = 'mongodb://root:example@mongo/';

let db = undefined;
// 连接mongo数据库
MongoClient.connect(url)
    .then(client => {
        console.log('连接mongo数据库成功');
        db = client.db('adminweb');
    })
    .catch(e => {
        console.log('连接mongo数据库失败', e);
    });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    init: async function() {
        while (!db) {
            await sleep(500);
        }
    },
    /** 统计记录总数 */
    count: async (collection, where = {}) => {
        console.log(`统计${collection}的记录总数`, '条件:', where);
        const count = await db
            .collection(collection)
            .find(where)
            .count();
        console.log(`统计${collection}的记录总数 结果:`, count);
        return count;
    },
    /** 插入一条或多条数据 */
    insert: async (collection, obj) => {
        if (Array.isArray(obj)) {
            // await db.collection(collection).insertMany(obj, {
            //     // 写入策略，默认为 1，即要求确认写操作，0 是不要求，所以必须设置为0，否则报错
            //     writeConcern: 0,
            // });
            for (let item of obj) {
                await db.collection(collection).insertOne(item);
            }
        } else {
            await db.collection(collection).insertOne(obj);
        }
    },
};
