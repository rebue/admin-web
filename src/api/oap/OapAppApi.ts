/**
 * 应用信息相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class OapAppApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/oap-svr/oap/app';
    /**
     * 根据appId获取信息
     */
    getByAppId(appId: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-by-app-id?id=' + appId });
    }
    /**
     * 根据id判断是否存在 id值可以是id, appId, clientId
     */
    existById(id: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/exist-by-id?id=' + id });
    }
    /**
     * 生成应用secret
     */
    getAppSecret(): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-app-secret' });
    }
    /**
     * 查询所有应用以及认证应用
     */
    listAndTripartite(): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-and-tripartite' });
    }
}
