<template>
    <div class="wechat-body">
        <a-spin :spinning="loading">
            <wx-login-code :option="option" v-if="option.state && !status"></wx-login-code>
            <a-result status="success" :title="statusMsg" v-if="status == 'success'"> </a-result>
            <a-result status="error" :title="statusMsg" v-if="status == 'error'"> </a-result>
        </a-spin>
    </div>
</template>
<script>
import WxLoginCode from '@/component/app/WXLoginCode.vue';
import request from '@/util/request';
import { observer } from 'mobx-vue';
import { getQueryVariable } from '@/util/common';
import clientConfig from '@client/config';
const clientConfigEnv = clientConfig.env[process.env.NODE_ENV];
export default observer({
    name: 'wechat-code',
    components: {
        WxLoginCode,
    },
    props: {
        redirect_uri: {
            type: String,
            required: true,
        },
        scanTransferEvent: {
            type: String,
            required: true,
        },
        successFn: {
            type: Function,
        },
        successMsg: {
            type: String,
        },
        errorMsg: {
            type: String,
        },
    },
    data() {
        return {
            state: '',
            loading: false,
            status: '',
            statusMsg: '',
        };
    },
    computed: {
        redirectUri() {
            // ***** redirect
            const callbackUrl = encodeURIComponent(`${location.origin}${process.env.VUE_APP_PUBLIC_PATH}/scanTransfer`);
            return `${this.redirect_uri}?callbackUrl=${callbackUrl}`;
        },
        option() {
            return {
                self_redirect: true,
                appid: clientConfigEnv.VUE_APP_WX_CODE_APPID,
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent(this.redirectUri),
                state: this.state,
                style: 'black',
                href: `${location.origin}${process.env.VUE_APP_PUBLIC_PATH}/css/wechat-login.css`,
            };
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.getQrcode();
        });

        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', this.handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', this.handleMessage);
        }
    },
    methods: {
        handleMessage(event) {
            this.loading = true;
            const origin = event.origin;
            console.log('---------origin', event.origin);
            if (origin == location.origin) {
                console.log('---------接收到子窗口的新消息了', event.data);
                if (event.data.event === this.scanTransferEvent) {
                    const { result, msg, url } = event.data;
                    if (result === 'success') {
                        this.status = result;
                        this.statusMsg = this.successMsg || msg;
                        // ***** successFn
                        this.successFn && this.successFn(event.data);
                    } else if (result === 'error') {
                        this.status = result;
                        this.statusMsg = this.errorMsg || msg;
                    }
                }
                this.loading = false;
            }
        },
        getQrcode() {
            this.loading = true;
            request
                .get({
                    url: `/orp-svr/orp/get-auth-url/wechat-open/${clientConfigEnv.VUE_APP_WX_CODE_APPID}`,
                    params: {
                        redirectUri: this.redirectUri,
                    },
                })
                .then(ro => {
                    console.log('---------res', ro.detail);
                    // this.goto = ro.detail.replace(/(^https)/,'http')
                    // console.log('--thisgoto', this.goto)
                    this.state = getQueryVariable(ro.detail, 'state').replace('#wechat_redirect', '');
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    beforeDestroy() {
        console.log('---sss');
        if (typeof window.addEventListener != 'undefined') {
            window.removeEventListener('message', this.handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.detachEvent('onmessage', this.handleMessage);
        }
    },
});
</script>
<style scoped>
.wechat-body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
