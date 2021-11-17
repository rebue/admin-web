/**
 * 认证相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
export default class OapOidcApi {
    /**
     * 获取认证全路径
     */
    // getOidcOauthUri(qo): Promise<Ro> {
    //     return request.get({ url: '/orp-svr/orp/get-auth-url/oidc/unified-auth', params: qo });
    // }
    getOidcOauthUri(clientId, qo): Promise<Ro> {
        return request.get({ url: `/orp-svr/orp/get-auth-url/oidc/${clientId}`, params: qo });
    }
}

export const oapOidcApi = new OapOidcApi();
