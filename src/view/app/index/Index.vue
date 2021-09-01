<template>
    <div class="mc w140">
        <a-spin :spinning="loading">
            <div class="w100 pt20 pb20 pl20 pr20 card-shadow radius-4 bg-w">
                <p class="font-20">已认证系统（{{ authedList.length }}个）</p>
                <a-row>
                    <a-col class="flex-box al-c ju-c mb20" :span="4" v-for="(item, index) in authedList" :key="index">
                        <a class="block flex-box flex-col al-c radius-4 link-item" :href="item.link" target="_blank">
                            <img :src="`${item.icon || `/img/icon-app.png`}`" alt="" width="60px" height="60px" />
                            <div class="w80 mt10 font-14 tx-c ellipsis-2">{{ item.name }}</div>
                        </a>
                    </a-col>
                </a-row>
            </div>
        </a-spin>

        <a-spin :spinning="loading">
            <div class="mt20 w100 pt20 pb20 pl20 pr20 card-shadow radius-4 bg-w">
                <p class="font-20">未认证系统（{{ unauthList.length }}个）</p>
                <a-row>
                    <a-col class="flex-box al-c ju-c mb20" :span="4" v-for="(item, index) in unauthList" :key="index">
                        <a class="block flex-box flex-col al-c radius-4 link-item" :href="item.link" target="_blank">
                            <img :src="`${item.icon || `/img/icon-app.png`}`" alt="" width="60px" height="60px" />
                            <div class="w80 mt10 font-14 tx-c ellipsis-2">{{ item.name }}</div>
                        </a>
                    </a-col>
                </a-row>
            </div>
        </a-spin>
    </div>
</template>

<script lang="ts">
export default {
    name: 'app-index',
    components: {},
    props: {},
    data() {
        return {
            loading: true,
            authedList: [] as object[],
            unauthList: [] as object[],
        };
    },
    watch: {},
    mounted() {
        this.fetchAuthList();
    },
    methods: {
        fetchAuthList() {
            this.loading = true;
            setTimeout(() => {
                this.authedList = [
                    {
                        name: '内诊系统内诊系统内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                ];
                this.unauthList = [
                    {
                        name: '内诊系统内诊系统内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                    {
                        name: '内诊系统',
                        icon: '',
                        link: 'http://www.baidu.com',
                    },
                ];

                this.loading = false;
            }, 500);
        },
    },
};
</script>

<style scoped>
.link-item {
    width: 138px;
    height: 138px;
    padding-top: 16px;
}

.link-item:hover {
    box-shadow: 0px 8px 10px 0px #f5f5f5;
}
</style>
