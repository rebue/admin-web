/**
 * 验证码相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
const headers = {
    'Disable-Info': 'true',
};
export default class RacVerifitionApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/cap-svr/cap';
    //   获取验证图片  以及token
    reqGet(data) {
        return request.post({ url: this.baseUrn + '/captcha/get', data, headers });
    }
    // 滑动或者点选验证
    reqCheck(data) {
        return request.post({ url: this.baseUrn + '/captcha/check', data, headers });
    }
    // 登录校验验证，不需要只用于测试
    reqVerify(data) {
        return request.post({ url: this.baseUrn + '/captcha/verify', data, headers });
    }
    // 通过code获取token
    // reqGetTokenFromCode(params) {
    //     return request.get({ url: '/orp-svr/orp/callback', params: params });
    // }

    /** 发送手机的短信验证码 */
    sendSMSCode(data) {
        return request.post({ url: this.baseUrn + '/sms/sending', data, headers });
    }
    /** 通过账号ID发送短信验证码 */
    sendSMSCodeByAccountId(data) {
        return request.post({ url: '/rac-svr/rac/sms/sending', data, headers });
    }
    /** 验证手机的短信验证码 */
    validSMSCode(data) {
        return request.post({ url: this.baseUrn + '/sms/verification', data, headers });
    }
}
