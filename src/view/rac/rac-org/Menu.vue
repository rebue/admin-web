<template>
    <div :style="{ width: currentWidth + 'px' }">
        <div class="menu-toolbar">
            <a-button :icon="orgFold ? 'menu-unfold' : 'menu-fold'" @click="handleOrgFoldChanged" />
        </div>
        <a-spin :spinning="true" class="spin">
            <rebue-tree :fold="orgFold" :dataSource="dataSource" v-bind="$attrs" v-on="$listeners"></rebue-tree>
        </a-spin>
    </div>
</template>
<script>
import Vue from 'vue';

import RebueTree from '@/component/rebue/Tree';
export default Vue.extend({
    name: 'Menu',
    components: {
        RebueTree,
    },
    props: {
        width: {
            type: Number,
            default: 200,
        },
        foldWidth: {
            type: Number,
            default: 60,
        },
    },
    data() {
        return {
            loading: false,
            orgFold: false,
            dataSource: [{ key: 1, title: '测试' }],
        };
    },
    computed: {
        currentWidth() {
            return this.orgFold ? this.foldWidth : this.width;
        },
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
        },
        /** 处理组织收缩改变 */
        handleOrgFoldChanged() {
            this.orgFold = !this.orgFold;
        },
    },
});
</script>
<style lang="less" scoped>
.menu-toolbar {
    margin-bottom: 16px;
}
.spin {
    height: 100%;
}
</style>
