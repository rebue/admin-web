import { AppIdDic } from '@/dic/AppIdDic';

/** 获取url中的应用ID */
export function getAppIdByUrl() {
    const pathname = location.pathname;
    let appId = '';
    Object.values(AppIdDic).forEach(val => {
        if (pathname.endsWith(`/${val}/`)) {
            appId = val;
        }
    });
    return appId;
}
