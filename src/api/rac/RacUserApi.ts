/**
 * 用户信息相关请求
 */
import md5 from 'crypto-js/md5';
import { Ro } from '@/ro/Ro';
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { RacUserEnableMo } from '@/mo/rac/RacUserEnableMo';

export default class RacUserApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/user';

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
     * 启用用户
     */
    enable(record: RacUserEnableMo): Promise<Ro> {
        const { id, isEnabled, lockReason, unlockReason } = record;
        return request.put({
            url: this.baseUrn + '/enable',
            data: { id, isEnabled, lockReason, unlockReason },
        });
    }

    /**
     * 禁用用户
     */
    disable(record: RacUserEnableMo): Promise<Ro> {
        const { id, isEnabled, lockReason, unlockReason } = record;
        return request.put({
            url: this.baseUrn + '/disable',
            data: { id, isEnabled, lockReason, unlockReason },
        });
    }

    /**
     * 获取当前用户信息
     */
    getCurUserInfo(): Promise<Ro> {
        return request.get({ url: '/rac-svr/rac/user/get-cur-User-info' });
    }
}
