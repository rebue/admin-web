export interface GetUserInfoRa {
    /** 用户ID */
    id: string;
    /** 用户昵称 */
    nickname: string;
    /** 用户头像 */
    avatar: string;
    /** 是否测试者 */
    isTester: boolean;
    /** 菜单列表 */
    menus: string[];
}
