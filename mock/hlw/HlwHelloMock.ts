import { default as Mock } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { connect } from '../../sqlite/util/sqlite';

const db = connect('Hlw');

export default [
    {
        url: '/hlw/hello',
        method: 'get',
        response: ({ query }) => {
            const name = query.locale === 'en' ? Mock.Random.name() : Mock.Random.cname();
            return {
                result: 1,
                message: '处理请求成功',
                data: {
                    name,
                },
            };
        },
    },
] as MockMethod[];
