import { observable } from 'mobx';
import { SysIdDic } from '@/dic/SysIdDic';

class SysStore {
    @observable
    sysId = SysIdDic.AdminWeb;
}

export const sysStore = new SysStore();
