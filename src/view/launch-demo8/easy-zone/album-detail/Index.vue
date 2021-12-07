<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <div class="w100 flex-box flex-wrap">
            <div class="photo of-h cu-p" v-for="(item, index) in list" :key="index">
                <a :href="item.cover" target="_blank">
                    <img class="w100 h100" :src="item.cover" alt="" />
                </a>
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
                        cover: 'https://wx4.sinaimg.cn/orj360/006c6EXlly1gx5b62h8qkj315o15on0z.jpg',
                    },
                    {
                        cover: 'https://wx3.sinaimg.cn/orj360/006c6EXlly1gx5b62rf24j315o15odld.jpg',
                    },
                    {
                        cover: 'https://wx3.sinaimg.cn/orj360/006c6EXlly1gx5b632v67j315o15ogpe.jpg',
                    },
                    {
                        cover: 'https://wx4.sinaimg.cn/orj360/006c6EXlly1gx5b63fm2xj315o15owjh.jpg',
                    },
                    {
                        cover: 'https://wx3.sinaimg.cn/orj360/006c6EXlly1gx5b63o22fj315o15oq6n.jpg',
                    },
                    {
                        cover: 'https://wx4.sinaimg.cn/orj360/006c6EXlly1gx5b63zbraj315o15owj4.jpg',
                    },
                    {
                        cover: 'https://wx2.sinaimg.cn/orj360/006c6EXlly1gx5b649g79j315o15oq7c.jpg',
                    },
                    {
                        cover: 'https://wx4.sinaimg.cn/orj360/006c6EXlly1gx5b64mnaoj315o15o782.jpg',
                    },
                    {
                        cover: 'https://wx1.sinaimg.cn/orj360/006c6EXlly1gx5b64w32dj315o15owir.jpg',
                    },
                ];
                this.loading = false;
            }, 500);
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
</style>
