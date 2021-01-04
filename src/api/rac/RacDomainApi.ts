/**
 * 用户信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

/** 获取领域列表 */
export function listAll(): Promise<Ro> {
    console.log('RacDomainApi.listAll');
    return request.get({ url: '/rac/domain/list-all' });
}
