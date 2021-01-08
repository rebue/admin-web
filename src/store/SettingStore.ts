import { observable } from 'mobx';

export default class SettingStore {
    /** 表格大小 */
    @observable
    tableSize = 'default';
}
