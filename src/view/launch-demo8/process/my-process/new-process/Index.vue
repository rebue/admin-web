<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <div class="w100" v-for="(item, index) in appList" :key="index">
            <a-divider v-if="index !== 0" />
            <p class="font-18">{{ item.title }}</p>
            <a-row class="mt20 pl20 pr20" :gutter="20">
                <a-col class="mt10 mb10" :span="4" v-for="(val, key) in item.list" :key="key">
                    <router-link class="w100 in-block tx-c" :to="val.to">
                        <a-icon :type="val.icon" theme="twoTone" :style="{ fontSize: '48px' }" />
                        <p class="w100 mt10 tx-c font-14 item-title">{{ val.name }}</p>
                    </router-link>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'new-process',
    components: {},
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,

            appList: [
                {
                    title: '办公管理',
                    list: [
                        {
                            name: '网上发布（部门新闻）',
                            icon: 'book',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '邀请函',
                            icon: 'mail',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '接待审批流程',
                            icon: 'reconciliation',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '收文办理（校内呈文）',
                            icon: 'profile',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '发文办理（红头文件）',
                            icon: 'pushpin',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '网上发布（通知通告）',
                            icon: 'notification',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '网上发布（校园新闻）',
                            icon: 'cloud',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '出差（离邕请示）申请表',
                            icon: 'car',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '新版收文办理（校外来文）',
                            icon: 'container',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                    ],
                },
                {
                    title: '信息中心',
                    list: [
                        {
                            name: 'VPN账号申请办理',
                            icon: 'api',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: 'LED信息发布',
                            icon: 'alert',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                        {
                            name: '设备维修流程',
                            icon: 'tool',
                            to: '/launch-demo8/process/my-process/detail-process',
                        },
                    ],
                },
                {
                    title: '人事管理',
                    list: [
                        {
                            name: '部门工作量修改申请',
                            icon: 'idcard',
                            to: '/launch-demo8/process/my-process/detail-process',
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

<style scoped>
.item-title {
    height: 2.5em;
}
</style>
