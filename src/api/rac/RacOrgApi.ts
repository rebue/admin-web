/**
 * 领域信息相关请求
 */
import { RacOrgMo } from '@/mo/rac/RacOrgMo';
import { Ro } from '@/ro/Ro';
import { findFromTree } from '@/util/tree';
import BaseCrudApi from '../comm/BaseCrudApi';
import request from '@/util/request';

export default class RacSysApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/org';
    /**添加组织账户关系*/
    addOrgAccount(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/addOrgAccount', data: mo });
    }
    /**移除组织账户关系*/
    delOrgAccount(mo): Promise<Ro> {
        return request.delete({ url: this.baseUrn + '/delOrgAccount', data: mo });
    }
    /**
     * 获取可添加的组织
     */
    listAddableOrg(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/listAddableOrg', params: qo });
    }
    /**
     * 更改组织
     */
    modifyOrgAccount(mo): Promise<Ro> {
        return request.put({ url: this.baseUrn + '/modifyOrgAccount', data: mo });
    }
    /**修改默认组织*/
    modifyDefaultOrg(mo): Promise<Ro> {
        return request.put({ url: this.baseUrn + '/modifyDefaultOrg', data: mo });
    }
    /** 获取列表   */
    listByAccountId(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-by-account-id', params: qo }).then(ro => {
            return ro;
        });
    }
    /**
     * 获取分页列表
     */
    page(qo): Promise<Ro> {
        return super.page(qo).then(ro => {
            const { list } = ro.extra['page'];
            const tempList: RacOrgMo[] = [];
            for (const item of list) {
                if (!item.parentId) {
                    tempList.push(item);
                } else {
                    const result = findFromTree<RacOrgMo>(tempList, node => node.id === item.parentId);
                    if (result) {
                        if (!result.children) {
                            result.children = [];
                        }
                        result.children?.push(item);
                    }
                }
            }
            ro.extra['page'].list = tempList;
            return ro;
        });
    }
}
