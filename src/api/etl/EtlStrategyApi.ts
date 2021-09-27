/**
 * 同步策略相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
export default class EtlStrategyApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/etl-svr/etl/sync-strategy';
}
