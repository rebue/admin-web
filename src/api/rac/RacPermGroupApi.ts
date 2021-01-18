/**
 * 领域信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermApi extends BaseCrudApi {
    baseUrn = '/rac/perm-group';

    /** 启用或禁用权限分组 */
    enable(id: string, enable: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, enable } });
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
