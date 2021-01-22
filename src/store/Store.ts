import * as mobx from 'mobx';
import SettingStore from './SettingStore';
import AccountStore from './AccountStore';

mobx.configure({ enforceActions: 'observed' });

export const accountStore = new AccountStore();
export const settingStore = new SettingStore();
