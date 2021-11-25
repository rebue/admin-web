<template>
    <div class="wechat-body">
        <a-spin :spinning="loading">
            <wx-login-code :option="option" v-if="option.state && !status"></wx-login-code>
            <!-- <iframe :src="goto" frameborder="0" v-if="goto" width="300" height="400"></iframe> -->
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
    name: 'sign-in-unified-wechat',
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
            return `${clientConfigEnv.VUE_APP_WX_REDIRECT_URL}/orp-svr/orp/sign-in-by-code/wechat-open/${
                clientConfigEnv.VUE_APP_WX_CODE_APPID
            }/${sessionStorage.getItem('auth_info_clientId')}?callbackUrl=${callbackUrl}`;
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
                if (event.data.event === 'wechat-open-sign-in') {
                    const { result, msg, url } = event.data;
                    if (result === 'success') {
                        this.status = result;
                        window.location.replace(url);
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
