/**
 * 从tree对象数组中查找节点
 * @param tree tree对象数组
 * @param compare 比较的回调方法
 * @returns 查找到的节点
 */
export function findFromTree<T>(tree: T[], compare: (node: T) => boolean): T | undefined {
    for (const node of tree) {
        const compared = compare(node);
        if (compared) return node;
        const children = node['children' as keyof typeof node] as T[];
        if (children) {
            const result = findFromTree(children, compare);
            if (result) return result;
        }
    }
    return undefined;
}

/**
 * 遍历tree对象数组
 * @param tree tree对象数组
 * @param callback 遍历每一项要处理的回调方法
 * @returns 是否完成遍历(如果回调方法返回false则中断遍历)
 */
export function forEachTree<T>(tree: T[], callback: (node: T) => boolean): boolean {
    for (const node of tree) {
        if (callback(node) === false) return false;
        const children = node['children' as keyof typeof node] as T[];
        if (children) {
            if (forEachTree(children, callback) === false) return false;
        }
    }
    return true;
}

interface ListToTreeOptions {
    treeCodeFieldName: string;
    treeCodeLevelWidth: number;
}

/**
 * 将list数组转成tree对象数组
 * @param list 带有treeCode的对象数据
 * @param treeCodeFieldName 树编码的字段名称
 * @returns tree对象数组
 */
export function listToTree(
    list: any[],
    options: ListToTreeOptions = { treeCodeFieldName: 'treeCode', treeCodeLevelWidth: 3 },
): any[] {
    const treeCodeFieldName = options.treeCodeFieldName;
    const treeCodeLevelWidth = options.treeCodeLevelWidth;
    const result: any[] = [];
    list.forEach((item) => {
        const treeCode: string = item[treeCodeFieldName];
        if (treeCode.length === treeCodeLevelWidth) {
            return result.push(item);
        } else {
            const parentTreeCode = treeCode.substring(0, treeCode.length - treeCodeLevelWidth);
            const parentNode = findFromTree(result, (node) => node[treeCodeFieldName] === parentTreeCode);
            if (parentNode) {
                if (!parentNode['children']) parentNode['children'] = [];
                parentNode['children'].push(item);
            }
        }
    });
    return result;
}
