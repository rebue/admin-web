/**
 * 领域信息相关请求
 */
import RacPermGroupMo from '@/mo/rac/RacPermGroupMo';
import RacPermMo from '@/mo/rac/RacPermMo';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermApi extends BaseCrudApi {
    baseUrn = '/rac/perm';

    /**
     * 获取带分组的列表
     */
    list(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-with-group', params: qo }).then(ro => {
            const extra = ro.extra as { list: RacPermGroupMo[]; groupList?: RacPermGroupMo[]; permList?: RacPermMo[] };
            const { groupList, permList } = extra;
            const list: RacPermGroupMo[] = [];
            for (const group of groupList as RacPermGroupMo[]) {
                group.type = 'PermGroup';
                list.push(group);
            }
            for (const perm of permList as RacPermMo[]) {
                for (const group of groupList as RacPermGroupMo[]) {
                    if (group['id'] === perm['groupId']) {
                        if (!group.children) group.children = [];
                        perm.type = 'Perm';
                        group.children.push(perm);
                        continue;
                    }
                }
            }
            delete extra.groupList;
            delete extra.permList;
            extra.list = list;
            return ro;
        });
    }
}
