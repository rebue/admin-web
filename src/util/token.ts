import Cookies from 'js-cookie';
import { jwtTokenKey } from '@/env';

export function getToken() {
    return Cookies.get(jwtTokenKey);
}

export function removeToken() {
    return Cookies.remove(jwtTokenKey);
}
