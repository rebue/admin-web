import { default as Mock } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { connect, convert } from '../../sqlite/util/sqlite';

const db = connect('Adm');

export default [
    {
        url: '/adm/menu/list',
        method: 'get',
        response: ({ query }) => {
            const statement = db.prepare('select * from ADM_MENU where APP_CODE=? order by TREE_CODE');
            const list = convert(statement.all(query.appCode));
            return {
                result: 1,
                message: '处理请求成功',
                data: {
                    list,
                },
            };
        },
    },
] as MockMethod[];
