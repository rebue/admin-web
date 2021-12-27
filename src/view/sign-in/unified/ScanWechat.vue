<template>
    <wx-code :redirect_uri="redirectUri" scanTransferEvent="wechat-open-sign-in" :successFn="handleSuccess"></wx-code>
</template>
<script>
import WxCode from '@/component/app/Wechat.vue';
import { observer } from 'mobx-vue';
import { AppDic } from '@/dic/AppDic';
import { AppIdDic } from '@/dic/AppIdDic';
export default observer({
    name: 'sign-in-unified-wechat',
    components: {
        WxCode,
    },
    props: {
        clientId: {
            type: String,
            default: AppDic.getClientId(AppIdDic.UnifiedAuth),
        },
    },
    data() {
        return {
            redirectUri: `${process.env.VUE_APP_WX_REDIRECT_URL}/orp-svr/orp/sign-in-by-code/wechat-open/${process.env.VUE_APP_WX_CODE_APPID}/${this.clientId}`,
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
