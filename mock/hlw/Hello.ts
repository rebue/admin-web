import { MockMethod } from 'vite-plugin-mock';
import { default as Mock } from 'mockjs';

export default [
    {
        url: '/hlw/hello',
        method: 'get',
        response: ({ query }) => {
            console.log('/hlw/hello: query-', query);

            const name = query.locale === 'en' ? Mock.Random.name() : Mock.Random.cname();

            return {
                result: 1,
                message: '处理成功',
                data: {
                    name,
                },
            };
        },
    },
] as MockMethod[];
