<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ComponentInternalInstance } from 'vue';
import { useLocaleStore } from '~/store/LocaleStore';
import { useThemeStore } from '~/store/ThemeStore';
import { getAssetsImgHref } from '~/util/path';
import { helloApi } from '~/api/hlw/HelloApi';
import { Ro } from '~/ro/Ro';

defineProps<{ msg: string }>();

// 获取当前Vue实例的上下文
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const { proxy } = currentInstance;
const self = proxy as ComponentPublicInstance;

// 切换暗黑模式按钮的引用
const btnToggleDarkModeRef = $ref(null) as any;

// ****** 中央状态 ******
// 语言区域
const { name: localeName } = $(useLocaleStore());
// 主题
const { primaryColor } = $(useThemeStore());

// ****** 局部状态 ******
// 暗黑模式
const isDark = $(
    useDark({
        onChanged(dark: boolean) {
            if (self.$t) {
                const msg = dark ? self.$t('app.切换为暗黑模式') : self.$t('app.切换为亮色模式');
                ElMessage(msg);
            }
        },
    }),
);
// hello名称
let name = $ref('');
// 计数器
const count = $ref(0);

// ****** 方法和事件 ******
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
/** hello方法 */
function hello() {
    helloApi
        .hello(localeName)
        // 处理返回的结果
        .then((ro: Ro) => {
            if (ro.result > 0) {
                name = ro.data.name;
            }
        });
}
</script>

<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img :src="getAssetsImgHref('vite.svg')" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img :src="getAssetsImgHref('vue.svg')" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <h1>{{ msg }}</h1>
    <h1>{{ $t('hello.你好名字', { name }) }}</h1>
    <el-button @click="hello">{{ $t('hello.你好') }}</el-button>
    {{ $t('app.切换语言') }}
    <el-radio-group v-radio-cancel v-model="localeName" size="large">
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
    {{ $t('app.切换主题色彩') }}
    <el-radio-group v-radio-cancel v-model="primaryColor" size="large">
        <el-radio-button label="#409eff">拂晓蓝(默认)</el-radio-button>
        <el-radio-button label="#e74c3c">薄暮红</el-radio-button>
        <el-radio-button label="#e67e22">火山橘</el-radio-button>
        <el-radio-button label="#f1c40f">日暮黄</el-radio-button>
        <el-radio-button label="#16a085">极光绿</el-radio-button>
        <el-radio-button label="#9b59b6">酱紫</el-radio-button>
    </el-radio-group>
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
