/**
 * 领域类型
 */
export enum DomainDic {
    /** 默认领域 */
    Default = 'default',
    /** 运营领域 */
    Ops = 'ops',
    /** 平台领域 */
    Platform = 'platform',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DomainDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: DomainDic): string {
        switch (val) {
            case DomainDic.Default:
                return '默认领域';
            case DomainDic.Ops:
                return '运营领域';
            case DomainDic.Platform:
                return '平台领域';
            default:
                return '未定义';
        }
    }
}
