import { action } from 'mobx';
import { sysStore, userStore } from '@/store/Store';
import { SysIdDic } from '@/dic/SysIdDic';
import { setToken } from '@/util/token';

class RacSignInAction {
    @action
    loginSuccess(sysId: SysIdDic, userId: string, sign: string) {
        sysStore.sysId = sysId;
        userStore.userId = userId;
        setToken(sign);
    }
}

export const racSignInAction = new RacSignInAction();
