/**
 * Vue的Focus插件
 *
 * 1. 提供v-autofocus指令，可以对自动输入框设置autofocus
 * 2. 在Vue实例中提供focus方法，可以将焦点设置到第一个输入框
 * 3. 在Vue实例中提供focusError方法，可以将焦点设置到第一个校验出错的输入框
 */

import Vue from 'vue';

/** 遍历Vue对象 */
function forEachVue(obj: Vue, callback: (node: Vue) => boolean): boolean {
    if (callback(obj) === false) return false;
    const children: Vue[] = obj.$children;
    if (children && children.length > 0) {
        for (const child of children) {
            if (forEachVue(child, callback) === false) return false;
        }
    }
    return true;
}

/**
 * 设置焦点
 *
 * @param el 要设置焦点的元素(如果不传，默认为document，如果传入的值是Falsy，则不处理)
 * @param containerClass 容器的类样式
 */
function focus(el: Element | Document | Vue | null = document, containerClass = ''): boolean {
    console.log('focus el', el);
    if (!el) return false;

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
        if (
            (el.tagName.toUpperCase() === 'INPUT' || el.tagName.toUpperCase() === 'TEXTAREA') &&
            el.hidden !== true &&
            el.type !== 'hidden' &&
            el.disabled !== true &&
            el.readOnly !== true
        ) {
            el.focus();
            return true;
        } else {
            return false;
        }

    if (el instanceof Vue) {
        if (
            forEachVue(el as Vue, node => {
                const nodeEl = node.$el;
                if (
                    (nodeEl instanceof HTMLInputElement || nodeEl instanceof HTMLTextAreaElement) &&
                    focus(nodeEl) === true
                )
                    return false;
                return true;
            }) === false
        )
            return true;
    }

    if (containerClass !== '') containerClass += ' ';
    const dom = (el as Element).querySelector(
        `${containerClass}input:not(:disabled):not([type="hidden"]),${containerClass}textarea:not(:disabled)`
    ) as HTMLElement;
    console.log('focus dom', dom);
    dom?.focus();
    return true;
}

/**
 * 设置焦点到第一个提示错误的输入框
 */
function focusError() {
    // has-error,is-error分别是AntDesignVue,ElementUI校验错误的class
    focus(document.querySelector('.has-error,.is-error'));
}

export default class VueFocus {
    static install(Vue) {
        // console.log('安装插件 `VueFocus`');
        // console.log('注册实例方法 `$focus`');
        Vue.prototype.$focus = focus;
        // console.log('注册实例方法 `$focusError`');
        Vue.prototype.$focusError = focusError;

        // console.log('注册全局指令 `v-autofocus`');
        Vue.directive('autofocus', {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: el => {
                // console.log('autofocus inserted el', el);
                Vue.nextTick(() => focus(el));
            },
        });
    }
}
