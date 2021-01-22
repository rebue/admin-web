/**
 * 登录相关请求
 */
import { Ro } from '@/ro/Ro';
import SignInByAccountNameTo from '@/to/rac/SignInByAccountNameTo';
import request from '@/util/request';

export default class RacSignInApi {
    /**
     * 通过用户名称登录
     */
    signInByAccountName(to: SignInByAccountNameTo): Promise<Ro> {
        console.log('RacSignInApi.signInByAccountName', to);
        return request.post({ url: '/rac/sign-in/sign-in-by-account-name', data: to });
    }
}
