import { createI18n } from 'vue-i18n';
// 语言包
import en from './en';
import zhCn from './zh-cn';

const i18n = createI18n({
    locale: 'zhCn',
    messages: {
        zhCn,
        en,
    },
});

export default i18n;
