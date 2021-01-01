import { action } from 'mobx';
import { sysStore } from '@/store/Store';
import { getCurUserInfo } from '@/api/rac/RacUserApi';
import { Ro } from '@/ro/Ro';

export class RacUserAction {
    /**
     * 刷新用户信息
     */
    @action
    refreshUserInfo() {
        getCurUserInfo(sysStore.sysId).then(this.getCurUserInfoSuccess);
    }

    /**
     * 请求获取当前用户信息成功
     *
     * @param ro 返回结果
     */
    @action
    getCurUserInfoSuccess(ro: Ro) {
        console.log('getCurUserInfoSuccess', ro);
    }
}
