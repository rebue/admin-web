<template>
    <div>
        <Header />
        <div class="w100" style="height: 77px;"></div>

        <div class="mt20 main">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import Header from '@/component/app/Header.vue';
export default {
    name: 'app',
    components: { Header },
    props: {},
    data() {
        return {};
    },
    watch: {},
    methods: {},
};
</script>

<style src="./base.css"></style>
<style scoped>
.main {
    min-height: calc(100vh - 100px);
}
</style>
