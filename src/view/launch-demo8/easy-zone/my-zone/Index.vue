<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <div class="w100 flex-box">
            <div class="flex-1"></div>
            <a-button type="primary">发表动态</a-button>
        </div>

        <div v-for="(item, index) in list" :key="index">
            <div class="w100 flex-box">
                <a-avatar :size="50" icon="user" :src="item.userImage" />
                <div class="ml10 font-14 flex-1">
                    <p class="mt5 mb5 font-16 bold">{{ item.userName }}</p>
                    <p class="mb5 grey">{{ item.date }} {{ item.from }}</p>
                    <div class="font-14">{{ item.detail }}</div>
                    <div class="mt20">
                        <a-upload action="" list-type="picture-card" :file-list="item.images" disabled></a-upload>
                    </div>
                </div>
            </div>
            <a-divider />
        </div>

        <div class="mt20 w100 flex-box">
            <div class="flex-1"></div>
            <a-pagination
                v-model="pageNum"
                :page-size-options="['10', '20', '30', '40', '50']"
                :total="total"
                show-size-changer
                :page-size="pageSize"
            ></a-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-zone',
    components: {},
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,

            loading: false,

            list: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
        };
    },
    computed: {},
    // created() {},
    mounted() {
        this.fetchList();
    },
    // destroyed() {},
    methods: {
        fetchList() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
                this.list = [
                    {
                        id: '1',
                        userName: '阳光',
                        userImage:
                            'https://tvax1.sinaimg.cn/crop.0.0.829.829.180/c3d42545ly8gdijmsfwscj20n10n10ts.jpg?KID=imgbed,tva&Expires=1638854060&ssig=f%2BQT2hPA4c',
                        date: '14小时前',
                        from: '来自 iPhone 12',
                        detail:
                            '#豫见最美校园# 【#河南一高校给考研学子的糖果祝福#：祝你“棒”上有名！】临近2022考研，@河南工程学院 的考研学子收到了一份特殊礼物——带有祝福便签的棒棒糖，寓意榜（棒）上有名。一张简单寄语加上一根棒棒糖，最淳朴的方式传达着对考研学子的“甜蜜”祝愿。',
                        images: [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://wx4.sinaimg.cn/orj360/707e96d5gy1gx4at046qrj20jj0aejsx.jpg',
                            },
                            {
                                uid: '-2',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://wx1.sinaimg.cn/orj360/707e96d5gy1gx4atyxdacj20k90fn41o.jpg',
                            },
                        ],
                    },
                    {
                        id: '2',
                        userName: '庄时利和',
                        userImage:
                            'https://tvax3.sinaimg.cn/crop.0.0.512.512.180/670a19b6ly8gm410azbeaj20e80e83yo.jpg?KID=imgbed,tva&Expires=1638856000&ssig=7dpjNTAbSR',
                        date: '16小时前',
                        from: '来自 iPhone 12',
                        detail:
                            '#女子吃冰箱剩饭感染脑炎# 这名女子感染的是李斯特菌。我之前有个大家推荐过梅奥的健康怀孕全书，在这本书里面关于孕妇饮食，提到很多次的细菌就是李斯特菌。关于这个细菌的背景知识这里就不展开说了，我引用香港食品安全中心的报告，只说几个要点。1. 李斯特菌是广泛分布的一种细菌，食物中如果含有很少量李斯特菌，影响不大，但是随着菌落数量的增加，可能会导致发病（李斯特菌病）。2. 孕妇是李斯特菌的高风险人群。孕妇本身感染后通常症状轻微，但是对胎儿影响较大。李斯特菌会穿越血胎屏障，孕早期感染可能导致流产，孕晚期感染可能导致早产，也可能影响胎儿的心脏、肾脏及神经系统。3. 正常烹饪温度可以杀死李斯特菌，它在冷冻温度下也无法生长，但是与其他引起食物中毒的细菌不同，李斯特菌在冷藏温度下仍然可以缓慢生长，因此保质期较长（超过五天）的冷藏即食食物是感染李斯特菌病的高风险食物。4. 所以对于孕妇来说，避免吃生肉（包括生火腿、刺身等）以及部分芝士。对于其他家人来说，剩菜剩饭也不宜放在冰箱冷藏室太长时间，如有需要应放冷冻室，在吃之前应当彻底煮熟，以杀死李斯特菌及其他细菌。',
                        images: [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://wx3.sinaimg.cn/orj360/670a19b6gy1gx2s9hgr80j20wi1yc4qp.jpg',
                            },
                            {
                                uid: '-2',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://wx4.sinaimg.cn/orj360/670a19b6gy1gx2s9fld5kj22ap11yx22.jpg',
                            },
                        ],
                    },
                    {
                        id: '3',
                        userName: '中国网',
                        userImage:
                            'https://tvax2.sinaimg.cn/crop.18.23.153.153.180/bca56c10ly8gdiigyu2ndj205k05kgln.jpg?KID=imgbed,tva&Expires=1638856000&ssig=y%2Bbgh3zMlf',
                        date: '23小时前',
                        from: '来自 iPhone 13 Pro 已编辑',
                        detail:
                            '【#妈妈自学10年为家人编钩四季衣物#】湖南浏阳，45岁的全职妈妈莫女士，自学了10年手工编钩。她为丈夫和孩子编出了五彩的毛拖鞋、毛衣，还有烤火被、脚垫等生活用品。女儿穿她钩织的鞋子都会开心地说“妈妈你钩的鞋好漂亮”，瞬间会让她感到自信，并更坚定去做这门手艺了。',
                        images: [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://wx2.sinaimg.cn/crop.0.0.1941.1080/93e7c9bfgy1gx3v0g3y02j21hy0u046v.jpg',
                            },
                        ],
                    },
                ];
                this.total = 3;
            }, 500);
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
