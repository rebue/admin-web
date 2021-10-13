/**
 * 字典项信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import request from '@/util/request';
import { Ro } from '@/ro/Ro';
export default class RacDicItemApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/dic-item';
    /** 上移 */
    moveUp(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-up', data: { id } });
    }

    /** 下移 */
    moveDown(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-down', data: { id } });
    }
}
