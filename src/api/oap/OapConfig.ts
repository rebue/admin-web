/**
 * 钉钉、微信公众号相关请求
 */
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class OapConfig extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/nacos/';
    /**
     * 获取配置信息
     */
    getNacosConfig(): Promise<Ro> {
        return request.get({ url: this.baseUrn + `/get/orp-svr/config` });
    }
    /**
     * 新增配置信息
     */
    setNacosAddConfig(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + `/add/publish/orp-svr/config`,
            data,
        });
    }
    /**
     * 编辑配置信息
     */
    setNacosModifyConfig(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + `/modify/publish/orp-svr/config`,
            data,
        });
    }
    /**
     * 删除配置信息
     */
    setNacosDelConfig(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + `/del/publish/orp-svr/config`,
            data,
        });
    }
}
