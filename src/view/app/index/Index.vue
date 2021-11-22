<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc backgWhite scrollBar flex-1" v-if="!loading">
            <div class="tableList" v-for="(item, index) in labelSelect" :key="index" v-show="item.childList">
                <div class="title" @click="clickShow(index)">
                    <span class="name">
                        {{ item.name }}
                    </span>
                    <span class="clickIcon">
                        {{ item.show ? '收起' : '展开' }}
                        <a-icon type="double-right" :rotate="item.show ? -90 : 90" />
                    </span>
                </div>
                <div class="content" v-show="item.show">
                    <div class="newCardStyle" v-for="(childItem, childIndex) in item.childList" :key="childIndex">
                        <a
                            class="block flex-box flex-col al-c link-item ablea"
                            href="javascript:void(0)"
                            @click="openWindow(childItem)"
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
                                        class="item-logo"
                                    />
                                </div>
                                <div class="appTitle">
                                    <div class="autoImg" v-show="childItem.tagName != '未认证' && childItem.tagName">
                                        <img :src="autoImg" alt="" />
                                    </div>
                                    <div class="appName">
                                        <a-tooltip>
                                            <template slot="title">
                                                {{ childItem.name }}
                                            </template>
                                            {{ childItem.name }}
                                        </a-tooltip>
                                    </div>
                                </div>
                                <div
                                    class="tag"
                                    :class="childItem.tagName == '未认证' || !childItem.tagName ? 'huiTag' : ''"
                                >
                                    {{ !childItem.tagName ? '未认证' : childItem.tagName }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { oapAppApi, racDicApi } from '@/api/Api';
import Aside from './Aside.vue';
import { setWin } from '@/util/winMap';
export default {
    name: 'app-index',
    components: {
        Aside,
    },
    props: {},
    data() {
        return {
            loading: false,
            authedList: [],
            unauthList: [],
            labelSelect: [],
            autoImg: require(`../assets/img/autoImage.png`),
        };
    },
    created() {
        this.getRacDicApiFun();
    },
    methods: {
        defaultImg() {
            return require(`../assets/img/app1.png`);
        },
        /**点击展开 */
        clickShow(index) {
            this.labelSelect[index].show = !this.labelSelect[index].show;
        },
        /**请求标签内容 */
        getRacDicApiFun() {
            const params = 'ApplyLabel';
            racDicApi.getByDicKey(params).then(ro => {
                let data = ro.extra.dicItems;
                data.map(item => {
                    item.show = true;
                    item.treeCode = Number(item.treeCode);
                });
                data = data.sort((a, b) => {
                    return a.treeCode - b.treeCode;
                });
                data.push({
                    name: '其他',
                    show: true,
                    children: [],
                    childList: [],
                    treeCode: data.length,
                });
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
                    //PUSH回相应的标签
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
                                        if (lastItem.authnType == 0) {
                                            lastItem.tagName = '未认证';
                                        } else {
                                            lastItem.tagName = '已认证';
                                        }
                                        if (!item.childList) {
                                            item.childList = [];
                                        }
                                        item.childList.push(lastItem);
                                    }
                                });
                            });
                        }
                    });
                    //给没有标签的应用push剩下的应用
                    unauthList.map(lastItem => {
                        if (!lastItem.isauthName) {
                            lastItem.isauthName = '未认证';
                            this.labelSelect[this.labelSelect.length - 1].childList.push(lastItem);
                        }
                    });
                    //给没有标签的应用push剩下的应用
                    authedList.map(lastItem => {
                        if (!lastItem.isauthName) {
                            lastItem.isauthName = '已认证';
                            if (lastItem.authnType == 0) {
                                lastItem.tagName = '未认证';
                            } else {
                                lastItem.tagName = '已认证';
                            }
                            this.labelSelect[this.labelSelect.length - 1].childList.push(lastItem);
                        }
                    });
                    //排序一下应用
                    this.labelSelect.map(item => {
                        if (item.childList) {
                            console.log(item);
                            item.childList = item.childList.sort((a, b) => {
                                return a.seqNo - b.seqNo;
                            });
                        }
                    });
                    console.log(this.labelSelect);
                    this.loading = false;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * 点击打开应用
         */
        openWindow(app) {
            const win = window.open(app.url, app.id);
            // 记录打开的窗口，后续点击退出操作关闭已打开的窗口。
            setWin(win);
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
.backgWhite {
    background: #ffffff;
    box-shadow: 0px 8px 10px 0px #a3bce2;
    border-radius: 0px 0px 10px 10px;
    border-top: 4px solid rgba(58, 105, 201, 1);
    // height: 791px;
    overflow: auto;
}
.scrollBar::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.scrollBar::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #3a69c9;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
.scrollBar::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
}
.ablea {
    width: 100%;
    height: 100%;
}
.tableList {
    padding: 0 30px;
    margin-bottom: 10px;
    .title {
        font-size: 20px;
        font-weight: 400;
        color: #222222;
        padding: 10px 0;
        border-bottom: 1px solid #e4e5ea;
        position: relative;
        .clickIcon {
            position: absolute;
            right: 0;
            font-size: 18px;
            font-weight: 400;
            color: #c2bfbf;
            cursor: pointer;
        }
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        .newCardStyle {
            width: 20%;
        }
    }
}
.card_box {
    width: 74%;
    height: 180px;
    background: #f6f6f6;
    border-radius: 6px;
    position: relative;
    margin-top: 22px;
    .top_card_box {
        width: 100%;
        height: 100px;
        background: rgba(188, 215, 250, 0.7);
        border-radius: 6px 6px 0px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        .item-logo {
            width: 100%;
            height: 100%;
        }
    }
    .appTitle {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        text-align: center;
        padding: 10px 0;
        position: relative;
        .appName {
            width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .autoImg {
            width: 18px;
            height: 18px;
            display: flex;
            margin-right: 2px;
            img {
                width: 100%;
                height: 100%;
            }
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
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 60%;
        height: 24px;
        background: #e7ecf7;
        font-size: 14px;
        font-weight: 400;
        color: #678ddc;
    }
    .huiTag {
        background: #e8e8e9 !important;
        color: #81858c !important;
    }
}
</style>
