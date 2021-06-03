/**
 * 代理登录相关请求
 */
import { Ro } from '@/ro/Ro';
import AgentSignInTo from '@/to/rac/AgentSignInTo';
import request from '@/util/request';

export default class RacAgentSignInApi {
    /**
     * 通过账户名称登录
     */
    signIn(to: AgentSignInTo): Promise<Ro> {
        return request.post({ url: '/rac/agent-sign-in/sign-in', data: to });
    }
}
