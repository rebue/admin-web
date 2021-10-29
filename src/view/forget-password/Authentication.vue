<template>
    <div class="authentication-wrap">
        <a-icon type="safety-certificate" :style="{ fontSize: '50px', color: '#52c41a' }" />
        <p class="tip">为确认是您本人操作，请选择以下任一方式完成身份认证</p>
        <div class="ctrl-wrap">
            <a-button key="phone" block @click="byPhone">使用手机短信验证码</a-button>
            <a-button key="wechat" block @click="byWechat">使用微信</a-button>
            <a-button key="dingding" block @click="byDingding">使用钉钉</a-button>
            <a-button key="email" block @click="byEmail">使用E-mail验证码</a-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'forget-password-authentication',
    data() {
        return {};
    },
    methods: {
        byPhone() {
            const that = this;
            this.$showDialog(
                require('./by/Phone.vue').default,
                {
                    methods: {
                        callback() {
                            that.$emit('success');
                        },
                    },
                },
                {
                    width: '460px',
                    footer: null,
                }
            );
        },
        byWechat() {
            const that = this;
            this.$showDialog(
                require('./by/Wechat.vue').default,
                {
                    methods: {
                        callback() {
                            that.$emit('success');
                        },
                    },
                },
                {
                    width: '460px',
                    footer: null,
                }
            );
        },
        byDingding() {
            const that = this;
            this.$showDialog(
                require('./by/Dingding.vue').default,
                {
                    methods: {
                        callback() {
                            that.$emit('success');
                        },
                    },
                },
                {
                    width: '460px',
                    footer: null,
                }
            );
        },
        byEmail() {
            const that = this;
            this.$showDialog(
                require('./by/Email.vue').default,
                {
                    methods: {
                        callback() {
                            that.$emit('success');
                        },
                    },
                },
                {
                    width: '460px',
                    footer: null,
                }
            );
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
