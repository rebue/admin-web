<script lang="ts" setup>
import { appCode, appName } from '~/env';
import { useMenuStore } from '~/store/MenuStore';
import { getAssetsImgHref } from '~/util/path';
import { useAdmStore } from '~/store/AdmStore';

// ****** 中央状态 ******
// 菜单
const { menus } = $(useMenuStore());
// 后台管理系统的中央状态
let { isFoldLeft } = $(useAdmStore());
</script>

<template>
    <div class="adm-container">
        <div class="adm-container-left" :style="{ minWidth: isFoldLeft ? '' : '14rem' }">
            <div class="adm-container-logo">
                <img :src="getAssetsImgHref('vite.svg')" :alt="appName" />
                <span v-if="!isFoldLeft">{{ appCode }}</span>
            </div>
            <div class="adm-container-menu">
                <el-scrollbar>
                    <RebueMenu :menus="menus" unique-opened :collapse="isFoldLeft" />
                </el-scrollbar>
            </div>
        </div>
        <div class="adm-container-right">
            <AdmHeader />
            <div class="adm-container-main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.adm-container {
    height: 100vh;
    display: flex;
    .adm-container-left {
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
                // width: 14rem;
            }
        }
    }
    .adm-container-right {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .adm-container-main {
            flex-grow: 1;
            height: 100%;
        }
    }
}
</style>
