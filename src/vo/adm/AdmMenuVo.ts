export interface AdmMenuVo {
    /** 菜单ID */
    id: number;
    /** 菜单名称 */
    name: string;
    /** 菜单树编码 */
    treeCode: string;
    /** 所属应用编码 */
    appCode: string;
    /** 菜单路由路径 */
    path: string;
    /** 菜单路由组件 */
    component: string;
    /** 子菜单 */
    children: AdmMenuVo[];
}
