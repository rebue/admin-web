/**
 * 认证相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class OapOidcApi {
    /** 请求的基础链接 */
    baseUrn = '/oap-svr/oidc';
    /**
     * 获取认证全路径
     */
    getOidcOauthUri(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-oidc-auth-uri', params: qo });
    }
}
