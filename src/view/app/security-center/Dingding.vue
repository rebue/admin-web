<template>
    <dd-code
        :redirect_uri="redirectUri"
        :scanTransferEvent="eventTypeTransfer[eventType]"
        :successFn="handleSuccess"
    ></dd-code>
</template>
<script>
import DdCode from '@/component/app/Dingding.vue';
import { observer } from 'mobx-vue';
import clientConfig from '@client/config';
const clientConfigEnv = clientConfig.env[process.env.NODE_ENV];
export default observer({
    name: 'app-security-center-dingding',
    components: {
        DdCode,
    },
    data() {
        return {
            eventTypeTransfer: {
                'account-bind': 'ding-talk-bind',
                'account-unbind': 'ding-talk-unbind',
            },
        };
    },
    computed: {
        redirectUri() {
            return `${clientConfigEnv.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/${this.eventType}/ding-talk/${clientConfigEnv.VUE_APP_DD_CODE_APPID}/${this.accountId}`;
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
