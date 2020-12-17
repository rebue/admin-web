/**
 * 菜单相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

/** 列出菜单 */
export function listRacMenu(): Promise<Ro> {
    console.log('RacMenuApi.listRacMenu');
    return request.get({ url: '/rac/menu/list' });
}

/** 列出自己的菜单 */
export function listOwnRacMenu(): Promise<Ro> {
    console.log('RacMenuApi.listRacMenu');
    return request.get({ url: '/rac/menu/list-own' });
}
