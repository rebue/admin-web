import 'element-plus/theme-chalk/dark/css-vars.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { ModuleNamespace } from 'vite/types/hot.js';
import App from '~/App.vue';
import i18n from '~/assets/i18n';
import '~/style.scss';

// 建立app
const app = createApp(App);

// pinia
const pinia = createPinia();
// pinia持久化插件(https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// 语言区域
app.use(i18n);

// 导入自定义插件
const modules = import.meta.glob('~/plugin/*.ts', { eager: true });
Object.values(modules).forEach((module) => {
    app.use((module as ModuleNamespace).default);
});

app.mount('#app');
