/**
 * 领域信息相关请求
 */
import RacDomainMo from '@/mo/rac/RacDomainMo';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacDomainApi {
    /**
     * 添加
     */
    static add(mo: RacDomainMo): Promise<Ro> {
        console.log('RacDomainApi.add', mo);
        return request.post({ url: '/rac/domain', data: mo });
    }

    /**
     * 修改
     */
    static modify(mo: RacDomainMo): Promise<Ro> {
        console.log('RacDomainApi.modify', mo);
        return request.put({ url: '/rac/domain', data: mo });
    }

    /**
     * 删除
     */
    static del(id: string): Promise<Ro> {
        console.log('RacDomainApi.del', id);
        return request.delete({ url: '/rac/domain?id=' + id });
    }

    /**
     * 获取所有列表
     */
    static getById(id: string): Promise<Ro> {
        console.log('RacDomainApi.getById', id);
        return request.get({ url: '/rac/domain/get-by-id?id=' + id });
    }

    /**
     * 获取所有列表
     */
    static listAll(): Promise<Ro> {
        console.log('RacDomainApi.listAll');
        return request.get({ url: '/rac/domain/list-all' });
    }
}
