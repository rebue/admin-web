/**
 * Vue遍历Vue对象方法的插件
 * 1. 提供 foreach 方法，可以遍历Vue对象
 * 2. 给Vue实例提供 $foreach 方法，可以遍历Vue节点
 */
import { App } from "vue";

export function foreach(obj: VNode, callback: (node: VNode) => boolean): boolean {
    if (callback(obj) === false) return false;
    const children = obj.children as VNode[];
    if (children && children.length > 0) {
        for (const child of children) {
            if (foreach(child, callback) === false) return false;
        }
    }
    return true;
}

export default class VueForeach {
    static install(app: App) {
        console.log('安装插件 VueForeach');
        console.log('注册Vue实例的方法 $foreach');
        app.config.globalProperties.$foreach = foreach;
    }
}
