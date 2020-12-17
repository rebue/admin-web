import { action } from 'mobx';
import { sysStore, userStore } from '@/store/Store';
import { SysIdDic } from '@/dic/SysIdDic';

class RacSignInAction {
    @action
    loginSuccess(sysId: SysIdDic, userId: string, sign: string) {
        sysStore.sysId = sysId;
        userStore.userId = userId;
        userStore.sign = sign;
    }
}

export const racSignInAction = new RacSignInAction();
