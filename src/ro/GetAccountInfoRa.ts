export interface GetAccountInfoRa {
    /** 领域ID */
    realmId: string;
    /** 账户ID */
    id: string;
    /** 账户编码 */
    code: string;
    /** 账户昵称 */
    signInNickname: string;
    /** 账户头像 */
    avatar: string;
    /** 代理账户ID */
    agentAccountId: string;
    /** 代理账户昵称 */
    agentNickname: string;
    /** 代理账户头像 */
    agentAvatar: string;
    /** 账户组织ID */
    orgId: string;
    /** 账户组织全名 */
    orgFullName: string;
    /** 是否测试者 */
    isTester: boolean;
    /** 菜单列表 */
    menus: string[];
    /** 用户信息 */
    user: Record<string, any>;
    /** 绑定的微信UnionId */
    wxUnionId: string;
    /** 绑定的钉钉UnionId */
    ddUnionId: string;
    /** 绑定的手机号 */
    signInMobile: string;
}
