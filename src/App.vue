<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 获取当前Vue实例的上下文
const { ctx } = getCurrentInstance() as any;

const btnToggleDarkModeRef = $ref(null) as any;

// ****** 局部状态 ******
// 状态如果不会改变，用 const 声明
// 语言区域
let locale = $ref(zhCn);
// 暗黑模式
const isDark = $(
    useDark({
        onChanged(dark: boolean) {
            if (ctx.$t) {
                const msg = dark ? ctx.$t('app.切换为暗黑模式') : ctx.$t('app.切换为亮色模式');
                ElMessage(msg);
            }
        },
    }),
);
// 按钮的配置
const buttonConfig = {
    autoInsertSpace: true, // 中文自动插入空格
};
// 消息的配置
const messageConfig = {
    max: 3, // 可同时显示的消息最大数量
};

/** 切换语言区域 */
const toggleLocale = () => {
    locale = locale.name === zhCn.name ? en : zhCn;
    ctx.$i18n.locale = ctx.$i18n.locale === 'zhCn' ? 'en' : 'zhCn';
    ElMessage(ctx.$t('app.切换为中文'));
};
/** 切换暗黑模式 */
const toggleDark = useToggle(useDark());
const toggleDarkMode = () => {
    // @ts-ignore Fallback for browsers that don't support this API:
    if (!document.startViewTransition) {
        toggleDark();
        return;
    }

    // @ts-ignore With a transition:
    const transition = document.startViewTransition(() => toggleDark());
    transition.ready.then(() => {
        const btnToggleDarkMode = btnToggleDarkModeRef.ref as HTMLElement;
        const domRect = btnToggleDarkMode.getBoundingClientRect();
        // 开始半径
        const beginRadius = domRect.width / 2;
        // 圆坐标
        const circleX = domRect.x + beginRadius;
        const circleY = domRect.y + beginRadius;
        // 结束半径
        const endRadius = Math.hypot(Math.max(circleX, innerWidth - circleX), Math.max(circleY, innerHeight - circleY));
        // 剪辑路径
        const clipPath = [
            `circle(${beginRadius}px at ${circleX}px ${circleY}px)`,
            `circle(${endRadius}px at ${circleX}px ${circleY}px)`,
        ];
        //开始动画
        document.documentElement.animate(
            {
                clipPath: !isDark ? clipPath.reverse() : clipPath,
            },
            {
                duration: 800,
                easing: 'ease-in',
                pseudoElement: !isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
            },
        );
    });
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
        <el-button @click="toggleLocale">{{ $t('app.切换语言') }}</el-button>
        <el-tooltip :content="isDark ? $t('app.切换为亮色模式') : $t('app.切换为暗黑模式')" placement="top">
            <el-button ref="btnToggleDarkModeRef" size="small" circle @click="toggleDarkMode()">
                <template #icon>
                    <icon-ep-moon v-show="isDark" />
                    <icon-ep-sunny v-show="!isDark" />
                </template>
            </el-button>
        </el-tooltip>
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
