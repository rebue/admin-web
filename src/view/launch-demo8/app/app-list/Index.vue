<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <a-button type="link" icon="redo">
            刷新
        </a-button>
        <a-button type="link" icon="file">
            管理我的模板
        </a-button>
        <div class="w100" v-for="(item, index) in appList" :key="index">
            <a-collapse>
                <a-collapse-panel :key="index" :header="item.title">
                    <a-row class="mt20 pl20 pr20" :gutter="20">
                        <a-col class="mt10 mb10" :span="4" v-for="(val, key) in item.list" :key="key">
                            <router-link class="w100 in-block tx-c" :to="val.to">
                                <a-icon :type="val.icon" theme="twoTone" :style="{ fontSize: '48px' }" />
                                <p class="w100 mt10 tx-c font-14 item-title">{{ val.name }}</p>
                            </router-link>
                        </a-col>
                    </a-row>
                </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-option',
    components: {},
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,

            appList: [
                {
                    title: '公共应用',
                    list: [
                        {
                            name: '登录网站后台',
                            icon: 'appstore',
                            to: '',
                        },
                        {
                            name: '图书',
                            icon: 'book',
                            to: '',
                        },
                        {
                            name: '点击新增',
                            icon: 'file-add',
                            to: '',
                        },
                    ],
                },
                {
                    title: '个人应用',
                    list: [
                        {
                            name: '点击新增',
                            icon: 'file-add',
                            to: '',
                        },
                    ],
                },
            ],
        };
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
