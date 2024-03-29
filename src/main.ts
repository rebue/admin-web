import Vue from 'vue';
import App from '@/App.vue';
// import '@/registerServiceWorker';
import router from '@/router/router';
import '@/plugin/ant-design';
import '@/plugin/vue-focus';
import '@/env';

// Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
