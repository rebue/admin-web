<template>
    <wx-code
        :redirect_uri="redirectUri"
        scanTransferEvent="wechat-open-verifiy"
        :successFn="handleSuccess"
        successMsg="身份认证成功"
        errorMsg="身份认证失败"
    ></wx-code>
</template>
<script>
import WxCode from '@/component/app/Wechat.vue';
import { observer } from 'mobx-vue';
export default observer({
    name: 'forget-password-by-wechat',
    components: {
        WxCode,
    },
    props: ['account'],
    data() {
        return {
            redirectUri: `${process.env.VUE_APP_WX_REDIRECT_URL}/orp-svr/forget/verifiy-account/wechat-open/${process.env.VUE_APP_WX_CODE_APPID}/${this.account.id}`,
        };
    },
    methods: {
        handleSuccess(data) {
            const { result, msg } = data;
            if (result === 'success') {
                setTimeout(() => {
                    this.$emit('callback', { id: this.account.id, verifiy: msg });
                }, 500);
            }
        },
    },
});
</script>
