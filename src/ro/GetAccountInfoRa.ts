export interface GetAccountInfoRa {
    /** 账户ID */
    id: string;
    /** 账户组织ID */
    orgId: string;
    /** 账户组织全名 */
    orgFullName: string;
    /** 账户昵称 */
    nickname: string;
    /** 账户头像 */
    avatar: string;
    /** 是否测试者 */
    isTester: boolean;
    /** 菜单列表 */
    menus: string[];
}
