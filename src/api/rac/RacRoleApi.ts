/**
 * 领域信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { RacRoleMo } from '@/mo/rac/RacRoleMo';

export default class RacRoleApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/role';

    /** 启用角色 */
    enable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, isEnabled } });
    }
    /** 禁用角色 */
    disable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/disable', data: { id, isEnabled } });
    }

    /** 上移 */
    moveUp(record: RacRoleMo): Promise<Ro> {
        const { id, domainId } = record;
        return request.post({ url: this.baseUrn + '/move-up', data: { id, domainId } });
    }

    /** 下移 */
    moveDown(record: RacRoleMo): Promise<Ro> {
        const { id, domainId } = record;
        return request.post({ url: this.baseUrn + '/move-down', data: { id, domainId } });
    }
}
