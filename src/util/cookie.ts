import Cookies from 'js-cookie';
import { jwtTokenKey, authInfoKey, appIdKey } from '@/env';
import { AppIdDic } from '@/dic/AppIdDic';

/** JWT */
export function hasJwtToken(): boolean {
    return Cookies.get(jwtTokenKey) ? true : false;
}
export function removeJwtToken() {
    return Cookies.remove(jwtTokenKey);
}

/** auth_info */
export function hasAuthInfo(): boolean {
    return Cookies.get(authInfoKey) ? true : false;
}
export function removeAuthInfo() {
    return Cookies.remove(authInfoKey);
}

/** APP_ID 去掉app_id的cookie了 */
export function setAppId(appId: AppIdDic) {
    return Cookies.set(appIdKey, appId);
}
export function getAppId() {
    return Cookies.get(appIdKey);
}
export function removeAppId() {
    return Cookies.remove(appIdKey);
}
