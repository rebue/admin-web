import { action } from 'mobx';
import { sysStore, userStore } from '@/store/Store';
import { SysIdDic } from '@/dic/SysIdDic';

class RacSignInAction {
    @action
    signInSuccess(sysId: SysIdDic, userId: string) {
        sysStore.sysId = sysId;
        userStore.userId = userId;
    }
}

export const racSignInAction = new RacSignInAction();
