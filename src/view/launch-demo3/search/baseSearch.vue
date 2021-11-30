<template>
    <div style="margin: 0 auto;padding-left: -500px">
        <a-input style="width: 300px;margin-left: 20px" addon-before="作者姓名" v-model="name"></a-input>
        <a-input style="width: 300px;margin-left: 20px" addon-before="作者姓名" v-model="name"></a-input><br />
        <a-input style="width: 300px;margin-left: 20px" addon-before="作者姓名" v-model="name"></a-input>
        <a-input style="width: 300px;margin-left: 20px" addon-before="作者姓名" v-model="name"></a-input>
    </div>
</template>

<script>
export default {
    name: 'baseSearch',
    data() {
        return {
            name: '',
        };
    },
};
</script>

<style scoped></style>
