/**
 * 权限信息相关请求
 */
import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import { RacPermGroupMo } from '@/mo/rac/RacPermGroupMo';
import { RacPermMo } from '@/mo/rac/RacPermMo';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/perm';
    /** 启用权限 */
    enable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: { id, isEnabled } });
    }
    /** 禁用权限 */
    disable(id: string, isEnabled: boolean): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/disable', data: { id, isEnabled } });
    }

    /** 上移 */
    moveUp(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-up', data: { id } });
    }

    /** 下移 */
    moveDown(id: string): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/move-down', data: { id } });
    }

    /**
     * 获取带分组的列表
     */
    list(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-with-group', params: qo }).then(ro => {
            const extra = ro.extra as { list: RacPermGroupMo[]; groupList?: RacPermGroupMo[]; permList?: RacPermMo[] };
            const { groupList, permList } = extra;
            const list: RacPermGroupMo[] = [];
            // 循环分组
            for (const group of groupList as RacPermGroupMo[]) {
                group.type = PermTreeNodeTypeDic.PermGroup;
                group.maxSeqNo = (groupList as RacPermGroupMo[]).length - 1;
                list.push(group);
            }
            // 将权限加入分组中
            for (const perm of permList as RacPermMo[]) {
                for (const group of groupList as RacPermGroupMo[]) {
                    if (group['id'] === perm['groupId']) {
                        if (!group.children) group.children = [];
                        perm.type = PermTreeNodeTypeDic.Perm;
                        group.children.push(perm);
                        continue;
                    }
                }
            }

            // 删除转换前的属性
            delete extra.groupList;
            delete extra.permList;

            // 设置权限的最大序号
            for (const group of list) {
                if (!group.children) continue;
                for (const perm of group.children) {
                    perm.maxSeqNo = group.children.length - 1;
                }
            }
            extra.list = list;
            return ro;
        });
    }
}
