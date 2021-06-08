/**
 * 领域信息相关请求
 */
import { RacDicItemMo } from '@/mo/rac/RacDicItemMo';
import { RacDicMo } from '@/mo/rac/RacDicMo';
import { Ro } from '@/ro/Ro';
import { PageRa } from '@/ro/PageRa';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacDicApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac/dic';

    /**
     * 获取分页所有列表
     */
    page(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/list-with-dic', params: qo }).then(ro => {
            const extra = ro.extra as { page: PageRa; dicList?: RacDicMo[]; itemList?: RacDicItemMo[] };
            const { dicList, itemList } = extra;
            const list: RacDicMo[] = [];
            // 循环分组
            for (const dic of dicList as RacDicMo[]) {
                list.push(dic);
            }
            // 将字典项加入字典中
            for (const dicItem of itemList as RacDicItemMo[]) {
                for (const dic of dicList as RacDicMo[]) {
                    if (dic['id'] === dicItem['dicId']) {
                        if (!dic.children) dic.children = [];
                        dic.children.push(dicItem);
                        continue;
                    }
                }
            }
            // 删除转换前的属性
            delete extra.dicList;
            delete extra.itemList;
            extra.page.list = list;

            return ro;
        });
    }
}
