/*** 字典*/
export class RacDicItemMo {
    /***字典项ID*/
    id = '';
    /** 字典项*/
    dicItemKey = '';
    /**字典ID*/
    dicId = '';
    /*** 字典项名称*/
    name = '';
    /**树编码 */
    treeCode = '';
    /*** 字典项备注*/
    remark = '';
    /** 字典项列表 */
    children?: RacDicItemMo[];
    /** 字典项列最大值 */
    maxSeqNo: number | undefined;
    /**当前字典项顺序 */
    seqNo: number | undefined;
}
