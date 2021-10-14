/**
 * 角色信息相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { RacRoleMo } from '@/mo/rac/RacRoleMo';

export default class RacRoleApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/role';

    /**
     * 添加角色权限关系
     */
    addRolePerm(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/add-role-perm', data: mo });
    }
    /**添加角色账户关系*/
    addAccountRole(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/addAccountRole', data: mo });
    }
    /**移除角色账户关系*/
    delAccountRole(mo): Promise<Ro> {
        return request.delete({ url: this.baseUrn + '/delAccountRole', data: mo });
    }
    /**
     * 查询角色已存在的权限关系
     */
    listRolePerm(roleId: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-role-perm?roleId=' + roleId });
    }
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
        const { id, realmId } = record;
        return request.post({ url: this.baseUrn + '/move-up', data: { id, realmId } });
    }

    /** 下移 */
    moveDown(record: RacRoleMo): Promise<Ro> {
        const { id, realmId } = record;
        return request.post({ url: this.baseUrn + '/move-down', data: { id, realmId } });
    }
    /**
     * 获取分页列表
     */
    listTransferOfRole(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/listTransferOfRole', params: qo });
    }

    /**
     * 添加角色授权应用
     */
    addRoleApp(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/add-role-app', data: mo });
    }
    /**
     * 查询角色已存在的应用关系
     */
    listRoleApp(roleId: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-role-app?roleId=' + roleId });
    }
}
