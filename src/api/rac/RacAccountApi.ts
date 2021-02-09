/**
 * 账户信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacAccountApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/account';

    /** 启用或禁用权限 */
    enable(id: string, enable: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, enable } });
    }

    /**
     * 获取当前账户信息
     */
    getCurAccountInfo(): Promise<Ro> {
        console.log('RacAccountApi.getCurAccountInfo');
        return request.get({ url: '/rac/account/get-cur-account-info' });
    }
}
