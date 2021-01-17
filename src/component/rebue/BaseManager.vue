<template>
    <div :class="{ 'element-fullscreen': fullScreen }">
        <a-card class="manager-card" :bordered="false">
            <slot name="managerCard"> </slot>
        </a-card>
    </div>
</template>

<script>
export default {
    name: 'BaseManager',
    props: {},
    data() {
        return {
            fullScreen: false,
        };
    },
    provide: function() {
        return {
            toggleFullScreen: this.toggleFullScreen,
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
};
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

.manager-card {
    height: 100%;
}
</style>
