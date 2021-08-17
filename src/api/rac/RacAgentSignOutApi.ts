/**
 * 退出代理登录相关请求
 */
import { Ro } from '@/ro/Ro';
import request from '@/util/request';

export default class RacAgentSignOutApi {
    /**
     * 通过账户名称登录
     */
    signOut(): Promise<Ro> {
        return request.post({ url: '/rac-svr/rac/agent-sign-out/sign-out' });
    }
}
