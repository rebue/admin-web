import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
import '@/plugin/vue-i18n';
import '@/plugin/element-ui';
import '@/plugin/ant-design';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
