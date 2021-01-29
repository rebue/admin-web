<template>
    <a-spin :spinning="true" class="spin">
        <rebue-tree :dataSource="dataSource" v-bind="$attrs" v-on="$listeners"></rebue-tree>
    </a-spin>
</template>
<script lang="ts">
import Vue from 'vue';

import RebueTree from '@/component/rebue/Tree';
export default Vue.extend({
    name: 'Menu',
    components: {
        RebueTree,
    },
    data() {
        return {
            loading: false,
            dataSource: [{ key: 1, title: '测试' }],
        };
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
        },
    },
});
</script>
<style lang="less" scoped>
.spin {
    height: 100%;
}
</style>
