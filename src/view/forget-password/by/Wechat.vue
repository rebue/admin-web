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

export default observer({
    name: 'forget-password-by-wechat',
    components: {
        WxLoginCode,
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
            const callbackUrl = encodeURIComponent(`${location.origin}${process.env.VUE_APP_PUBLIC_PATH}/scanTransfer`);
            // 后端api?callbackUrl=
            return `${process.env.VUE_APP_WX_REDIRECT_URL}/orp-svr/orp/${this.eventType}/wechat-open/${process.env.VUE_APP_WX_CODE_APPID}/${this.accountId}?callbackUrl=${callbackUrl}`;
        },
        option() {
            return {
                self_redirect: true,
                appid: process.env.VUE_APP_WX_CODE_APPID,
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent(this.redirectUri),
                state: this.state,
                style: 'black',
                href: `${location.origin}${process.env.VUE_APP_PUBLIC_PATH}/css/wechat.css`,
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
                if (event.data.event === 'wechat-open-bind' || event.data.event === 'wechat-open-unbind') {
                    const { result, msg } = event.data;
                    if (result === 'success') {
                        this.status = result;
                        setTimeout(() => {
                            this.callback && this.callback();
                            this.closeDialog && this.closeDialog();
                        }, 1000);
                    } else if (result === 'error') {
                        this.status = result;
                    }
                    this.statusMsg = msg;
                }
                this.loading = false;
            }
        },
        getQrcode() {
            this.loading = true;
            request
                .get({
                    url: `/orp-svr/orp/get-auth-url/wechat-open/${process.env.VUE_APP_WX_CODE_APPID}`,
                    params: {
                        redirectUri: this.redirectUri,
                    },
                })
                .then(ro => {
                    console.log('---------res', ro.detail);
                    this.state = getQueryVariable(ro.detail, 'state').replace('#wechat_redirect', '');
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    beforeDestroy() {
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
