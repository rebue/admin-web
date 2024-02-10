<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { useLocaleStore } from '~/store/LocaleStore';

defineProps<{ msg: string }>();

// 获取当前Vue实例的上下文
const currentInstance = getCurrentInstance() as any;
const { proxy } = currentInstance;

// 切换暗黑模式按钮的引用
const btnToggleDarkModeRef = $ref(null) as any;

// ****** 中央状态 ******
// 语言区域
let { name: localeName } = $(useLocaleStore());

// ****** 局部状态 ******
// 计数器
const count = ref(0);
// 暗黑模式
const isDark = $(
    useDark({
        onChanged(dark: boolean) {
            if (proxy.$t) {
                const msg = dark ? proxy.$t('app.切换为暗黑模式') : proxy.$t('app.切换为亮色模式');
                ElMessage(msg);
            }
        },
    }),
);

// ****** 方法和事件 ******
/** 改变语言区域 */
const changeLocale = (value: string | number | boolean) => {
    localeName = value as string;
    proxy.$i18n.locale = value;
    ElMessage(proxy.$t('app.切换为中文'));
};

/** 切换暗黑模式的方法 */
const toggleDark = useToggle(useDark());
/** 切换暗黑模式的事件 */
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
    <h1>{{ msg }}</h1>
    {{ $t('app.切换语言') }}
    <el-radio-group v-radio-cancel v-model="localeName" size="large" @change="changeLocale">
        <el-radio-button label="zhCn">中文</el-radio-button>
        <el-radio-button label="en">English</el-radio-button>
    </el-radio-group>
    <el-tooltip :content="isDark ? $t('app.切换为亮色模式') : $t('app.切换为暗黑模式')" placement="top">
        <el-button ref="btnToggleDarkModeRef" size="small" circle style="font-size: 14px" @click="toggleDarkMode()">
            <template #icon>
                <icon-ep-moon v-show="isDark" />
                <icon-ep-sunny v-show="!isDark" />
            </template>
        </el-button>
    </el-tooltip>
    <icon-svg-spinners:wind-toy />
    <div class="card">
        <el-button @click="count++"> {{ $t('hello.当前计数', { count }) }}</el-button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
        starter
    </p>
    <p>
        Install
        <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <el-table mb-1 :data="[]" />
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
