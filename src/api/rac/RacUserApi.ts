/**
 * 用户信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

/** 获取当前用户信息 */
export function getCurUserInfo(sysId: string): Promise<Ro> {
    console.log('RacUserApi.getCurUserInfo');
    return request.get({ url: '/rac/user/get-cur-user-info', params: { sysId } });
}
