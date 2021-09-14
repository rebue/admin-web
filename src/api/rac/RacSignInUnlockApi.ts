/**
 * 登录锁定相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacSignInUnlockApi {
    /**
     * 通过账户ID解锁登录锁定
     */
    signInLockRecord(data): Promise<Ro> {
        return request.post({ url: '/rac-svr/rac/sign-in/sign-in-lock-record', data: data });
    }
    /**
     * 通过账户条件查询被登录锁定的账户
     */
    page(qo): Promise<Ro> {
        return request.get({ url: '/rac-svr/rac/sign-in/sign-in-lock-record', params: qo });
    }
}
