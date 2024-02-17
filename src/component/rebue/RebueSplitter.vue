<script setup lang="ts">
interface Props {
    /** 方向: 垂直、水平 */
    direction?: 'vertical' | 'horizontal';
}
const { /** 方向默认垂直 */ direction = 'vertical' } = defineProps<Props>();

const emit = defineEmits(['resized']);

function startResize(mde: MouseEvent) {
    const target = mde.target as HTMLElement;
    const previousElementSibling = target.previousElementSibling as HTMLElement;
    const previousRect = previousElementSibling.getBoundingClientRect();

    function handleMouseMove(mme: MouseEvent) {
        let size = (direction === 'vertical' ? mme.clientX - previousRect.left : mme.clientY - previousRect.top) + 'px';
        previousElementSibling.style.flexBasis = size;
        emit('resized', size);
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}
</script>

<template>
    <div
        class="splitter"
        v-bind:class="{ vertical: direction === 'vertical', horizontal: direction === 'horizontal' }"
        @mousedown="startResize"
    ></div>
</template>

<style lang="scss" scoped>
.splitter {
    /** 不缩小 */
    flex-shrink: 0;
    /** 不换行 */
    white-space: nowrap;
    background-color: $bg-color-spliter;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        transition: opacity 0.4s;
        background-color: rgba(255, 0, 0, 0.3);
        opacity: 0;
        z-index: 1;
    }
    &:hover:before {
        opacity: 1;
    }
}
/** 垂直 */
.vertical {
    cursor: col-resize;
    width: 3px;
    &::before {
        left: -5px;
        right: -5px;
        height: 100%;
    }
}
/** 水平 */
.horizontal {
    cursor: row-resize;
    height: 3px;
    &::before {
        top: -5px;
        bottom: -5px;
        width: 100%;
    }
}
</style>
