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
import WxCode from '@/view/sign-in/unified/Wechat.vue';
import { observer } from 'mobx-vue';
import clientConfig from '@client/config';
const clientConfigEnv = clientConfig.env[process.env.NODE_ENV];
export default observer({
    name: 'forget-password-by-wechat',
    components: {
        WxCode,
    },
    props: ['account'],
    data() {
        return {
            redirectUri: `${clientConfigEnv.VUE_APP_WX_REDIRECT_URL}/orp-svr/forget/verifiy-account/wechat-open/${clientConfigEnv.VUE_APP_WX_CODE_APPID}/${this.account.id}`,
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
