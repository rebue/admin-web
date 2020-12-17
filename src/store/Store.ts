import * as mobx from 'mobx';
import SysStore from './SysStore';
import UserStore from './UserStore';

mobx.configure({ enforceActions: 'observed' });

export const sysStore = new SysStore();
export const userStore = new UserStore();
