import { observable } from 'mobx';

export default class AccountStore {
    /** 用户ID */
    @observable
    accountId = '';
    /** 用户昵称 */
    @observable
    nickname = '';
    /** 用户头像 */
    @observable
    avatar = '';
    /** 是否测试者 */
    @observable
    isTester = false;
    /** 菜单列表 */
    @observable
    menus = [];
}