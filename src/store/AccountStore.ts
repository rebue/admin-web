import { observable } from 'mobx';

export default class AccountStore {
    /** 账户ID */
    @observable
    accountId = '';
    /** 账户编码 */
    @observable
    code = '';
    /** 账户昵称 */
    @observable
    nickname = '';
    /** 账户头像 */
    @observable
    avatar = '';
    /** 代理账户ID */
    @observable
    agentAccountId = '';
    /** 代理账户昵称 */
    @observable
    agentNickname = '';
    /** 代理账户头像 */
    @observable
    agentAvatar = '';
    /** 是否测试者 */
    @observable
    isTester = false;
    /** 账户组织ID */
    @observable
    orgId = '';
    /** 账户组织全名 */
    @observable
    orgFullName = '';
    /** 菜单列表 */
    @observable
    menus: string[] = [];
    /** 用户信息 */
    @observable
    user = {};
}
