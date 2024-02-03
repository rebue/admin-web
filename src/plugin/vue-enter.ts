/**
 * Vue的监听回车插件
 *
 * 提供 v-enter 全局指令，按回车键时回调方法
 * 常用于form监听回车触发提交
 */
import { App } from 'vue';

export default class VueEnter {
    static install(app: App) {
        console.log('安装插件 VueEnter');
        console.log('注册全局指令 v-enter');
        app.directive('enter', {
            // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
            mounted(el, binding) {
                if (!binding.value) throw new Error('v-enter的值不能为空');
                if (typeof binding.value !== 'function') throw new Error('v-enter的值必须为函数');
                el.addEventListener('keydown', (e: KeyboardEvent) => {
                    e.key === 'Enter' && binding.value();
                });
            },
        });
    }
}
