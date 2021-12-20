<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc backgWhite scrollBar flex-1 newStyle " v-if="!loading">
            <template v-for="(item, index) in newLabelSelect">
                <div class="listCard" v-if="item.isEnabled" :key="index">
                    <div class="cardBox" @click="openWindow(item)">
                        <div class="imageStyle">
                            <img
                                :src="item.imgUrl || defaultImg()"
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
                                <span :class="item.labelName.length > 3 ? 'smallFont' : ''">
                                    {{ item.labelName }}
                                </span>
                            </div>
                        </div>
                        <div class="appTitle">
                            <div class="autoImg">
                                <img :src="item.isCertified == true ? autoImg : noautoImg" alt="" />
                            </div>
                            <div class="appName" :class="item.isCertified == false ? 'greyColor' : ''">
                                <!-- {{ item.name }} -->
                                <a-tooltip>
                                    <template slot="title">
                                        {{ item.name }}
                                    </template>
                                    {{ item.name }}
                                </a-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
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
                    item.treeCode = Number(item.treeCode);
                });
                data = data.sort((a, b) => {
                    return a.treeCode - b.treeCode;
                });
                data.push({
                    name: '其他',
                    children: [],
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
                    const { racAppLabelList, racAppList } = ro.extra;
                    racAppLabelList.map(item => {
                        this.labelSelect.map(childItem => {
                            if (childItem.id == item.dicItemId) {
                                if (!childItem.children) {
                                    childItem.children = [];
                                }
                                item.labelName = childItem.name;
                                childItem.children.push(item);
                            }
                        });
                    });
                    this.labelSelect.map(item => {
                        if (item.children && item.children.length != 0) {
                            racAppList.map(childItem => {
                                item.children.map((levenItem, levenIndex) => {
                                    if (childItem.id == levenItem.appId) {
                                        item.children[levenIndex] = { ...childItem, ...levenItem };
                                    }
                                });
                            });
                        }
                    });
                    // //排序一下应用 并装到一个新数组
                    const newData = [],
                        newLabelSelect = [],
                        completeLable = [];
                    this.labelSelect.map(item => {
                        if (item.children && item.children.length != 0) {
                            item.children = item.children.sort((a, b) => {
                                return a.seqNo - b.seqNo;
                            });
                            newData.push(item.children);
                        }
                    });
                    let labelIndex = -1;
                    newData.map(item => {
                        if (item) {
                            labelIndex++;
                            item.map(childItem => {
                                childItem.labelIndex = labelIndex;
                                newLabelSelect.push(childItem);
                                completeLable.push(childItem.appId);
                            });
                        }
                    });
                    labelIndex = labelIndex + 1;
                    racAppList.map(item => {
                        if (!completeLable.includes(item.id)) {
                            item.labelName = '其他';
                            item.labelIndex = labelIndex;
                            newLabelSelect.push(item);
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
        min-width: 100px;
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
                    width: 65px;
                    height: 26px;
                }
                .smallFont {
                    font-size: 12px !important;
                }
                span {
                    position: absolute;
                    left: 0;
                    top: 4px;
                    width: 65px;
                    height: 26px;
                    font-size: 14px;
                    padding-left: 5px;
                    // text-align: center;
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
            padding: 0 5px;
            .autoImg {
                width: 16px;
                height: 16px;
                display: flex;
                margin-right: 2px;
                img {
                    min-width: 100%;
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
