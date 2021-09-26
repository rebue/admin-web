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
    getUserList(params): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-by-user-id', params: params });
    }
}
