import { action } from 'mobx';
import { sysStore } from '@/store/SysStore';

export default class SysAction {
    @action
    setSysId(sysId: string) {
        sysStore.sysId = sysId;
        console.log(sysId);
    }
}

export const sysAction = new SysAction();
