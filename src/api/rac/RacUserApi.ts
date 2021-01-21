/**
 * 用户信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacUserApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/sys';
    /**
     * 获取当前用户信息
     */
    getCurUserInfo(): Promise<Ro> {
        console.log('RacUserApi.getCurUserInfo');
        return request.get({ url: '/rac/user/get-cur-user-info' });
    }
}
