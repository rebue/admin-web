import { OrgTypeDic } from '@/dic/OrgTypeDic';
import { PermTreeNodeTypeDic } from '@/dic/PermTreeNodeTypeDic';
import RacPermMo from './RacPermMo';

/**
 * 领域
 */
export default class RacOrgMo {
    /** ID */
    id = '';
    /** 名称 */
    name = '';
    /** 领域ID */
    parentId = '';
    /** 领域ID */
    domainId = '';
    /** 组织类型 */
    orgType?: OrgTypeDic;
    /** 启用 */
    isEnabled = false;
    /** 组织全称 */
    fullName = '';
    /** 备注 */
    remark?: string;

    /** 下面是前端添加的属性 */
    /** 权限列表 */
    children?: RacOrgMo[];
}
