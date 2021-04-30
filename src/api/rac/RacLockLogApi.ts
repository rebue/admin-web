/**
 * 操作日志信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import { RacLockLogMo } from '@/mo/rac/RacLockLogMo';

export default class RacLockLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/lock-log';

    /**
     * 添加
     */
    add(record: RacLockLogMo): Promise<Ro> {
        const { lockAccountId, lockReason, ...rest } = record;
        return request.post({ url: this.baseUrn, data: { lockAccountId, lockReason } });
    }
    /**
     * 修改
     */
    modify(record: RacLockLogMo): Promise<Ro> {
        const { lockAccountId, unlockReason, ...rest } = record;
        console.log(record);
        return request.put({ url: this.baseUrn, data: { lockAccountId, unlockReason } });
    }

    /**
     * 获取分页列表
     */
    page(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/page', params: qo });
    }
}
