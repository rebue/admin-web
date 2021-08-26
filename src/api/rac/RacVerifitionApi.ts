/**
 * 验证码相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacVerifitionApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/cap-svr/cap';
    //   获取验证图片  以及token
    reqGet(data) {
        return request.post({ url: this.baseUrn + '/captcha/get', data });
    }
    // 滑动或者点选验证
    reqCheck(data) {
        return request.post({ url: this.baseUrn + '/captcha/check', data });
    }
    // 登录校验验证，不需要只用于测试
    reqVerify(data) {
        return request.post({ url: this.baseUrn + '/captcha/verify', data });
    }
}
