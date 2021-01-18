import { action } from 'mobx';
import { settingStore } from '@/store/Store';
import { TableSizeDic } from '@/dic/TableSizeDic';
import localForage from 'localforage';

const SLIDE_SIDE_COLLAPSED = 'slide-side-collapsed';
const TABLE_SIZE = 'table-size';
const TABLE_BORDER = 'table-border';

export class SettingAction {
    /**
     * 初始化时从本地存储中读取参数
     */
    constructor() {
        localForage.getItem(SLIDE_SIDE_COLLAPSED).then(value => this.setSlideSideCollapsed(value as boolean));
        localForage.getItem(TABLE_BORDER).then(value => this.setTableBorderWithoutPersist(value as boolean));
        localForage.getItem(TABLE_SIZE).then(value => this.setTableSize(value as TableSizeDic));
    }

    /**
     * 设置侧边栏是否收起(不保存，主要是初始化的时候或一些需要直接设定值的场合使用)
     */
    @action
    setSlideSideCollapsed(val: boolean) {
        settingStore.slideSideCollapsed = val;
    }
    /**
     * 切换侧边栏是否收起
     */
    @action
    toggleSlideSideCollapsed() {
        console.log('toggleSlideSideCollapsed');

        settingStore.slideSideCollapsed = !settingStore.slideSideCollapsed;
        localForage.setItem(SLIDE_SIDE_COLLAPSED, settingStore.slideSideCollapsed);
    }

    /**
     * 设置表格边框(不保存，主要是初始化的时候或一些需要直接设定值的场合使用)
     */
    @action
    setTableBorderWithoutPersist(val: boolean) {
        settingStore.tableBorder = val;
    }
    /**
     * 切换表格边框
     */
    @action
    toggleTableBorder() {
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
