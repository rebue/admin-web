<template>
    <div class="ding-body">
        <a-spin :spinning="loading">
            <dd-login-code :option="option" v-if="goto && !status"></dd-login-code>
            <iframe :src="loginTmpCodeUrl" frameborder="0" v-if="loginTmpCodeUrl" width="0" height="0"></iframe>
            <a-result status="success" :title="statusMsg" v-if="status == 'success'"> </a-result>
            <a-result status="error" :title="statusMsg" v-if="status == 'error'"> </a-result>
        </a-spin>
    </div>
</template>
<script>
import DdLoginCode from '@/component/app/DDLoginCode.vue';
import request from '@/util/request';
import { observer } from 'mobx-vue';
export default observer({
    name: 'app-security-center-dingding',
    components: {
        DdLoginCode,
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
            goto: '',
            loginTmpCodeUrl: '',
            loading: false,
            status: '',
            statusMsg: '',
        };
    },
    computed: {
        option() {
            return {
                goto: encodeURIComponent(this.goto),
                style: 'border:none;background-color:#FFFFFF;',
                width: 395,
                height: 290,
            };
        },
    },
    mounted() {
        this.getQrcode();
        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', this.handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', this.handleMessage);
        }
    },
    methods: {
        handleMessage(event) {
            const origin = event.origin;
            console.log('---------origin', event.origin);
            if (origin == 'https://login.dingtalk.com') {
                //判断是否来自ddLogin扫码事件。
                const loginTmpCode = event.data;
                //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
                // window.open(`${this.goto}&loginTmpCode=${loginTmpCode}`)

                this.loginTmpCodeUrl = `${this.goto}&loginTmpCode=${loginTmpCode}`;
                this.loading = true;
                console.log('---------loginTmpCode', loginTmpCode, this.loginTmpCodeUrl);
            } else if (origin == location.origin) {
                console.log('---------接收到子窗口的新消息了', event.data);
                // ding-talk-sign-in
                if (event.data.event === this.scanTransferEvent) {
                    const { result, msg, url } = event.data;
                    if (result === 'success') {
                        this.status = result;
                        this.statusMsg = this.successMsg || msg;
                        // window.location.replace(url);
                        this.successFn && this.successFn(event.data)
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
            const callbackUrl = encodeURIComponent(`${location.origin}${process.env.VUE_APP_PUBLIC_PATH}/scanTransfer`);
            
            const redirectUri = `${this.redirect_uri}?callbackUrl=${callbackUrl}`;
            request
                .get({
                    url: `/orp-svr/orp/get-auth-url/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`,
                    params: {
                        redirectUri: redirectUri,
                    },
                })
                .then(ro => {
                    console.log('---------res', ro.detail);
                    this.goto = ro.detail; // 需要编码，获取到内嵌扫码的goto结构路径，后端生成state
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
.ding-body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}
</style>
