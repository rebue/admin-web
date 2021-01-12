import { action } from 'mobx';
import { settingStore } from '@/store/Store';
import { TableSizeDic } from '@/dic/TableSizeDic';
import localForage from 'localforage';

const TABLE_SIZE = 'table-size';
const TABLE_BORDER = 'table-border';

export class SettingAction {
    constructor() {
        localForage.getItem(TABLE_SIZE).then(value => this.setTableSize(value as TableSizeDic));
        localForage.getItem(TABLE_BORDER).then(value => this.changeTableBorder(value as boolean));
    }
    /**
     * 改变表格边框
     */
    @action
    changeTableBorder(val: boolean) {
        settingStore.tableBorder = val;
        localForage.setItem(TABLE_BORDER, val);
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
