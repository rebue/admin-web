<template>
    <div class="main" :class="{ 'multiple-col-wrap': $slots.left }">
        <div class="left" v-if="$slots.left">
            <slot name="left" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleManagement',
};
</script>

<style scoped></style>
