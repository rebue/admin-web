<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 获取当前Vue实例的上下文
const { ctx } = getCurrentInstance() as any;

// ****** 局部状态 ******
// 状态如果不会改变，用 const 声明
// 暗黑模式
// const isDark = useDark();
const isDark = useDark({
    onChanged(dark: boolean) {
        ElMessage('切换暗黑模式');
    },
});
// 语言区域
let locale = $ref(zhCn);
// 按钮的配置
const buttonConfig = {
    autoInsertSpace: true, // 中文自动插入空格
};
// 消息的配置
const messageConfig = {
    max: 3, // 可同时显示的消息最大数量
};

// 切换暗黑模式
const toggleDark = useToggle(useDark());

/** 切换语言区域 */
const toggleLocale = () => {
    locale = locale.name === zhCn.name ? en : zhCn;
    ctx.$i18n.locale = ctx.$i18n.locale === 'zhCn' ? 'en' : 'zhCn';
    ElMessage(ctx.$t('app.切换为中文'));
};
</script>

<template>
    <el-config-provider :locale="locale" :button="buttonConfig" :message="messageConfig">
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
                <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
        </div>
        <el-button mb-2 @click="toggleLocale">{{ $t('app.切换语言') }}</el-button>
        <el-switch inline-prompt v-model="isDark" active-text="暗黑" inactive-text="明亮" @change="toggleDark()" />
        <HelloWorld msg="Vite + Vue" />
        <el-table mb-1 :data="[]" />
    </el-config-provider>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
