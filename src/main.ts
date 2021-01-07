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

Vue.config.productionTip = false;
// 注册设置焦点插件
Vue.use(VueFocus);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
