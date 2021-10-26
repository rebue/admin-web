import { action, observable } from 'mobx';
import { accountStore } from '@/store/Store';
import { Ro } from '@/ro/Ro';
import { constantRouters } from '@/config/router.config';
import { GetAccountInfoRa } from '@/ro/GetAccountInfoRa';
import { racAccountApi } from '@/api/Api';
import { settingAction } from '../Action';
import { getAppIdByUrl } from '@/util/common';

const matchRouteHidden = function(perm, listTree) {
    for (const v of listTree) {
        if (perm.includes(v.path)) {
            v.hidden = false;
        }
        if (v.children && v.children.length) {
            matchRouteHidden(perm, v.children);
            // 处理父级的展示
            v.hidden = v.children.every(item => {
                return item.hidden == true;
            });
        }
    }
};
export class RacAccountAction {
    /**
     * 刷新账户信息
     */
    @action
    refreshAccountInfo() {
        racAccountApi.getCurAccountInfo().then(this.getCurAccountInfoSuccess);
    }

    /**
     * 请求获取当前账户信息成功
     *
     * @param ro 返回结果
     */
    @action
    getCurAccountInfoSuccess(ro: Ro) {
        const ra: GetAccountInfoRa = ro.extra as GetAccountInfoRa;
        accountStore.realmId = ra.realmId;
        accountStore.accountId = ra.id;
        accountStore.code = ra.code;
        accountStore.nickname = ra.signInNickname;
        accountStore.avatar = ra.avatar;
        accountStore.agentAccountId = ra.agentAccountId;
        accountStore.agentNickname = ra.agentNickname;
        accountStore.agentAvatar = ra.agentAvatar;

        accountStore.orgId = ra.orgId;
        accountStore.orgFullName = ra.orgFullName;
        accountStore.isTester = ra.isTester;
        // 用户信息
        accountStore.user = { ...ra.user };

        // 绑定的微信UnionId
        accountStore.wxUnionId = ra.wxUnionId;
        // 绑定的钉钉UnionId
        accountStore.ddUnionId = ra.ddUnionId;

        // 绑定的钉钉UnionId
        accountStore.signInMobile = ra.signInMobile;
        // 设置菜单
        const appId = getAppIdByUrl();
        let menus = constantRouters.find(item => item.path === `/${appId}`).children;
        menus = JSON.parse(JSON.stringify(menus));
        matchRouteHidden(ra.menus, menus);
        const menusTemp: string[] = [...menus];
        accountStore.menus = observable(menusTemp);

        // 加载账户设置
        settingAction.loadSetting();
    }
}
