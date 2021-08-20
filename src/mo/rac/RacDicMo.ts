import { RacDicItemMo } from './RacDicItemMo';

/*** 字典*/
export class RacDicMo {
    /***字典ID*/
    id = '';
    /*** 字典名称*/
    name = '';
    /*** 领域ID*/
    realmId = '';
    /*** 应用ID*/
    appId = '';
    /*** 字典备注*/
    remark = '';
    /** 字典项列表 */
    children?: RacDicItemMo[];
}
