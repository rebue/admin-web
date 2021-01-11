<template>
    <a-card class="manager-card" :bordered="false" :class="{ 'element-fullscreen': fullScreen }">
        <slot name="crudTable"> </slot>
    </a-card>
</template>

<script>
import { observer } from 'mobx-vue';
import { settingStore } from '@/store/Store';
import { settingAction } from '@/action/Action';
import { racDomainApi } from '@/api/Api';
import RacDomainMo from '@/mo/rac/RacDomainMo';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default observer({
    name: 'BaseManager',
    props: {},
    data() {
        return {
            fullScreen: false,
        };
    },
    methods: {
        /**
         * 切换全屏
         */
        toggleFullScreen(callbackFullScreen) {
            this.$fullscreen.toggle(undefined, {
                wrap: false,
                callback: fullScreen => {
                    this.fullScreen = fullScreen;
                    callbackFullScreen(fullScreen);
                },
            });
        },
    },
});
</script>
<style lang="less" scoped>
.element-fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
}
</style>
