import Cookies from 'js-cookie';
import { jwtTokenKey, sysIdKey } from '@/env';
import { SysIdDic } from '@/dic/SysIdDic';

/** JWT */
export function removeJwtToken() {
    return Cookies.remove(jwtTokenKey);
}

/** SYS_ID */
export function setSysId(sysId: SysIdDic) {
    return Cookies.set(sysIdKey, sysId);
}
export function getSysId() {
    return Cookies.get(sysIdKey);
}
export function removeSysId() {
    return Cookies.remove(sysIdKey);
}
