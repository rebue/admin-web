/**
 * 领域信息相关请求
 */
import { RacPermUrnMo } from '@/mo/rac/RacPermUrnMo';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacPermUrnApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/perm-urn';

    /**
     * 添加修改URN
     */
    modifyByPermId(record: RacPermUrnMo): Promise<Ro> {
        const { permId, urn } = { ...record };
        return request.post({ url: this.baseUrn + '/modifyByPermId', data: { permId, urn } });
    }
    /**
     * 获取列表
     */
    list(qo): Promise<Ro> {
        const permId = qo;
        return request.get({ url: this.baseUrn + '/list', params: { permId } }).then(ro => {
            const list = ro.extra['list'];
            if (!list || list.length === 0 || list[0].seqNo === undefined) return ro;
            for (const item of list) {
                item.maxSeqNo = list.length - 1;
            }
            return ro;
        });
    }
}
