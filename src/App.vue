<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100%;
}

#app {
    height: 100%;
}
</style>
