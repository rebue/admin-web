<template>
    <div>
        <fragment>
            <a-card :bordered="false">
                <a-button class="btn" type="link" icon="redo">
                    刷新
                </a-button>
                <a-button class="btn" type="link" icon="file">
                    管理我的模板
                </a-button>
                <a-collapse v-model="activeKey">
                    <a-collapse-panel key="1" header="公共应用">
                        <a-button class="btn" icon="setting">
                            登录网站后台
                        </a-button>
                        <a-button class="btn" icon="book">
                            图书
                        </a-button>
                        <a-button class="btn" icon="plus">
                            点击新增
                        </a-button>
                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="个人应用" :disabled="false">
                        <a-button class="btn" icon="plus">
                            点击新增
                        </a-button>
                    </a-collapse-panel>
                </a-collapse>
            </a-card>
        </fragment>
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
            activeKey: ['1'],
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

<style scoped>
.btn {
    margin-right: 10px;
}
</style>
