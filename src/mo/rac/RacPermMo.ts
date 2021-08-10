import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';

/**
 * 领域
 */
export class RacPermMo {
    /** ID */
    id = '';
    /** 名称 */
    name = '';
    /** 领域ID */
    realmId = '';
    /** 分组ID */
    groupId = '';
    /** 启用 */
    isEnabled = false;
    /** 顺序号 */
    seqNo = 0;
    /** 备注 */
    remark?: string;

    /** 下面是前端添加的属性 */
    /** 类型 */
    type: PermTreeNodeTypeDic = PermTreeNodeTypeDic.Perm;
    /** 最大顺序号 */
    maxSeqNo?: number;
}
