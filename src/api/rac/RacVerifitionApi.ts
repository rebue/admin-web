/**
 * 权限分组信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacVerifitionApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac';
    //   获取验证图片  以及token
    reqGet(data) {
        return request.post({ url: '/captcha/get', data });
    }
    // 滑动或者点选验证
    reqCheck(data) {
        return request.post({ url: '/captcha/check', data });
    }
}
