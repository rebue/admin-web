/**
 * 应用信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
export default class RacAppApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/app';
    /** 启用禁用 */
    enable(mo): Promise<Ro> {
        return request.put({ url: this.baseUrn + '/enable', data: mo });
    }
}
