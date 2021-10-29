<template>
    <div class="forget-password-authentication-wrap">
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item" :title="item" />
        </a-steps>
        <div class="panel">
            <!-- 身份认证 -->
            <Authentication :account="account" @success="next" v-if="current == 0" />
            <!-- 设置新密码 -->
            <ChangePswdForm :account="account" @success="finish" v-if="current == 1" />
            <!-- 完成 -->
            <div class="steps-content finish-wrap" v-if="current == 2">
                <a-result class="result" status="success" sub-title="登录密码更新成功">
                    <template #icon>
                        <a-icon type="check-circle" />
                    </template>
                </a-result>
                <div class="steps-action">
                    <a-button type="primary" block @click="goLogin">重新登录</a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { racAccountApi } from '@/api/Api';
import Authentication from './Authentication.vue';
import ChangePswdForm from './ChangePswdForm.vue';

export default {
    components: {
        Authentication,
        ChangePswdForm,
    },
    props: {
        accountId: {
            type: [Number, String],
        },
    },
    data() {
        return {
            current: 0,
            steps: ['身份认证', '设置操作', '完成'],
            loading: true,
            account: '',
        };
    },
    methods: {
        next() {
            this.current++;
        },
        prev() {
            this.current--;
        },
        finish() {
            this.current = 2;
        },
        goLogin() {
            this.$router.replace('/unified-auth/sign-in/unified');
        },
    },
    watch: {
        accountId(val) {
            // 根据accountId获取有那几种认证方式
            racAccountApi.getById(val).then(res => {
                this.account = res.extra.one;
            });
        },
    },
};
</script>

<style scoped>
.forget-password-authentication-wrap {
    width: 100%;
}
.panel {
    width: 60%;
    margin: 0 auto;
    padding-top: 60px;
}
</style>
