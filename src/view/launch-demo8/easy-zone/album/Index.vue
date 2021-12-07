<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <div class="w100 flex-box al-c">
            <a-button class="mr10" type="primary"> <a-icon type="picture" />上传照片 </a-button>
            <a-button class="mr10" type="primary"> <a-icon type="play-square" />上传视频 </a-button>
            <a-button class="mr10" type="dashed" size="small">新建相册</a-button>
            <div class="flex-1"></div>
        </div>

        <div class="w100 mt20 flex-box flex-wrap">
            <div class="photo of-h cu-p" v-for="(item, index) in list" :key="index" @click="goHref(item.id)">
                <img class="w100 h100" :src="item.cover" alt="" />
                <div class="photo-title">
                    <p class="mt5 mb5 pl10 pr10 font-14 ellipsis white" style="linr-height: 20px;">{{ item.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'album',
    components: {},
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,

            loading: false,
            list: [],
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
                this.list = [
                    {
                        id: '1',
                        title: '默认相册',
                        cover: 'https://wx4.sinaimg.cn/orj360/006c6EXlly1gx5b62h8qkj315o15on0z.jpg',
                    },
                    {
                        id: '2',
                        title: '乱七八糟',
                        cover: 'https://wx1.sinaimg.cn/orj360/005F4Uyxly1gx2qx2cfzvj647s6bkx6s02.jpg',
                    },
                ];
                this.loading = false;
            }, 500);
        },
        goHref(id) {
            this.$router.push({
                name: 'launch-demo8-easy-zone-album-detail',
                params: {
                    id: id,
                },
            });
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped>
.photo {
    position: relative;
    margin: 10px;
    padding: 5px;
    width: 200px;
    height: 200px;
    border: 1px solid #cccccc;
}

.photo .photo-title {
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 60px;
    background: rgba(0, 0, 0, 0.4);
    transition: bottom 0.3s;
}

/* .photo:hover .photo-title {
    bottom: 0;
} */
</style>
