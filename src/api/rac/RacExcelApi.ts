/**
 * 导入和导出
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
export default class RacExcelApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/rac-svr/rac/excel/';
    //导出模板
    getDownload(data) {
        return request.get({ url: this.baseUrn + data + '/template-download' });
    }
    //导入模板
    getUpload(data) {
        return request.get({ url: this.baseUrn + data + '/template-upload' });
    }
}
