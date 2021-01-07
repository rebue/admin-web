import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router/router';
import '@/plugin/vue-i18n';
import '@/plugin/element-ui';
import '@/plugin/ant-design';
import '@/plugin/auto-focus';
import '@/env';
import AutoFocus from '@/plugin/auto-focus';

Vue.config.productionTip = false;
// 注册自动设置焦点插件
Vue.use(AutoFocus);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
