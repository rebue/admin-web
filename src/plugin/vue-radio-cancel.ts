/**
 * Vue点击radio可取消选择的插件(目前只支持ElementPlus的RadioGroup组件)
 *
 * 提供 v-radio-cancel 全局指令，作用在RadioGroup组件上，点击radio可取消选择
 */
import { App, ComponentInternalInstance, RendererNode } from 'vue';

function create(el: Element, vnode: VNode) {
    const ctx = (vnode as RendererNode).ctx as ComponentInternalInstance;
    const radios = el.querySelectorAll('.el-radio,.el-radio-button');
    radios.forEach((radio) => {
        radio.addEventListener('click', (event: Event) => {
            const target = (event.target as HTMLInputElement).parentElement as HTMLElement;
            if (target.classList.contains('is-checked') || target.classList.contains('is-active')) {
                // 停止事件传播
                event.stopPropagation();
                // 阻止触发该元素默认事件
                event.preventDefault();
                // 将v-model绑定的状态设置为undefined
                ctx.emit('update:modelValue', undefined);
            }
        });
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
