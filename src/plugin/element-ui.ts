import Vue from 'vue';
import { Container, Header, Main, Footer, Button } from 'element-ui';

// 在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.prototype.$ELEMENT = { size: 'large', zIndex: 3000 };

// 按需引入组件 https://element.eleme.cn/#/zh-CN/component/quickstart
// 布局
Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);

Vue.use(Button);
