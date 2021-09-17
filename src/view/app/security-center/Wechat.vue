<template>
    <div class="wechat-body">
        <a-spin :spinning="loading">
            <wx-login-code :option="option" v-if="state && !status"></wx-login-code>
            <a-result status="success" :title="title + '成功'" v-if="status == 'success'">
                <template #extra>
                    <a-button key="cancel" type="primary" @click="ok">
                        关闭
                    </a-button>
                </template>
            </a-result>
            <a-result status="error" :title="title + '失败'" v-if="status == 'error'">
                <template #extra>
                    <a-button key="cancel" type="primary" @click="closeDialog">
                        关闭
                    </a-button>
                    <!-- <a-button key="cancel" type="primary" @click="tryAgain">
                        再试一次
                    </a-button> -->
                </template>
            </a-result>
        </a-spin>
    </div>
</template>
<script>
import WxLoginCode from './WXLoginCode.vue';
import request from '@/util/request';
// import { when } from 'mobx';
import { observer } from 'mobx-vue';
const getQueryVariable = function(url, variable) {
    const query = url.split('?')[1];
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
};
export default observer({
    name: 'app-security-center-wechat',
    components: {
        WxLoginCode,
    },
    data() {
        return {
            state: '',
            loading: false,
            status: '',
        };
    },
    computed: {
        redirectUri() {
            const callbackUrl = encodeURIComponent(
                `${location.origin}${process.env.VUE_APP_PUBLIC_PATH}#/scanTransfer`
            );
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
        ok() {
            console.log('--submit');
            //发请求
            //then
            this.callback && this.callback();
            this.closeDialog();
        },
        handleMessage(event) {
            this.loading = true;
            const origin = event.origin;
            console.log('---------origin', event.origin);
            if (origin == location.origin) {
                console.log('---------接收到子窗口的新消息了', event.data);
                if (event.data.event === 'wechat-open-bind' || event.data.event === 'wechat-open-unbind') {
                    const { result } = event.data;
                    if (result === 'success') {
                        this.status = result;
                    } else if (result === 'error') {
                        this.status = result;
                    }
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
                    // window.open(ro.detail);
                    this.state = getQueryVariable(ro.detail, 'state');
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
