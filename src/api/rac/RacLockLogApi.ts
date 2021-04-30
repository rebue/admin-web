/**
 * 操作日志信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacLockLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/lock-log';
}
