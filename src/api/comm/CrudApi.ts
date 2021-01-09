import { Ro } from '@/ro/Ro';

export default interface CrudApi {
    /**
     * 添加
     */
    add(mo): Promise<Ro>;

    /**
     * 修改
     */
    modify(mo): Promise<Ro>;

    /**
     * 删除
     */
    delById(id: string): Promise<Ro>;

    /**
     * 根据id获取信息
     */
    getById(id: string): Promise<Ro>;

    /**
     * 获取所有列表
     */
    listAll(): Promise<Ro>;
}
