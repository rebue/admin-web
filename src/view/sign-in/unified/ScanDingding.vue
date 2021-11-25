<template>
    <dd-code :redirect_uri="redirectUri" scanTransferEvent="ding-talk-sign-in" :successFn="handleSuccess"></dd-code>
</template>
<script>
import DdCode from '@/component/app/Dingding.vue';
import { observer } from 'mobx-vue';
import { AppDic } from '@/dic/AppDic';
import { AppIdDic } from '@/dic/AppIdDic';
import clientConfig from '@client/config';
const clientConfigEnv = clientConfig.env[process.env.NODE_ENV];
export default observer({
    name: 'app-security-center-dingding',
    components: {
        DdCode,
    },
    props: {
        clientId: {
            type: String,
            default: AppDic.getClientId(AppIdDic.UnifiedAuth),
        },
    },
    data() {
        return {
            redirectUri: `${clientConfigEnv.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/sign-in-by-code/ding-talk/${clientConfigEnv.VUE_APP_DD_CODE_APPID}/${this.clientId}`,
        };
    },
    methods: {
        handleSuccess(data) {
            const { result, url } = data;
            if (result === 'success') {
                window.location.replace(url);
            }
        },
    },
});
</script>
