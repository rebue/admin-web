<script setup lang="ts">
interface Menu {
    /** 菜单ID */
    id: string | number;
    /** 菜单名称 */
    name: string;
    /** 子菜单列表 */
    children: Menu[];
}

// 定义组件属性
defineProps<{
    /** 菜单列表 */
    menus: Menu[];
}>();

// 定义本视图实例的选项
defineOptions({
    inheritAttrs: false, // 避免本组件的根元素被污染上父组件的属性
});

const route = useRoute();

const onSelect = (index: string, indexPath: string[], a) => {
    console.log('onSelect:', index, indexPath, a);
    console.log('abc:', route.matched);
};
</script>
<template>
    {{ $route.matched.entries() }}
    <el-menu v-bind="$attrs" @select="onSelect">
        <RebueSubMenu :menus="menus" />
    </el-menu>
</template>
