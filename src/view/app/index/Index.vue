<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc w140">
            <a-collapse v-model="activeKey" v-if="!loading">
                <a-collapse-panel v-for="(item, index) in labelList" :key="item" :header="labelSelect[index].name">
                    <a-spin :spinning="loading">
                        <div class="w100 pt20 pb20 bg-w ">
                            <a-row class="content" :gutter="10" v-if="labelSelect[index].childList">
                                <a-col
                                    class="flex-box al-c ju-c"
                                    :span="6"
                                    v-for="(childItem, childIndex) in labelSelect[index].childList"
                                    :key="childIndex"
                                >
                                    <a
                                        class="block flex-box flex-col al-c link-item ablea"
                                        :href="childItem.url"
                                        target="_blank"
                                    >
                                        <div class="card_box">
                                            <div class="top_card_box">
                                                <img
                                                    :src="childItem.imgUrl || defaultImg()"
                                                    @error="
                                                        () => {
                                                            childItem.imgUrl = defaultImg();
                                                        }
                                                    "
                                                    alt=""
                                                    width="60px"
                                                    height="6   0px"
                                                    class="item-logo"
                                                />
                                                <div class="title">{{ childItem.name }}</div>
                                            </div>
                                            <div class="auth_type">
                                                <span
                                                    class="auth_tag"
                                                    :class="
                                                        childItem.isauthName == '已认证' ? 'autoColor' : 'notAutoColor'
                                                    "
                                                    >{{ childItem.isauthName }}</span
                                                >
                                            </div>
                                            <div class="tag">
                                                <a-tag
                                                    :color="
                                                        childItem.authnType == 0
                                                            ? 'red'
                                                            : item.authnType == 1
                                                            ? 'blue'
                                                            : item.authnType == 2
                                                            ? 'pink'
                                                            : item.authnType == 3
                                                            ? 'orange'
                                                            : 'green'
                                                    "
                                                    v-show="childItem.isauthName == '已认证'"
                                                >
                                                    {{
                                                        childItem.authnType == 0
                                                            ? '未认证'
                                                            : item.authnType == 1
                                                            ? '共用cookie（内部系统）'
                                                            : item.authnType == 2
                                                            ? '授权码'
                                                            : item.authnType == 3
                                                            ? '凭证'
                                                            : 'CAS'
                                                    }}
                                                </a-tag>
                                            </div>
                                        </div>
                                    </a>
                                </a-col>
                            </a-row>
                            <div class="noAppCss" v-else>
                                暂无应用
                            </div>
                        </div>
                    </a-spin>
                </a-collapse-panel>
            </a-collapse>

            <!-- <a-spin :spinning="loading">
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
                                <div class="mt10 font-14 tx-c ellipsis-2 app-name" :title="item.name">
                                    {{ item.name }}
                                </div>
                            </a>
                        </a-col>
                    </a-row>
                </div>
            </a-spin> -->
        </div>
    </div>
</template>

<script>
import { oapAppApi, racDicApi } from '@/api/Api';
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
            labelList: [],
            labelSelect: [],
            activeKey: [],
        };
    },
    created() {
        this.getRacDicApiFun();
    },
    methods: {
        defaultImg() {
            return require(`../assets/img/app1.png`);
        },
        /**请求标签内容 */
        getRacDicApiFun() {
            const params = 'ApplyLabel';
            racDicApi.getByDicKey(params).then(ro => {
                const data = ro.extra.dicItems,
                    labelList = [];
                data.map((item, index) => {
                    labelList.push(index++ + '');
                });
                this.labelList = labelList;
                this.activeKey = labelList;
                this.labelSelect = data;
                this.fetchAuthList();
            });
        },
        fetchAuthList() {
            this.loading = true;
            //加上处理轮询
            oapAppApi
                .listAndTripartite()
                .then(ro => {
                    console.log(ro.extra);
                    const { oapAppList, racAppLabelList, racAppList } = ro.extra;
                    racAppLabelList.map(item => {
                        this.labelSelect.map(childItem => {
                            if (childItem.id == item.dicItemId) {
                                if (!childItem.children) {
                                    childItem.children = [];
                                }
                                childItem.children.push(item);
                            }
                        });
                    });
                    // //已认证
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
                    this.labelSelect.map(item => {
                        if (item.children) {
                            item.children.map(childItem => {
                                unauthList.map(lastItem => {
                                    if (childItem.appId == lastItem.id) {
                                        lastItem.isauthName = '未认证';
                                        if (!item.childList) {
                                            item.childList = [];
                                        }
                                        item.childList.push(lastItem);
                                    }
                                });
                                authedList.map(lastItem => {
                                    if (childItem.appId == lastItem.id) {
                                        lastItem.isauthName = '已认证';
                                        if (!item.childList) {
                                            item.childList = [];
                                        }
                                        item.childList.push(lastItem);
                                    }
                                });
                            });
                        }
                    });
                    this.loading = false;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 轮询加载
        // loopFetch() {
        //     this.fetchAuthList();
        //     setTimeout(this.loopFetch, process.env.VUE_APP_APP_OPS_LOOP * 60 * 1000);
        // },
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
    .app-name {
        width: 4em;
        word-break: break-word;
    }
}
.ablea {
    width: 100%;
    height: 100%;
}
.noAppCss {
    display: flex;
    align-items: center;
    justify-content: center;
}
.card_box {
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    position: relative;
    .top_card_box {
        display: flex;
        align-items: center;
        .item-logo {
            width: 60px;
            height: 60px;
        }
        .title {
            display: inline-block;
            margin-left: 5px;
            font-size: 14px;
            line-height: 22px;
            font-weight: 500;
            color: #182b50;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .auth_type {
        position: absolute;
        top: 0;
        right: 0;
        overflow: hidden;
        height: 50px;
        width: 50px;
        .auth_tag {
            width: 90px;
            text-align: center;
            transform: rotate(42deg);
            transform-origin: bottom right;
            position: absolute;
            top: 28px;
            right: -8px;
            padding: 2.5px 2px;
            z-index: 1;
            color: #fff;
        }
        .autoColor {
            background-color: #1890ff;
        }
        .notAutoColor {
            background-color: #ccc;
        }
    }
    .tag {
        display: flex;
        padding-left: 65px;
        .ant-tag-pink {
            font-size: 16px;
        }
    }
}
</style>
