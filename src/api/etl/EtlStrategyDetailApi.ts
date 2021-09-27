/*
 * @Date: 2021-09-27 15:57:37
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-27 18:50:19
 * @FilePath: \admin-web\src\api\etl\EtlStrategyDetailApi.ts
 */
/**
 * 同步策略和数据库链接器相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';

export default class EtlStrategyApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/etl-svr/etl/sync-strategy-detail';
}
