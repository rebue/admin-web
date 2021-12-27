<template>
    <wx-code
        :redirect_uri="redirectUri"
        :scanTransferEvent="eventTypeTransfer[eventType]"
        :successFn="handleSuccess"
    ></wx-code>
</template>
<script>
import WxCode from '@/component/app/Wechat.vue';
import { observer } from 'mobx-vue';
export default observer({
    name: 'app-security-center-wechat',
    components: {
        WxCode,
    },
    data() {
        return {
            eventTypeTransfer: {
                'account-bind': 'wechat-open-bind',
                'account-unbind': 'wechat-open-unbind',
            },
        };
    },
    computed: {
        redirectUri() {
            return `${process.env.VUE_APP_WX_REDIRECT_URL}/orp-svr/orp/${this.eventType}/wechat-open/${process.env.VUE_APP_WX_CODE_APPID}/${this.accountId}`;
        },
    },
    methods: {
        handleSuccess(data) {
            const { result, msg } = data;
            if (result === 'success') {
                setTimeout(() => {
                    this.callback && this.callback();
                    this.closeDialog && this.closeDialog();
                }, 500);
            }
        },
    },
});
</script>
