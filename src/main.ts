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

Vue.config.productionTip = false;
// 注册焦点插件
Vue.use(VueFocus);
// 注册全屏插件
Vue.use(FullScreen);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
