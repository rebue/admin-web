import { observable } from 'mobx';

export default class UserStore {
    @observable
    userId = '';
    @observable
    menus = [];
}
