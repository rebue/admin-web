/**
 * 字典信息相关请求
 */
import { RacDicItemMo } from '@/mo/rac/RacDicItemMo';
import { RacDicMo } from '@/mo/rac/RacDicMo';
import { Ro } from '@/ro/Ro';
import { PageRa } from '@/ro/PageRa';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class RacDicApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/dic';

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
            // 将字典项加入字典项中
            //防止itemList有可能为undfined 警告
            if (itemList) {
                for (let i = 0; i < itemList.length; i++) {
                    for (let j = 0; j < itemList.length; j++) {
                        //确保是在同一个字典下面
                        if (itemList[i].dicId === itemList[j].dicId) {
                            //确保是仅是上下一级的关系
                            if (itemList[j].treeCode.length - itemList[i].treeCode.length == 3) {
                                const len = itemList[i].treeCode.length;
                                const substring = itemList[j].treeCode.substring(0, len);
                                //树编码相同则添加
                                if (itemList[i].treeCode === substring) {
                                    //没有childern属性则添加
                                    if (!itemList[i].children) {
                                        itemList[i].children = [];
                                    }
                                    itemList[i].children?.push(itemList[j]);
                                    continue;
                                }
                            }
                        }
                    }
                }
            }
            // 将字典项加入字典中
            for (const dicItem of itemList as RacDicItemMo[]) {
                for (const dic of dicList as RacDicMo[]) {
                    if (dic['id'] === dicItem['dicId'] && dicItem.treeCode.length === 3) {
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
            console.log(ro);

            return ro;
        });
    }
}
