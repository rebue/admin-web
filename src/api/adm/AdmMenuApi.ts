import { appCode } from '~/env';
import { Ro } from '~/ro/Ro';
import { request } from '~/util/request';

export const AdmMenuApi = {
    /**
     * 获取菜单列表
     */
    list(): Promise<Ro> {
        // 发出get请求
        return request.get({
            url: '/adm/menu/list',
            params: { appCode },
        });
    },
};
