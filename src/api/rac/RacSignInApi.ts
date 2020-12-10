/**
 * 登录相关请求
 */
import { Ro } from '@/ro/Ro';
import SignInByUserNameTo from '@/to/rac/SignInByUserNameTo';
import request from '@/util/request';

/** 通过用户名称登录 */
export function signInByUserName(to: SignInByUserNameTo): Promise<Ro> {
    console.log('RacSignInApi.signInByUserName', to);
    return request.post({ url: '/rac/sign-in/sign-in-by-user-name', data: to });
}

// /** 删除门锁 */
// export function del(id: string): Promise<Ro> {
//     return httpDelete({ url: '/lck-svr/lck/lock?id=' + id });
// }

// /** 通过ID获取门锁信息 */
// export function getById(lockId: string): Promise<Ro> {
//     return httpGet({ url: '/lck-svr/lck/lock/get-by-id?id=' + lockId });
// }

// // /**  */
// // export function existDeviceById(deviceId: string): Promise<Ro> {
// //   return httpGet({ url: '/lck-svr/lck/device/exist-by-id?id=' + deviceId });
// // }

// /** 获取门锁列表 */
// export function list(): Promise<Ro> {
//     return httpGet({ url: '/lck-svr/lck/lock/list', data: { pageSize: 100, orderBy: 'LOCK_NAME' } });
// }
