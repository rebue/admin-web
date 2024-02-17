<script setup lang="ts">
import { useCssVar } from '@vueuse/core';
import { ComponentInternalInstance } from 'vue';
import { useLocaleStore } from '~/store/LocaleStore';
import { useThemeStore } from '~/store/ThemeStore';

// 获取当前Vue实例的上下文
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const { proxy } = currentInstance;
const self = proxy as ComponentPublicInstance;

// 按钮的配置
const buttonConfig = {
    autoInsertSpace: true, // 中文自动插入空格
};
// 消息的配置
const messageConfig = {
    max: 3, // 可同时显示的消息最大数量
};

// ****** 中央状态 ******
// 语言区域
const localeStore = useLocaleStore();
const { elementPlustLocale } = $(localeStore);
// 监听语言区域状态变化
localeStore.$subscribe((_mutation, state) => {
    self.$i18n.locale = state.name || 'zhCn';
    ElMessage(self.$t('app.切换为中文'));
});

// 主题色彩
const themeStore = useThemeStore();
// 监听主题色彩状态变化
themeStore.$subscribe((_mutation, state) => {
    const primaryColor = useCssVar('--el-color-primary', ref(null));
    if (!!!state.primaryColor) state.primaryColor = '#409eff';
    primaryColor.value = state.primaryColor;
});
</script>

<template>
    <el-config-provider :locale="elementPlustLocale" :button="buttonConfig" :message="messageConfig">
        <!-- <HelloWorld msg="Vite + Vue" /> -->
        <AdmHome />
    </el-config-provider>
</template>
