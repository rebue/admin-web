/**
 * 领域信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/perm-group';

    /** 启用权限分组 */
    enable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, isEnabled } });
    }
    /** 禁用权限分组 */
    disable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/disable', data: { id, isEnabled } });
    }

    /** 上移 */
    moveUp(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-up', data: { id } });
    }

    /** 下移 */
    moveDown(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-down', data: { id } });
    }
}
