/**
 * 权限菜单信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermMenuApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/perm-menu';
    /**
     * 添加/修改权限菜单
     */
    addPermMenuUrn(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/addPermMenuUrn', data: mo });
    }
    /**
     * 获取权限已有的菜单
     */
    listPermMenu(mo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/listPermMenu', params: mo });
    }
}
