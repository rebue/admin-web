import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import i18n from './assets/i18n';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
// pinia持久化插件(https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(i18n).mount('#app');
