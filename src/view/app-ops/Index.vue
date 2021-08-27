<template>
    <div>
        <h2>已接入应用</h2>
        <a-row type="flex" justify="start">
            <a-col class="app" :span="4" v-for="(app, index) in conAppList" :key="index">
                <img :src="app.icon" width="80" height="80" />
                <span class="app-name">{{ app.name }}</span>
            </a-col>
        </a-row>
        <h2>未接入应用</h2>
        <a-row type="flex" justify="start">
            <a-col class="app" :span="4" v-for="(app, index) in unconAppList" :key="index">
                <img :src="app.icon" width="80" height="80" />
                <span class="app-name">{{ app.name }}</span>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts">
export default {
    components: {},
    props: {},
    data() {
        return {
            conAppList: [],
            unconAppList: [],
        };
    },
    watch: {},
    mounted() {
        //api获取列表，websocket
    },
    methods: {},
};
</script>
<style scoped>
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}
</style>
