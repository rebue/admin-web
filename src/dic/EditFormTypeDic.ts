/**
 * 编辑窗体的类型
 */
export enum EditFormTypeDic {
    /** 未定义 */
    None = 'none',
    /** 添加 */
    Add = 'add',
    /** 修改 */
    Modify = 'modify',
    /** 查看 */
    View = 'view',
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EditFormTypeDic {
    // eslint-disable-next-line no-inner-declarations
    export function getName(val: EditFormTypeDic): string {
        switch (val) {
            case EditFormTypeDic.Add:
                return '添加';
            case EditFormTypeDic.Modify:
                return '修改';
            case EditFormTypeDic.View:
                return '查看';
            default:
                return '未定义';
        }
    }
}
