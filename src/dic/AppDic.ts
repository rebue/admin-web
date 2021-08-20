/**
 * 应用类型
 */
export enum AppDic {
    // /** 未定义 */
    // None = '',
    /** 平台后台管理 */
    PlatformAdminWeb = 'platform-admin-web',
    /** 运营后台管理 */
    OpsAdminWeb = 'ops-admin-web',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: AppDic): string {
        switch (val) {
            // case AppDic.None:
            //     return '默认应用';
            case AppDic.OpsAdminWeb:
                return '运营应用';
            case AppDic.PlatformAdminWeb:
                return '平台应用';
            default:
                return '未定义';
        }
    }
}
