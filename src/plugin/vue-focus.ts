/**
 * Vue的Focus插件
 *
 * 1. 提供 v-autofocus 全局指令，可以对自动输入框设置autofocus
 * 2. 给Vue实例提供 $focus 方法，可以将焦点设置到第一个输入框
 * 3. 给Vue实例提供 $focusError 方法，可以将焦点设置到第一个校验出错的输入框
 */
import { App } from 'vue';

/**
 * 设置焦点
 *
 * @param el 要设置焦点的元素(如果传入的值是null，则不处理且返回false)
 * @returns 返回是否成功设置焦点
 */
function focus(el: Element | null): boolean {
    // console.log('focus el', el);
    if (el === null) {
        console.log('传入的值是null，不能设置焦点');
        return false;
    }

    const dom = el.querySelector(
        `input:not(:disabled):not([type="hidden"]):not([type="readonly"]),` +
            `textarea:not(:disabled):not([type="hidden"]):not([type="readonly"])`,
    ) as HTMLElement;
    // console.log('focus dom', dom);
    if (!!!dom) {
        console.log('未找到能设置焦点的dom');
        return false;
    }
    dom?.focus();
    return true;
}

/**
 * 设置焦点到第一个提示错误的输入框
 */
function focusError() {
    // console.log('focusError');

    /** 要查找的类样式 */
    // has-error,is-error,ant-form-item-has-error分别是AntDesignVue,ElementUI,AntDesignVue3校验错误的class
    const containerClass = '.has-error,.is-error,.ant-form-item-has-error';
    const dom = document.querySelector(`${containerClass}`);
    return focus(dom);
}

export default class VueFocus {
    static install(app: App) {
        console.log('安装插件 VueFocus');
        console.log('注册Vue实例的方法 $focus');
        app.config.globalProperties.$focus = focus;
        console.log('注册Vue实例的方法 $focusError');
        app.config.globalProperties.$focusError = focusError;

        console.log('注册全局指令 v-autofocus');
        app.directive('autofocus', {
            // 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
            mounted(el) {
                nextTick(() => focus(el));
            },
        });
    }
}
