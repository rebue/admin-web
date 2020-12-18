import { observable } from 'mobx';
import { SysIdDic } from '@/dic/SysIdDic';

export default class SysStore {
    @observable
    sysId = SysIdDic.None;
    @observable
    sysName = '';
}
