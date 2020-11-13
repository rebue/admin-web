import { SysIdDic } from '@/dic/SysIdDic';
import { observable } from 'mobx';

class SysStore {
    @observable
    sysId: string = SysIdDic.AdminWeb;
}

export default new SysStore();
