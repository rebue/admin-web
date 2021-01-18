import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import RacPermMo from './RacPermMo';

/**
 * 领域
 */
export default class RacPermGroupMo {
    /** ID */
    id = '';
    /** 名称 */
    name = '';
    /** 领域ID */
    domainId = '';
    /** 启用 */
    isEnabled = false;
    /** 顺序号 */
    seqNo = 0;
    /** 备注 */
    remark?: string;

    /** 下面是前端添加的属性 */
    /** 类型 */
    type: PermTreeNodeTypeDic = PermTreeNodeTypeDic.PermGroup;
    /** 最大顺序号 */
    maxSeqNo?: number;
    /** 权限列表 */
    children?: RacPermMo[];
}
