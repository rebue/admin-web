import { action } from 'mobx';
import { sysStore, userStore } from '@/store/Store';
import { SysIdDic } from '@/dic/SysIdDic';
import { racMenuAction } from '@/action/Action';

export class RacSignInAction {
    @action
    signInSuccess(sysId: SysIdDic, userId: string) {
        sysStore.sysId = sysId;
        userStore.userId = userId;
        racMenuAction.refreshUserInfo();
    }
}
