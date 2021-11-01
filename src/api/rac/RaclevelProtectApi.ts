/**
 * 登录相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacSignInApi {
    /**
     * 刷新等堡配置
     */
    setLevelProtect(data): Promise<Ro> {
        return request.post({ url: '/rac-svr/rac/sign-in/refresh-update-level-protect', data });
    }
}
