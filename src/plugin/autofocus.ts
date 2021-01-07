import Vue from 'vue';

console.log('注册一个全局自定义指令 `v-autofocus`');
function focus(el: HTMLElement) {
    console.log('focus el', el);
    if (el.tagName.toUpperCase() === 'INPUT' || el.tagName.toUpperCase() === 'TEXTAREA') {
        el.focus();
    } else {
        const dom = el.querySelector('input,textarea') as HTMLElement;
        dom?.focus();
    }
}

Vue.directive('autofocus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: el => {
        console.log('autofocus inserted el', el);
        Vue.nextTick(() => focus(el));
    },
    // update(el, value) {
    //     console.log('autofocus update el value', el, value);
    //     focus(el);
    // },
});
