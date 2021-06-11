/**
 * 领域信息相关请求
 */
import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import { RacPermGroupMo } from '@/mo/rac/RacPermGroupMo';
import { RacPermMo } from '@/mo/rac/RacPermMo';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacDicItemApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/dic-item';
}
