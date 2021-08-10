/**
 * 领域类型
 */
export enum RealmDic {
    /** 默认领域 */
    Default = 'default',
    /** 运营领域 */
    Ops = 'ops',
    /** 平台领域 */
    Platform = 'platform',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RealmDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: RealmDic): string {
        switch (val) {
            case RealmDic.Default:
                return '默认领域';
            case RealmDic.Ops:
                return '运营领域';
            case RealmDic.Platform:
                return '平台领域';
            default:
                return '未定义';
        }
    }
}
