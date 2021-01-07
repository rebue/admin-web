/**
 * 用户信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacUserApi {
    /**
     * 获取当前用户信息
     */
    static getCurUserInfo(): Promise<Ro> {
        console.log('RacUserApi.getCurUserInfo');
        return request.get({ url: '/rac/user/get-cur-user-info' });
    }
}
