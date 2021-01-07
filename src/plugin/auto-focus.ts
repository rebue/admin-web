/**
 * Vue的AutoFocus插件
 */

/**
 * 设置焦点
 *
 * @param el 要设置焦点的元素(如果不传，默认为document，如果传入的值是Falsy，则不处理)
 */
function focus(el: Element | Document | null = document) {
    console.log('focus el', el);
    if (!el) return;

    if (el instanceof HTMLElement)
        if (el.tagName.toUpperCase() === 'INPUT' || el.tagName.toUpperCase() === 'TEXTAREA') {
            el.focus();
            return;
        }

    const dom = el.querySelector(
        // 'input:not([disabled*="disabled"]),textarea:not([disabled*="disabled"])'
        'input:not(:disabled),textarea:not(:disabled)'
    ) as HTMLElement;
    console.log('focus dom', dom);
    dom?.focus();
}

/**
 * 设置焦点到第一个提示错误的输入框
 */
function focusError() {
    focus(document.querySelector('.has-error'));
}

export default class AutoFocus {
    static install(Vue) {
        console.log('安装插件 `AutoFocus`');
        console.log('注册实例方法 `$focus`');
        Vue.prototype.$focus = focus;
        console.log('注册实例方法 `$focusError`');
        Vue.prototype.$focusError = focusError;

        console.log('注册全局自定义指令 `v-autofocus`');
        Vue.directive('autofocus', {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: el => {
                console.log('autofocus inserted el', el);
                Vue.nextTick(() => focus(el));
            },
        });
    }
}
