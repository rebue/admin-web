/*
 * @Date: 2021-09-27 15:57:36
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-27 17:26:24
 * @FilePath: \admin-web\src\api\etl\EtlConnApi.ts
 */
/**
 * 数据库链接器相关请求
 */
import request from '@/util/request';
import { Ro } from '@/ro/Ro';
import BaseCrudApi from '../comm/BaseCrudApi';

export default class EtlStrategyApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/etl-svr/etl/conn';
    /** 添加数据库连接器*/
    getAddConn(conn): Promise<Ro> {
        return request.post({ url: this.baseUrn, data: conn });
    }
    /** 删除指定数据库连接器 */
    getdeleteConn(id): Promise<Ro> {
        return request.delete({ url: this.baseUrn + '?id=' + id });
    }
    /** 链接测试接口 */
    getTestConnectionById(id): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/test-connection-by-id?id=' + id });
        // return request.get({ url: this.baseUrn + '/get-table-name-by-id?id=' + id });
    }
    /** 获取表名接口 */
    getTableNameById(id): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-table-name-by-id?id=' + id });
    }
    /** 获取表字段接口 */
    getColumusNameById(id, tableName): Promise<Ro> {
        return request.get({ url: this.baseUrn + `/get-columus-name-by-id?id=${id}&tableName=${tableName}` });
    }
}
