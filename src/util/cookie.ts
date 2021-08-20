import Cookies from 'js-cookie';
import { jwtTokenKey, appIdKey } from '@/env';
import { AppIdDic } from '@/dic/AppIdDic';

/** JWT */
export function hasJwtToken(): boolean {
    return Cookies.get(jwtTokenKey) ? true : false;
}
export function removeJwtToken() {
    return Cookies.remove(jwtTokenKey);
}

/** APP_ID */
export function setAppId(appId: AppIdDic) {
    return Cookies.set(appIdKey, appId);
}
export function getAppId() {
    return Cookies.get(appIdKey);
}
export function removeAppId() {
    return Cookies.remove(appIdKey);
}
