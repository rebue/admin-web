<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ComponentInternalInstance } from 'vue';
import { useAdmStore } from '~/store/AdmStore';
// import { useRouter, useRoute } from 'vue-router';

// 获取当前Vue实例的上下文
const currentInstance = getCurrentInstance() as ComponentInternalInstance;
const { proxy } = currentInstance;
const self = proxy as ComponentPublicInstance;

const router = useRouter();

// 切换暗黑模式按钮的引用
const btnToggleDarkModeRef = $ref(null) as any;

// ****** 中央状态 ******
// 后台管理系统的中央状态
let { isFoldLeft } = $(useAdmStore());

// ****** 局部状态 ******
// 暗黑模式
const isDark = $(
    useDark({
        onChanged(dark: boolean) {
            if (self.$t) {
                const msg = dark ? self.$t('adm.切换为暗黑模式') : self.$t('adm.切换为亮色模式');
                ElMessage(msg);
            }
        },
    }),
);

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

const toggleMenuFold = () => {
    isFoldLeft = !isFoldLeft;
};
</script>
<template>
    <div class="header">
        <div class="left">
            <el-tooltip :content="isFoldLeft ? $t('adm.展开左侧菜单栏') : $t('adm.收起左侧菜单栏')">
                <el-button size="small" circle style="font-size: 14px" @click="toggleMenuFold()">
                    <template #icon>
                        <icon-ep-fold v-show="!isFoldLeft" />
                        <icon-ep-expand v-show="isFoldLeft" />
                    </template>
                </el-button>
            </el-tooltip>
        </div>
        <div class="center">
            <icon-ep-arrow-right />
            <EpArrowRight />

            <el-breadcrumb :separator-icon="EpArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">{{ $t('adm.首页') }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">{{ $t('adm.首页') }}</el-breadcrumb-item>
                <el-breadcrumb-item v-for="path in $route.matched.values" :to="{ path: path }">{{
                    path
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-tooltip :content="isDark ? $t('adm.切换为亮色模式') : $t('adm.切换为暗黑模式')">
                <el-button
                    ref="btnToggleDarkModeRef"
                    size="small"
                    circle
                    style="font-size: 14px"
                    @click="toggleDarkMode()"
                >
                    <template #icon>
                        <icon-ep-moon v-show="isDark" />
                        <icon-ep-sunny v-show="!isDark" />
                    </template>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header {
    height: 2rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    .center {
        flex-grow: 1;
    }
}
</style>
isFoldLeft: fold
