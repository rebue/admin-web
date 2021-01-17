import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';

/**
 * 领域
 */
export default class RacPermMo {
    /** ID */
    id = '';
    /** 名称 */
    name = '';
    /** 领域ID */
    domainId = '';
    /** 分组ID */
    groupId = '';
    /** 启用 */
    isEnabled = false;
    /** 顺序号 */
    orderNo = 0;
    /** 备注 */
    remark?: string;

    /** 下面是前端添加的属性 */
    /** 类型 */
    type: PermTreeNodeTypeDic = PermTreeNodeTypeDic.Perm;
}
