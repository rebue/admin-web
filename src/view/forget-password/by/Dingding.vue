<template>
    <dd-code
        :redirect_uri="redirectUri"
        scanTransferEvent="ding-talk-verifiy"
        :successFn="handleSuccess"
        successMsg="身份认证成功"
        errorMsg="身份认证失败"
    ></dd-code>
</template>
<script>
import DdCode from '@/component/app/Dingding.vue';
import { observer } from 'mobx-vue';
import clientConfig from '@client/config';
const clientConfigEnv = clientConfig.env[process.env.NODE_ENV];
export default observer({
    name: 'forget-password-by-dingding',
    components: {
        DdCode,
    },
    props: ['account'],
    data() {
        return {
            redirectUri: `${clientConfigEnv.VUE_APP_DD_REDIRECT_URL}/orp-svr/forget/verifiy-account/ding-talk/${clientConfigEnv.VUE_APP_DD_CODE_APPID}/${this.account.id}`,
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
