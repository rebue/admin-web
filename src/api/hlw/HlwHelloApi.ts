import { Ro } from '~/ro/Ro';
import { request } from '~/util/request';

export const HlwHelloApi = {
    /**
     * 查询指定路径下的文件列表
     * @param locale 语言区域名称
     */
    hello(localeName: string): Promise<Ro> {
        // 发出get请求
        return request.get({
            url: '/hlw/hello',
            params: { locale: localeName },
        });
    },
};
