<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc flex-1">
            <div class="w100 pt20 pb20 bg-w card card-shadow security-center-card">
                <div class="title">
                    <img :src="require('../assets/img/safety.png')" width="20" height="24" />
                    <span class="font-20">安全中心</span>
                </div>
                <Main />
            </div>
        </div>
    </div>
</template>

<script>
import { observer } from 'mobx-vue';
import Aside from './Aside.vue';
import Main from './Main.vue';

export default observer({
    name: 'app-security-center-index',
    components: {
        Aside,
        Main,
    },
    data() {
        return {
            //
        };
    },
    mounted() {
        //
    },
    methods: {
        //
    },
});
</script>

<style scoped lang="less">
.card {
    padding-left: 24px;
    padding-right: 12px;
    border-top: 4px solid #3a69c9;
    box-shadow: 0px 8px 10px 0px #a3bce2;
    border-radius: 0px 0px 10px 10px;
    .title {
        border-bottom: 1px solid #e4e5ea;
        padding-bottom: 14px;
        margin-bottom: 20px;
        > img {
            margin-right: 10px;
            vertical-align: middle;
        }
        > span {
            vertical-align: middle;
        }
    }
}
</style>
