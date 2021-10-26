import { AppIdDic } from '@/dic/AppIdDic';

/** 获取url中的应用ID */
export function getAppIdByUrl() {
    const pathname = location.pathname;
    let appId = '';
    Object.values(AppIdDic).forEach(val => {
        if (pathname.includes(`/${val}/`)) {
            appId = val;
        }
    });
    return appId;
}

/** 重新发送短信倒计时 */
export function countDown(second, cb, immediate = false) {
    if (immediate) {
        if (second == 0) {
            return;
        }
        second = second - 1;
        cb && cb(second);
    }
    setTimeout(() => {
        countDown(second, cb, true);
    }, 1000);
}
