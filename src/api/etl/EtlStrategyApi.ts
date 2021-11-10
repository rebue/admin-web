/*
 * @Date: 2021-09-27 10:56:59
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-29 12:23:51
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
            const clidData = data.one;
            let tableName: any = [],
                tableEndName: any = [];
            const tableSelect: any = [],
                tableEndSelect: any = [];
            clidData.strategyDetailList.map((item: { srcTableName: any; dstTableName: any }) => {
                tableName.push(item.srcTableName);
                tableEndName.push(item.dstTableName);
            });
            clidData.srcTableName.map((item: any) => {
                tableSelect.push({
                    name: item,
                    value: item,
                });
            });
            clidData.dstTableName.map((item: any) => {
                tableEndSelect.push({
                    name: item,
                    value: item,
                });
            });
            tableName = Array.from(new Set(tableName));
            tableEndName = Array.from(new Set(tableEndName));
            const tableArray: any = [],
                fieldSelect: any = {},
                tableEndArray: any = [],
                fieldEndSelect: any = [];
            tableName.map((item: any, index: string | number) => {
                tableArray.push({
                    startSurface: {
                        model: item,
                        selectData: tableSelect,
                    },
                    endSurface: [],
                });
                fieldSelect[item] = [];
                clidData.srcFieldsMap[item].map(fieldItem => {
                    fieldSelect[item].push({
                        name: fieldItem,
                        value: fieldItem,
                    });
                });
                clidData.strategyDetailList.map((childItem: { srcTableName: any; srcFieldName: any }) => {
                    if (item == childItem.srcTableName) {
                        tableArray[index].endSurface.push({
                            model: childItem.srcFieldName,
                            selectData: fieldSelect[item],
                        });
                    }
                });
            });
            tableEndName.map((item: any, index: string | number) => {
                tableEndArray.push({
                    startSurface: {
                        model: item,
                        selectData: tableEndSelect,
                    },
                    endSurface: [],
                });
                fieldEndSelect[item] = [];
                clidData.dstFieldsMap[item].map(fieldItem => {
                    fieldEndSelect[item].push({
                        name: fieldItem,
                        value: fieldItem,
                    });
                });
                clidData.strategyDetailList.map((childItem: { dstTableName: any; dstFieldName: any }) => {
                    if (item == childItem.dstTableName) {
                        tableEndArray[index].endSurface.push({
                            model: childItem.dstFieldName,
                            selectData: fieldEndSelect[item],
                        });
                    }
                });
            });
            // 删除转换前的属性
            delete clidData.strategyDetailList;
            clidData.srcTableArray = tableArray;
            clidData.dstTableArray = tableEndArray;
            return ro;
        });
    }
    /**
     * 修改
     */
    modify(mo): Promise<Ro> {
        delete mo.srcTableArray;
        delete mo.dstTableArray;
        delete mo.dstTableName;
        delete mo.srcTableName;
        delete mo.srcFieldsMap;
        delete mo.dstFieldsMap;
        return request.put({ url: this.baseUrn, data: mo });
    }
    /**
     * 启动
     */
    enable(mo): Promise<Ro> {
        return request.post({ url: this.baseUrn + '/enable', data: mo });
    }
}
