<template>
    <div>
        <!-- 忘记密码流程 -->
        <!-- 验证账号 -->
        <Account @success="next" v-if="step == 0" />
        <!-- 身份认证，设置操作，完成 -->
        <Wrap :account="account" v-if="step == 1" />
    </div>
</template>
<script>
import Account from './Account.vue';
import Wrap from './Wrap.vue';

export default {
    components: {
        Account,
        Wrap,
    },
    data() {
        return {
            step: 0,
            account: {},
        };
    },
    mounted() {
        //
    },
    methods: {
        next(account) {
            this.step = 1;
            this.account = account;
        },
    },
};
</script>
