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
defineProps<{ menus: Menu[] }>();

</script>
<template>
    <template v-for="menu in menus">
        <!-- 有子菜单 -->
        <el-sub-menu :index="`${menu.id}`" :menu="menu" v-if="menu.children" v-bind="$attrs">
            <template #title>
                <span>{{ menu.name }}</span>
            </template>
            <!-- 继续遍历子菜单（递归）-->
            <RebueSubMenu :menus="menu.children"></RebueSubMenu>
        </el-sub-menu>
        <!-- 无子菜单 -->
        <el-menu-item :index="`${menu.id}`" :menu="menu" v-if="!menu.children" v-bind="$attrs">
            <template #title>
                <span>{{ menu.name }}</span>
            </template>
        </el-menu-item>
    </template>
</template>
