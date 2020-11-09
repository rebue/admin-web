/**
 * 角色访问控制相关请求
 */
import { httpGet, httpPost, httpDelete, Ro } from '../../util/ReqUtils';
import LckLockMo from '../../mo/lck/LckLockMo';

/** 添加门锁 */
export function add(mo: LckLockMo): Promise<Ro> {
    return httpPost({ url: '/lck-svr/lck/lock', data: mo });
}

/** 删除门锁 */
export function del(id: string): Promise<Ro> {
    return httpDelete({ url: '/lck-svr/lck/lock?id=' + id });
}

/** 通过ID获取门锁信息 */
export function getById(lockId: string): Promise<Ro> {
    return httpGet({ url: '/lck-svr/lck/lock/get-by-id?id=' + lockId });
}

// /**  */
// export function existDeviceById(deviceId: string): Promise<Ro> {
//   return httpGet({ url: '/lck-svr/lck/device/exist-by-id?id=' + deviceId });
// }

/** 获取门锁列表 */
export function list(): Promise<Ro> {
    return httpGet({ url: '/lck-svr/lck/lock/list', data: { pageSize: 100, orderBy: 'LOCK_NAME' } });
}
