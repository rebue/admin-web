import 'element-plus/theme-chalk/dark/css-vars.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ModuleNamespace } from 'vite/types/hot.js';
import App from './App.vue';
import i18n from './assets/i18n';
import './style.css';

const app = createApp(App);
const pinia = createPinia();
// pinia持久化插件(https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)
pinia.use(piniaPluginPersistedstate);

// 导入自定义插件
const modules = import.meta.glob('@/plugin/*.ts', { eager: true });
Object.values(modules).forEach((module) => {
    app.use((module as ModuleNamespace).default);
});

app.use(pinia).use(i18n).mount('#app');
