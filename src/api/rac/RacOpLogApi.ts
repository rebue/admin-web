/**
 * 操作日志信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacOpLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/op-log';

    /**
     * 获取分页列表
     */
    page(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/page', params: qo });
    }
}
