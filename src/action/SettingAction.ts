import { action } from 'mobx';
import { settingStore, userStore } from '@/store/Store';
import { TableSizeDic } from '@/dic/TableSizeDic';
import localForage from 'localforage';

const SLIDE_SIDE_COLLAPSED = 'slide-side-collapsed';
const TABLE_BORDER = 'table-border';
const TABLE_STRIP = 'table-strip';
const TABLE_SIZE = 'table-size';

export class SettingAction {
    /**
     * 加载用户的设置
     */
    loadSetting() {
        localForage
            .getItem(userStore.userId + '.' + SLIDE_SIDE_COLLAPSED)
            .then(value => this.setSlideSideCollapsed(value as boolean));
        localForage
            .getItem(userStore.userId + '.' + TABLE_BORDER)
            .then(value => this.setTableBorderWithoutPersist(value as boolean));
        localForage
            .getItem(userStore.userId + '.' + TABLE_STRIP)
            .then(value => this.setTableStripWithoutPersist(value as boolean));
        localForage
            .getItem(userStore.userId + '.' + TABLE_SIZE)
            .then(value => this.setTableSize(value as TableSizeDic));
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
        settingStore.slideSideCollapsed = !settingStore.slideSideCollapsed;
        localForage.setItem(userStore.userId + '.' + SLIDE_SIDE_COLLAPSED, settingStore.slideSideCollapsed);
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
        localForage.setItem(userStore.userId + '.' + TABLE_BORDER, settingStore.tableBorder);
    }

    /**
     * 设置表格斑马条纹(不保存，主要是初始化的时候或一些需要直接设定值的场合使用)
     */
    @action
    setTableStripWithoutPersist(val: boolean) {
        settingStore.tableStrip = val;
    }
    /**
     * 切换表格斑马条纹
     */
    @action
    toggleTableStrip() {
        settingStore.tableStrip = !settingStore.tableStrip;
        localForage.setItem(userStore.userId + '.' + TABLE_STRIP, settingStore.tableStrip);
    }

    /**
     * 设置表格大小
     */
    @action
    setTableSize(size: TableSizeDic) {
        settingStore.tableSize = size;
        localForage.setItem(userStore.userId + '.' + TABLE_SIZE, size);
    }
}
