import { observable } from 'mobx';

export default class SettingStore {
    /** 表格边框 */
    @observable
    tableBorder = false;

    /** 表格大小 */
    @observable
    tableSize = 'default';
}
