/** 从树型中查找节点 */
export function findFromTree<T>(tree: T[], compare: (node: T) => boolean): T | undefined {
    for (const node of tree) {
        const compared = compare(node);
        if (compared) return node;
        const children: T[] = node['children'];
        if (children) {
            const result = findFromTree(children, compare);
            if (result) return result;
        }
    }
    return undefined;
}

/** 遍历树节点 */
export function forEachTree<T>(tree: T[], callback: (node: T) => void): void {
    for (const node of tree) {
        callback(node);
        const children: T[] = node['children'];
        if (children) forEachTree(children, callback);
    }
}
