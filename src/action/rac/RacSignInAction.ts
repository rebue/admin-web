import { action } from 'mobx';
import { SysIdDic } from '@/dic/SysIdDic';
import { setSysId } from '@/util/cookie';

export class RacSignInAction {
    @action
    signInSuccess(sysId: SysIdDic) {
        setSysId(sysId);
    }
}
