/** 设置焦点 */
export function focus(el: Element | Document | null) {
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

/** 定位到第一个输入框 */
export function locateFirstInput() {
    focus(document);
}

/** 定位到第一个提示错误的输入框 */
export function locateFirstErrorInput() {
    focus(document.querySelector('.has-error'));
}
