/**
 * 组织类型
 */
export enum OrgTypeDic {
    /** 集团 */
    Group = 1,
    /** 公司 */
    Corp = 20,
    /** 政府单位 */
    Unit = 21,
    /** 部门 */
    Dept = 80,
    /** 小组 */
    Team = 90,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrgTypeDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: OrgTypeDic): string {
        switch (val) {
            case OrgTypeDic.Group:
                return '集团';
            case OrgTypeDic.Corp:
                return '公司';
            case OrgTypeDic.Unit:
                return '政府单位';
            case OrgTypeDic.Dept:
                return '部门';
            case OrgTypeDic.Team:
                return '小组';
            default:
                return '未定义';
        }
    }
}
