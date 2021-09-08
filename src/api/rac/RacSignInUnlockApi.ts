/**
 * 登录锁定相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacSignInUnlockApi {
    /**
     * 通过账户ID解锁登录锁定
     */
    signInLockRecord(id: string): Promise<Ro> {
        return request.post({ url: '/rac-svr/rac/sign-in/sign-in-lock-record?id=' + id });
    }
}
