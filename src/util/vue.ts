/** 遍历Vue对象 */
export function forEachVue(obj: Vue, callback: (node: Vue) => boolean): boolean {
    if (callback(obj) === false) return false;
    const children: Vue[] = obj.$children;
    if (children && children.length > 0) {
        for (const child of children) {
            if (forEachVue(child, callback) === false) return false;
        }
    }
    return true;
}
