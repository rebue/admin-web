import { observable } from 'mobx';

export class UserStore {
    @observable
    userId = '';
    @observable
    sign = '';
}

export const userStore = new UserStore();
