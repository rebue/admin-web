import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import CrudApi from './CrudApi';

export default class BaseCrudApi implements CrudApi {
    protected baseUrn;

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
     * 获取所有列表
     */
    listAll(): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-all' });
    }
}
