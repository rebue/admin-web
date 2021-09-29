/*
 * @Date: 2021-09-27 10:56:59
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-29 08:41:15
 * @FilePath: \admin-web\src\api\etl\EtlStrategyApi.ts
 */
/**
 * 同步策略相关请求
 */
import request from '@/util/request';
import BaseCrudApi from '../comm/BaseCrudApi';
import { Ro } from '@/ro/Ro';
export default class EtlStrategyApi extends BaseCrudApi {
    /** 请求的基础链接 */
    baseUrn = '/etl-svr/etl/sync-strategy';
    /**
     * 根据id获取信息
     */
    getById(id: string): Promise<Ro> {
        return request.get({ url: this.baseUrn + '/get-by-id?id=' + id }).then(ro => {
            const data: any = ro.extra;
            let tableName: any = [],
                tableEndName: any = [];
            data.one.strategyDetailList.map(item => {
                tableName.push(item.srcTableName);
                tableEndName.push(item.dstTableName);
            });
            tableName = Array.from(new Set(tableName));
            tableEndName = Array.from(new Set(tableEndName));
            const tableArray: any = [],
                tableEndArray: any = [];
            tableName.map((item, index) => {
                tableArray.push({
                    startSurface: {
                        model: item,
                        selectData: [],
                    },
                    endSurface: [],
                });
                data.strategyDetailList.map(childItem => {
                    if (item == childItem.srcTableName) {
                        tableArray[index].endSurface.push({
                            model: childItem.srcFieldName,
                            selectData: [],
                        });
                    }
                });
            });
            tableEndName.map((item, index) => {
                tableEndArray.push({
                    startSurface: {
                        model: item,
                        selectData: [],
                    },
                    endSurface: [],
                });
                data.strategyDetailList.map(childItem => {
                    if (item == childItem.srcTableName) {
                        tableEndArray[index].endSurface.push({
                            model: childItem.srcFieldName,
                            selectData: [],
                        });
                    }
                });
            });
            // 删除转换前的属性
            delete data.strategyDetailList;
            data.srcTableArray = tableArray;
            data.dstTableArray = tableEndArray;
            return ro;
        });
    }
}
