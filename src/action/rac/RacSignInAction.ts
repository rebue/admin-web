import { action } from 'mobx';
import { sysStore } from '@/store/SysStore';
import { userStore } from '@/store/UserStore';
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
