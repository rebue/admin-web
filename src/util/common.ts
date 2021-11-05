import { AppIdDic } from '@/dic/AppIdDic';

/** 获取url中的应用ID */
export function getAppIdByUrl() {
    const pathname = location.pathname;
    let appId = '';
    Object.values(AppIdDic).forEach(val => {
        if (pathname.includes(`/${val}`)) {
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

// 获取url参数中的某个入参值
export function getQueryVariable(url, variable) {
    const query = url.split('?')[1];
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
