/*
 * @Date: 2021-09-29 20:11:06
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-30 08:34:27
 * @FilePath: \admin-web\src\api\rac\RacStatusApi.ts
 */
/**
 * 用户身份相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { RacUserEnableMo } from '@/mo/rac/RacUserEnableMo';

export default class RacStatusApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/status';
}
