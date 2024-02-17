<script lang="ts" setup>
import { appCode, appName } from '~/env';
import { useMenuStore } from '~/store/MenuStore';
import { getAssetsImgHref } from '~/util/path';

// ****** 中央状态 ******
// 菜单
const { menus } = $(useMenuStore());
</script>

<template>
    <div class="adm-container">
        <div class="adm-container-left">
            <div class="adm-container-logo">
                <img :src="getAssetsImgHref('vite.svg')" :alt="appName" />
                <span>{{ appCode }}</span>
            </div>
            <div class="adm-container-menu">
                <el-scrollbar>
                    <RebueMenu :menus="menus" unique-opened />
                </el-scrollbar>
            </div>
        </div>
        <div class="adm-container-right">
            <div class="adm-container-header"></div>
            <div class="adm-container-main">
                <el-scrollbar> <router-view /></el-scrollbar>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.adm-container {
    height: 100vh;
    display: flex;
    .adm-container-left {
        width: 12rem;
        // display: flex;
        // flex-direction: column;
        .adm-container-logo {
            height: 2rem;
            padding: 1rem;
            display: flex;
            align-items: center;
            span {
                flex-grow: 1;
                padding: 1rem;
                font-size: 1.2rem;
            }
        }
        .adm-container-menu {
            .el-menu {
                border: 0; // 去掉菜单右边的竖线
            }
        }
    }
    .adm-container-right {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .adm-container-header {
            height: 4rem;
        }
        .adm-container-main {
            flex-grow: 1;
        }
    }
}
</style>
