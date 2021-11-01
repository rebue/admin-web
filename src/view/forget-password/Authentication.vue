<template>
    <div class="authentication-wrap">
        <a-icon type="safety-certificate" :style="{ fontSize: '50px', color: '#52c41a' }" />
        <p class="tip">为确认是您本人操作，请选择以下任一方式完成身份认证</p>
        <div class="ctrl-wrap">
            <a-button key="phone" block size="large" @click="showModal('byPhone')">使用手机短信验证码</a-button>
            <a-button key="wechat" block size="large" @click="showModal('byWechat')">使用微信</a-button>
            <a-button key="dingding" block size="large" @click="showModal('byDingding')">使用钉钉</a-button>
            <a-button key="email" block size="large" @click="showModal('byEmail')">使用E-mail验证码</a-button>
        </div>

        <base-modal :width="460" :visible.sync="visible" :footer="false" v-if="visible">
            <phone :account="account" @callback="handleSuccess" v-if="type === 'byPhone'" />
            <wechat :account="account" @callback="handleSuccess" v-if="type === 'byWechat'" />
            <dingding :account="account" @callback="handleSuccess" v-if="type === 'byDingding'" />
            <email :account="account" @callback="handleSuccess" v-if="type === 'byEmail'" />
        </base-modal>
    </div>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import Phone from './by/Phone.vue';
import Wechat from './by/Wechat.vue';
import Dingding from './by/Dingding.vue';
import Email from './by/Email.vue';
export default {
    name: 'forget-password-authentication',
    components: { BaseModal, Phone, Wechat, Dingding, Email },
    props: ['account'],
    data() {
        return {
            visible: false,
            type: '',
        };
    },
    methods: {
        showModal(type) {
            this.visible = true;
            this.type = type;
        },
        handleSuccess(model) {
            this.$emit('success', {
                type: this.type,
                model,
            });
            this.visible = false;
            this.type = '';
        },
    },
};
</script>
<style scoped>
.tip {
    margin: 20px 0;
}
.authentication-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.ctrl-wrap >>> button {
    margin-bottom: 15px;
}
</style>
