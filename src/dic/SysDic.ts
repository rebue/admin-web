/**
 * 系统类型
 */
export enum SysDic {
    // /** 未定义 */
    // None = '',
    /** 平台后台管理 */
    PlatformAdminWeb = 'platform-admin-web',
    /** 运营后台管理 */
    OpsAdminWeb = 'ops-admin-web',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SysDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: SysDic): string {
        switch (val) {
            // case SysDic.None:
            //     return '默认系统';
            case SysDic.OpsAdminWeb:
                return '运营系统';
            case SysDic.PlatformAdminWeb:
                return '平台系统';
            default:
                return '未定义';
        }
    }
}
