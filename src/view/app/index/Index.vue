<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc backgWhite scrollBar flex-1 newStyle " v-if="!loading">
            <div class="listCard" v-for="(item, index) in newLabelSelect" :key="index">
                <div class="cardBox" @click="openWindow(item)">
                    <div class="imageStyle">
                        <img
                            :src="'https://auth.maiyuesoft.com' + item.imgUrl || defaultImg()"
                            @error="
                                () => {
                                    item.imgUrl || defaultImg();
                                }
                            "
                            alt=""
                            class="item-logo"
                        />
                        <div class="labelStyle">
                            <img :src="labelImg[item.labelIndex]" alt="" />
                            <span>
                                {{ item.labelName }}
                            </span>
                        </div>
                    </div>
                    <div class="appTitle">
                        <div class="autoImg">
                            <img :src="item.tagName == '已认证' ? autoImg : noautoImg" alt="" />
                        </div>
                        <div class="appName" :class="item.tagName != '已认证' ? 'greyColor' : ''">
                            {{ item.name }}
                            <!-- <a-tooltip>
                                <template slot="title">
                                    {{ item.name }}
                                </template>
                                {{ item.name }}
                            </a-tooltip> -->
                        </div>
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
            newLabelSelect: [],
            autoImg: require(`../assets/img/autoImage.png`),
            noautoImg: require(`../assets/img/noautoImage.png`),
            labelImg: [
                require(`../assets/img/labelImg1.png`),
                require(`../assets/img/labelImg2.png`),
                require(`../assets/img/labelImg3.png`),
                require(`../assets/img/labelImg4.png`),
                require(`../assets/img/labelImg5.png`),
                require(`../assets/img/labelImg1.png`),
                require(`../assets/img/labelImg2.png`),
                require(`../assets/img/labelImg3.png`),
                require(`../assets/img/labelImg4.png`),
                require(`../assets/img/labelImg5.png`),
            ],
        };
    },
    created() {
        this.getRacDicApiFun();
    },
    methods: {
        defaultImg() {
            return require(`../assets/img/default.png`);
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
                                        lastItem.labelName = item.name;
                                        if (!item.childList) {
                                            item.childList = [];
                                        }
                                        item.childList.push(lastItem);
                                    }
                                });
                                authedList.map(lastItem => {
                                    if (childItem.appId == lastItem.id) {
                                        lastItem.isauthName = '已认证';
                                        lastItem.labelName = item.name;
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
                            lastItem.labelName = '其他';
                            this.labelSelect[this.labelSelect.length - 1].childList.push(lastItem);
                        }
                    });
                    //给没有标签的应用push剩下的应用
                    authedList.map(lastItem => {
                        if (!lastItem.isauthName) {
                            lastItem.isauthName = '已认证';
                            lastItem.labelName = '其他';
                            if (lastItem.authnType == 0) {
                                lastItem.tagName = '未认证';
                            } else {
                                lastItem.tagName = '已认证';
                            }
                            this.labelSelect[this.labelSelect.length - 1].childList.push(lastItem);
                        }
                    });
                    //排序一下应用 并装到一个新数组
                    const newData = [],
                        newLabelSelect = [];
                    this.labelSelect.map(item => {
                        if (item.childList) {
                            item.childList = item.childList.sort((a, b) => {
                                return a.seqNo - b.seqNo;
                            });
                        }
                        newData.push(item.childList);
                    });
                    let labelIndex = -1;
                    newData.map(item => {
                        if (item) {
                            labelIndex++;
                            item.map(childItem => {
                                childItem.labelIndex = labelIndex;
                                newLabelSelect.push(childItem);
                            });
                        }
                    });
                    this.newLabelSelect = newLabelSelect;
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
.newStyle {
    padding: 33px 0;
}
.listCard {
    width: 20%;
    height: 182px;
    float: left;
    margin-bottom: 2%;
    .cardBox {
        // width: 174px;
        width: 75%;
        height: 100%;
        margin: auto;
        background: #f4f4f4;
        border-radius: 6px 6px 0px 0px;
        overflow: hidden;
        .imageStyle {
            position: relative;
            width: 100%;
            height: 118px;
            // height: 65%;
            background: #a1c7fa;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            img {
                width: 130%;
                // height: 100%;
            }
            .labelStyle {
                position: absolute;
                left: 0;
                top: 6px;
                font-size: 14px;
                font-weight: 400;
                color: #ffffff;
                img {
                    width: 58px;
                    height: 26px;
                }
                span {
                    position: absolute;
                    left: 0;
                    top: 4px;
                    width: 58px;
                    height: 26px;
                    text-align: center;
                }
            }
        }
        .appTitle {
            position: relative;
            width: 100%;
            height: 35%;
            display: flex;
            align-items: center;
            justify-content: center;
            .autoImg {
                width: 16px;
                height: 16px;
                display: flex;
                margin-right: 2px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .appName {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
            }
            .greyColor {
                color: #b1b1b1 !important;
            }
        }
    }
}
</style>
