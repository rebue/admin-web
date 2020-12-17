import Cookies from 'js-cookie';

const TOKEN_KEY = 'admin_web_token';

export function getToken() {
    return Cookies.get(TOKEN_KEY);
}

export function setToken(token: string) {
    // 这里默认有效期是Session，就是当浏览器关闭了就丢失了
    return Cookies.set(TOKEN_KEY, token);
}

export function removeToken() {
    return Cookies.remove(TOKEN_KEY);
}
