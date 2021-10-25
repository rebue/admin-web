/**
 * 操作日志信息相关请求
 */
import { Ro } from '@/ro/Ro';
import BaseCrudApi from '../comm/BaseCrudApi';
import request from '@/util/request';

export default class RacOpLogApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/op-log';
    /**
     * 获取分页列表
     */
    page(qo): Promise<Ro> {
        if (!qo.orderBy) {
            qo.orderBy = 'opDatetime DESC';
        }
        return super.page(qo);
    }
    /**
     * 获取今日账号概况
     */
    getCountSurvey(data): Promise<Ro> {
        data.startDate = data.startDate == undefined ? '' : data.startDate;
        data.endDate = data.endDate == undefined ? '' : data.endDate;
        return request.get({
            url: this.baseUrn + `/count-survey?startDate=${data.startDate}&endDate=${data.endDate}`,
        });
    }
}
