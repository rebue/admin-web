import { action } from 'mobx';
import { settingStore } from '@/store/Store';
import { TableSizeDic } from '@/dic/TableSizeDic';
import localForage from 'localforage';

const TABLE_SIZE = 'table-size';

export class SettingAction {
    constructor() {
        localForage.getItem(TABLE_SIZE).then(value => this.setTableSize(value as TableSizeDic));
    }
    /**
     * 设置表格大小
     */
    @action
    setTableSize(size: TableSizeDic) {
        settingStore.tableSize = size;
        localForage.setItem(TABLE_SIZE, size);
    }
}
