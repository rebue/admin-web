/**
 * Vue的Focus插件
 *
 * 1. 提供v-autofocus指令，可以对自动输入框设置autofocus
 * 2. 在Vue实例中提供focus方法，可以将焦点设置到第一个输入框
 * 3. 在Vue实例中提供focusError方法，可以将焦点设置到第一个校验出错的输入框
 */

/**
 * 设置焦点
 *
 * @param el 要设置焦点的元素(如果不传，默认为document，如果传入的值是Falsy，则不处理)
 */
function focus(el: Element | Document | null = document) {
    if (!el) return;

    if (el instanceof HTMLElement)
        if (el.tagName.toUpperCase() === 'INPUT' || el.tagName.toUpperCase() === 'TEXTAREA') {
            el.focus();
            return;
        }

    const dom = el.querySelector('input:not(:disabled):not([type="hidden"]),textarea:not(:disabled)') as HTMLElement;
    console.log('focus dom', dom);
    dom?.focus();
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
