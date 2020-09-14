import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import ElementLocale from 'element-ui/lib/locale';

Vue.use(VueI18n);

const messages = {
    en: {
        ...enLocale,
    },
    'zh-cn': {
        ...zhLocale,
    },
};
// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'zh-cn', // set locale
    messages, // set locale messages
});

ElementLocale.i18n((key: string, value: any[] | { [key: string]: any } | undefined) => i18n.t(key, value));
