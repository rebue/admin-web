import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router/router';
import '@/plugin/vue-i18n';
import '@/plugin/element-ui';
import '@/plugin/ant-design';
import '@/plugin/vue-focus';
import '@/env';
import VueFocus from '@/plugin/vue-focus';
import FullScreen from 'vue-fullscreen';
import Fragment from 'vue-fragment';
import VueDraggableResizable from 'vue-draggable-resizable';

Vue.config.productionTip = false;
// 注册焦点插件
Vue.use(VueFocus);
// 注册全屏插件
Vue.use(FullScreen);
// 片段插件
Vue.use(Fragment.Plugin);
// 拖曳插件
Vue.component('vue-draggable-resizable', VueDraggableResizable);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
