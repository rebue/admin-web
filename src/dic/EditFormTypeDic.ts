/**
 * 编辑窗体的类型
 */
export enum EditFormTypeDic {
    /** 未定义 */
    None = 'none',
    /** 添加 */
    Add = 'add',
    /** 编辑 */
    Update = 'update',
}

export function getEditFormTypeName(val: EditFormTypeDic): string {
    console.log('val', val);

    switch (val) {
        case EditFormTypeDic.Add:
            return '添加';
        case EditFormTypeDic.Update:
            return '修改';
        default:
            return '未定义';
    }
}
