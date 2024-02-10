<script setup lang="ts">
import { useLocaleStore } from '~/store/LocaleStore';

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
const { elementPlustLocale } = $(useLocaleStore());
</script>

<template>
    <el-config-provider :locale="elementPlustLocale" :button="buttonConfig" :message="messageConfig">
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
                <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
        </div>
        <HelloWorld msg="Vite + Vue" />
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
