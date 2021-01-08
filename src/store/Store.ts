import * as mobx from 'mobx';
import SettingStore from './SettingStore';
import UserStore from './UserStore';

mobx.configure({ enforceActions: 'observed' });

export const userStore = new UserStore();
export const settingStore = new SettingStore();
