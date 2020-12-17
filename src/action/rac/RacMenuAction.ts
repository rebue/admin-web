import { action } from 'mobx';
import { listOwnRacMenu } from '@/api/rac/RacMenuApi';
import { Ro } from '@/ro/Ro';

export class RacMenuAction {
    /**
     * 刷新菜单
     */
    @action
    refreshRacMenu() {
        listOwnRacMenu().then(this.listOwnRacMenuSuccess);
    }

    /**
     * 请求列出自己的菜单成功
     *
     * @param ro 返回结果
     */
    @action
    listOwnRacMenuSuccess(ro: Ro) {
        console.log('listOwnRacMenuSuccess', ro);
    }
}
