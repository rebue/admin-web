import { observable } from 'mobx';

export default class SettingStore {
    /** 侧边栏是否收起 */
    @observable
    slideSideCollapsed = false;

    /** 表格边框 */
    @observable
    tableBorder = false;

    /** 表格斑马纹 */
    @observable
    tableStrip = false;

    /** 表格大小 */
    @observable
    tableSize = 'default';
}
