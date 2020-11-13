import { observable } from 'mobx';
import { SysIdDic } from '@/dic/SysIdDic';

export default class SysStore {
    @observable
    sysId: string = SysIdDic.AdminWeb;
}

export const sysStore = new SysStore();
