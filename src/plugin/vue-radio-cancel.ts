/**
 * Vue点击radio可取消选择的插件
 *
 * 提供 v-radio-cancel 全局指令，作用在RadioGroup组件上，点击radio可取消选择
 */
import { App, ComponentInternalInstance, RendererNode } from 'vue';

function create(el: Element, vnode: VNode) {
    const ctx = (vnode as RendererNode).ctx as ComponentInternalInstance;
    el.addEventListener('click', (e: Event) => {
        const target = e?.target as HTMLInputElement;
        if (target.nodeName === 'INPUT') {
            // console.log('click e', e, 'vnode', vnode);
            const targetValue = target.value;
            const vnodeValue = ctx.props.value;
            // console.log('targetValue', targetValue, 'vnodeValue', vnodeValue);
            if (targetValue == vnodeValue) {
                // console.log('equals', ctx.props);
                ctx.emit('update:value', undefined);
            }
        }
    });
}

export default class VueRadioCancel {
    static install(app: App) {
        console.log('安装插件 VueRadioCancel');
        console.log('注册全局指令 v-radio-cancel');
        app.directive('radio-cancel', {
            // 在绑定元素的 attribute 前或事件监听器应用前调用
            created: (el: HTMLElement, _binding, vnode) => {
                create(el, vnode);
            },
        });
    }
}
