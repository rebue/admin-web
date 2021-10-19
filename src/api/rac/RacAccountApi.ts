/**
 * 账户信息相关请求
 */
import md5 from 'crypto-js/md5';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { RacAccountEnableMo } from '@/mo/rac/RacAccountEnableMo';

export default class RacAccountApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/account';

    /**
     * 获取分页列表
     */
    listTransferOfOrg(qo): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/listTransferOfOrg', params: qo });
    }
    /**
     * 添加
     */
    add(mo): Promise<Ro> {
        // 克隆到一个临时变量再改变属性的值，避免直接修改model引起页面改变
        const tempMo = { ...mo };
        tempMo.signInPswd = md5(mo.signInPswd).toString();
        return super.add(tempMo);
    }
    /**
     * 重置登录密码
     */
    resetSignInPswd(id: string): Promise<Ro> {
        return request.put({
            url: this.baseUrn + '/reset-sign-in-pswd',
            data: { id },
        });
    }
    /**
     * 修改登录密码
     */
    modifySignInPswd(id: string, signInPswd: string): Promise<Ro> {
        return request.put({
            url: this.baseUrn + '/modify-sign-in-pswd',
            data: { id, signInPswd: md5(signInPswd).toString() },
        });
    }

    /**
     * 修改登录密码
     */
    modifySignInPswdByOld(mo): Promise<Ro> {
        return request.put({
            url: this.baseUrn + '/modify-sign-in-by-old-pswd',
            data: mo,
        });
    }

    /**
     * 启用账户
     */
    enable(record: RacAccountEnableMo): Promise<Ro> {
        console.log('rrrrrrrrrrrrrr', record);
        const { id, realmId, isEnabled, disableReason, enableReason, accountId } = record;

        return request.put({
            url: this.baseUrn + '/enable',
            data: { id, realmId, isEnabled, disableReason, enableReason, accountId },
        });
    }

    /**
     * 禁用账户
     */
    disable(record: RacAccountEnableMo): Promise<Ro> {
        const { id, realmId, isEnabled, disableReason, enableReason, accountId } = record;
        return request.put({
            url: this.baseUrn + '/disable',
            data: { id, realmId, isEnabled, disableReason, enableReason, accountId },
        });
    }

    /**
     * 获取当前账户信息
     */
    getCurAccountInfo(): Promise<Ro> {
        return request.get({ url: '/rac-svr/rac/account/get-cur-account-info' });
    }
    /**
     * 查询用户的子账号
     */
    getAccountListByUser(params): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-by-user-id', params: params });
    }

    /**
     * 移除账户关联的用户
     */
    removeUserByAccount(data): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/disassociate-user', data: data });
    }

    /**
     * 查询账号的映射账号列表
     */
    getMapAccountList(params): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-account-by-union-id', params: params });
    }

    /**
     * 用于映射账号模块，查询账号列表
     */
    getAccountByUser(params): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-account-by-user', params: params });
    }
    /**
     * 用于映射账号模块，添加账号映射
     */
    addUnionMapper(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + '/add-union-mapper',
            data,
        });
    }
    /**
     * 用于映射账号模块，添加账号映射
     */
    delUnionMapper(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + '/del-union-mapper',
            data,
        });
    }
    /**
     * 管理员解除账户绑定钉钉
     */
    getUnbindDingTalk(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + '/unbind-ding-talk',
            data,
        });
    }
    /**
     * 管理员解除账户绑定微信
     */
    getUnbindWechatOpen(data): Promise<Ro> {
        return request.post({
            url: this.baseUrn + '/unbind-wechat-open',
            data,
        });
    }

    /**
     * 获取配置信息
     */
    getNacosConfig(): Promise<Ro> {
        return request.get({
            url: '/rac-svr/get/nacos/config',
        });
    }
    /**
     * 编辑配置信息
     */
    setNacosConfig(data): Promise<Ro> {
        return request.post({
            url: '/rac-svr/nacos/publish/config',
            data,
        });
    }
}
