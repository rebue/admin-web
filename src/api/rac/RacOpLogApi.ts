/**
 * 领域信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacOpLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/opLog';

    /** 上移 */
    moveUp(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-up', data: { id } });
    }

    /** 下移 */
    moveDown(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-down', data: { id } });
    }
}
