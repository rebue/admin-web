/**
 * 操作日志信息相关请求
 */
import { Ro } from '@/ro/Ro';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacLockLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/lock-log';
    /**
     * 获取分页列表
     */
    page(qo): Promise<Ro> {
        if (!qo.orderBy) {
            qo.orderBy = 'lockDatetime DESC';
        }
        return super.page(qo);
    }
}
