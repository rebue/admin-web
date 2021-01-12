import { action } from 'mobx';
import { settingStore } from '@/store/Store';
import { TableSizeDic } from '@/dic/TableSizeDic';
import localForage from 'localforage';

const TABLE_SIZE = 'table-size';
const TABLE_BORDER = 'table-border';

export class SettingAction {
    constructor() {
        localForage.getItem(TABLE_SIZE).then(value => this.setTableSize(value as TableSizeDic));
        localForage.getItem(TABLE_BORDER).then(value => this.changeTableBorderWithoutPersist(value as boolean));
    }
    /**
     * 改变表格边框(不保存)
     */
    @action
    changeTableBorderWithoutPersist(val) {
        settingStore.tableBorder = val;
    }
    /**
     * 切换表格边框
     */
    @action
    switchTableBorder() {
        settingStore.tableBorder = !settingStore.tableBorder;
        localForage.setItem(TABLE_BORDER, settingStore.tableBorder);
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
