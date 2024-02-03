/**
 * Vue限制输入框只能输入数字的插件
 *
 * 1. 提供 v-number 全局指令，可以对输入框限制只为数字输入
 * 2. 提供 v-decimal 全局指令，可以对输入框限制只为数字和点输入
 */
import { App, RendererNode } from 'vue';

// 有效的key
const numberKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Enter',
    'Tab',
    'Backspace',
    'Insert',
    'Delete',
    'CapsLock',
    'Escape',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
];

const decimalKeys = ['.', ...numberKeys];

/** 阻止按键生效 */
function prevent(e: KeyboardEvent) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

enum CreateType {
    Number,
    Decimal,
}

function create(el: HTMLInputElement, createType: CreateType) {
    const inputDom = (el.querySelector('input') ? el.querySelector('input') : el) as HTMLInputElement;

    (inputDom as RendererNode).oldValue = '';
    inputDom.addEventListener('keydown', (e) => {
        var key = e.key;
        console.log('keydown key', key);
        if (createType === CreateType.Decimal)
            !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && decimalKeys.indexOf(key) === -1 && prevent(e);
        else !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && numberKeys.indexOf(key) === -1 && prevent(e);
    });
    inputDom.addEventListener('input', () => {
        // console.log('oninput', e);
        if (
            inputDom.value &&
            ((createType === CreateType.Decimal && !/^(?:[1-9]\d*|0)(?:\.\d*)?$/.test(inputDom.value)) ||
                (createType === CreateType.Number && !/^\d+$/.test(inputDom.value)))
        ) {
            // 必须延迟执行，否则设置value无法起效
            setTimeout(() => {
                inputDom.value = (inputDom as RendererNode).oldValue;
            }, 0);
            return;
        }
        (inputDom as RendererNode).oldValue = inputDom.value;
    });
}

export default class VueNumber {
    static install(app: App) {
        console.log('安装插件 VueNumber');
        console.log('注册全局指令 v-number');
        app.directive('number', {
            // 在绑定元素的 attribute 前或事件监听器应用前调用
            created: (el: HTMLInputElement) => {
                create(el, CreateType.Number);
            },
        });
        console.log('注册全局指令 v-decimal');
        app.directive('decimal', {
            // 在绑定元素的 attribute 前或事件监听器应用前调用
            created: (el) => {
                create(el, CreateType.Decimal);
            },
        });
    }
}
