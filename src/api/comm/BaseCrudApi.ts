import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import CrudApi from './CrudApi';

export default class BaseCrudApi implements CrudApi {
    /** 请求的基础链接 */
    protected baseUrn;

    /** 是否需要排序 */
    protected hasSort = false;

    /**
     * 添加
     */
    add(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn, data: mo });
    }
    /**
     * 修改
     */
    modify(mo): Promise<Ro> {
        return request.put({ url: this.baseUrn, data: mo });
    }
    /**
     * 删除
     */
    delById(id: string): Promise<Ro> {
        return request.delete({ url: this.baseUrn + '?id=' + id });
    }
    /**
     * 根据id获取信息
     */
    getById(id: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-by-id?id=' + id });
    }
    /**
     * 获取列表
     */
    list(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list', params: qo }).then(ro => {
            const list = ro.extra['list'];
            if (!list || list.length === 0 || list[0].seqNo === undefined) return ro;
            for (const item of list) {
                item.maxSeqNo = list.length - 1;
            }
            return ro;
        });
    }
    /**
     * 获取所有列表
     */
    listAll(): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-all' });
    }
}
