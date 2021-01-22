import { action, observable } from 'mobx';
import { userStore } from '@/store/Store';
import { Ro } from '@/ro/Ro';
import { constantRouters } from '@/config/router.config';
import { GetAccountInfoRa } from '@/ro/GetAccountInfoRa';
import { racAccountApi } from '@/api/Api';
import { settingAction } from '../Action';

export class RacAccountAction {
    /**
     * 刷新用户信息
     */
    @action
    refreshAccountInfo() {
        racAccountApi.getCurAccountInfo().then(this.getCurAccountInfoSuccess);
    }

    /**
     * 请求获取当前用户信息成功
     *
     * @param ro 返回结果
     */
    @action
    getCurAccountInfoSuccess(ro: Ro) {
        console.log('getCurAccountInfoSuccess', ro);

        const ra: GetAccountInfoRa = ro.extra as GetAccountInfoRa;
        userStore.userId = ra.id;
        userStore.nickname = ra.nickname;
        userStore.avatar = ra.avatar;
        userStore.isTester = ra.isTester;

        // 设置菜单
        const menus = constantRouters.find(item => item.path === '/').children;
        for (const menu of ra.menus) {
            const sections = menu.split('/');
            const section1 = sections[1];
            const section2 = sections[2];
            const section3 = sections[3];
            const section4 = sections[4];
            const section5 = sections[5];
            if (!section1) continue;
            const menu1 = menus.find(item => item.name === section1);
            menu1.hidden = false;
            if (!section2) continue;
            const menu2 = menu1.children.find(item => item.name === section2);
            menu2.hidden = false;
            if (!section3) continue;
            const menu3 = menu1.children.find(item => item.name === section3);
            menu3.hidden = false;
            if (!section4) continue;
            const menu4 = menu1.children.find(item => item.name === section4);
            menu4.hidden = false;
            if (!section5) continue;
            const menu5 = menu1.children.find(item => item.name === section5);
            menu5.hidden = false;
        }
        userStore.menus = observable(menus);

        // 加载用户设置
        settingAction.loadSetting();
    }
}
