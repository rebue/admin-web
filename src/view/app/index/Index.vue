<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc w140">
            <a-spin :spinning="loading">
                <div class="w100 pt20 pb20 bg-w card card-shadow ">
                    <div class="title">
                        <img :src="require('../assets/img/safety.png')" width="20" height="24" />
                        <span class="font-20">已认证系统（{{ authedList.length }}个)</span>
                    </div>
                    <a-row class="content">
                        <a-col
                            class="flex-box al-c ju-c mb20"
                            :span="4"
                            v-for="(item, index) in authedList"
                            :key="index"
                        >
                            <a class="block flex-box flex-col al-c link-item" :href="item.url" target="_blank">
                                <img
                                    :src="item.imgUrl || defaultImg()"
                                    @error="
                                        () => {
                                            item.imgUrl = defaultImg();
                                        }
                                    "
                                    alt=""
                                    width="56px"
                                    height="56px"
                                    class="item-logo"
                                />
                                <div class="w80 mt10 font-14 tx-c ellipsis-2">{{ item.name }}</div>
                            </a>
                        </a-col>
                    </a-row>
                </div>
            </a-spin>

            <a-spin :spinning="loading">
                <div class="mt20 w100 pt20 pb20 bg-w card card-shadow">
                    <div class="title">
                        <img :src="require('../assets/img/unsafety.png')" width="20" height="24" />
                        <span class="font-20">未认证系统（{{ unauthList.length }}个）</span>
                    </div>
                    <a-row class="content">
                        <a-col
                            class="flex-box al-c ju-c mb20"
                            :span="4"
                            v-for="(item, index) in unauthList"
                            :key="index"
                        >
                            <a class="block flex-box flex-col al-c radius-4 link-item" :href="item.url" target="_blank">
                                <img
                                    :src="item.imgUrl || defaultImg()"
                                    @error="
                                        () => {
                                            item.imgUrl = defaultImg();
                                        }
                                    "
                                    alt=""
                                    width="56px"
                                    height="56px"
                                    class="item-logo"
                                />
                                <div class="w80 mt10 font-14 tx-c ellipsis-2">{{ item.name }}</div>
                            </a>
                        </a-col>
                    </a-row>
                </div>
            </a-spin>
        </div>
    </div>
</template>

<script>
import { oapAppApi } from '@/api/Api';
import Aside from './Aside.vue';
export default {
    name: 'app-index',
    components: {
        Aside,
    },
    props: {},
    data() {
        return {
            loading: true,
            authedList: [],
            unauthList: [],
        };
    },
    created() {
        this.loopFetch();
    },
    methods: {
        defaultImg() {
            return require(`../assets/img/app1.png`);
        },
        fetchAuthList() {
            this.loading = true;
            //加上处理轮询
            oapAppApi
                .listAndTripartite()
                .then(ro => {
                    const { oapAppList, racAppList } = ro.extra;
                    //已认证
                    const authedList = [];
                    // 未认证
                    const unauthList = [];

                    // 认证map
                    const oapAppMap = {};
                    oapAppList.forEach(v => {
                        oapAppMap[v.appId] = v;
                    });

                    //过滤
                    racAppList.forEach(v => {
                        //启用
                        if (v.isEnabled) {
                            if (oapAppMap[v.id] && v.isCertified) {
                                //已认证
                                authedList.push(v);
                            } else {
                                //未认证
                                unauthList.push(v);
                            }
                        }
                    });

                    this.authedList = authedList;
                    this.unauthList = unauthList;
                    this.loading = false;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 轮询加载
        loopFetch() {
            this.fetchAuthList();
            setTimeout(this.loopFetch, process.env.VUE_APP_APP_OPS_LOOP * 60 * 1000);
        },
    },
};
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
        margin-bottom: 50px;
        > img {
            margin-right: 10px;
            vertical-align: middle;
        }
        > span {
            vertical-align: middle;
        }
    }
    .link-item {
        margin-bottom: 57px;
    }
    .item-logo {
        border-radius: 50%;
    }
    .content {
        min-height: 100px;
        display: flex;
        flex-flow: wrap;
    }
}
</style>
