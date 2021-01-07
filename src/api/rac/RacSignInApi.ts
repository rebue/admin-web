/**
 * 登录相关请求
 */
import { Ro } from '@/ro/Ro';
import SignInByUserNameTo from '@/to/rac/SignInByUserNameTo';
import request from '@/util/request';

export default class RacSignInApi {
    /**
     * 通过用户名称登录
     */
    static signInByUserName(to: SignInByUserNameTo): Promise<Ro> {
        console.log('RacSignInApi.signInByUserName', to);
        return request.post({ url: '/rac/sign-in/sign-in-by-user-name', data: to });
    }
}
