/**
 * 等保配置信息
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacSignInApi {
    /** 请求的基础链接 */
    // baseUrn = '/rac-svr/rac/nacos/level-protect';
    baseUrn = '/rac-svr/rac/nacos/';
    /**
     * 获取配置信息
     */
    getConfig(type): Promise<Ro> {
        return request.get({ url: this.baseUrn + `get/${type}/config` });
    }
    /**
     * 获取配置信息
     */
    publishConfig(type, data): Promise<Ro> {
        return request.post({ url: this.baseUrn + `modify/publish/${type}/config`, data });
    }
}
