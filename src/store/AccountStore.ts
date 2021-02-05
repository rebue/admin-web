import { observable } from 'mobx';

export default class AccountStore {
    /** 账户ID */
    @observable
    accountId = '';
    /** 账户昵称 */
    @observable
    nickname = '';
    /** 账户头像 */
    @observable
    avatar = '';
    /** 是否测试者 */
    @observable
    isTester = false;
    /** 菜单列表 */
    @observable
    menus = [];
}
