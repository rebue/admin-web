<template>
    <a-config-provider :getPopupContainer="getPopupContainer" :locale="locale">
        <div id="app">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
import VueFocus from '@/plugin/vue-focus';
import FullScreen from 'vue-fullscreen';
import Fragment from 'vue-fragment';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
// SVG组件
import SvgIcon from '@/component/rebue/SvgIcon.vue';
// 引入SVG文件资源
import '@/asset/svg/index';

moment.locale('en');

// 注册焦点插件
Vue.use(VueFocus);
// 注册全屏插件
Vue.use(FullScreen);
// 片段插件
Vue.use(Fragment.Plugin);
// 拖曳插件
Vue.component('vue-draggable-resizable', VueDraggableResizable);
// 全局注册SVG组件
Vue.use(SvgIcon);
export default {
    name: 'App',
    data() {
        //const { LocaleProvider, locales } = window.antd;
        return {
            locale: zhCN,
            enUS,
        };
    },

    methods: {
        getPopupContainer(el, dialogContext) {
            console.log('dialogContext', dialogContext);
            if (dialogContext) {
                return dialogContext.getDialogWrap();
            } else {
                return document.body;
            }
        },
    },
};
</script>

<style lang="less">
* {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100%;
}

#app {
    height: 100%;
}

/** vue-draggable-resizable */
.resize-table-th {
    position: relative;
}

.table-draggable-handle {
    height: 100% !important;
    bottom: 0;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
    transform: none !important;
    position: absolute;
    border: 1px;
}

.table-draggable-handle-left:extend(.table-draggable-handle) {
    left: -5px !important;
}

.table-draggable-handle-right:extend(.table-draggable-handle) {
    left: auto !important;
}
</style>
