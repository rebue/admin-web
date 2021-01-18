/**
 * 领域信息相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermApi extends BaseCrudApi {
    baseUrn = '/rac/perm-group';

    /** 启用或禁用权限分组 */
    enable(id, enable): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, enable } });
    }
}
