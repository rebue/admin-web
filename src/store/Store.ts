import * as mobx from 'mobx';
import UserStore from './UserStore';

mobx.configure({ enforceActions: 'observed' });

export const userStore = new UserStore();
