<template>
    <div class="ding-body">
        <a-spin :spinning="loading">
            <dd-login-code :option="option" v-if="goto && !loginTmpCodeUrl"></dd-login-code>
            <iframe :src="loginTmpCodeUrl" frameborder="0" v-if="loginTmpCodeUrl" width="0" height="0"></iframe>
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
import { accountStore } from '@/store/Store';
import DdLoginCode from './DDLoginCode.vue';
import request from '@/util/request';
import { when } from 'mobx';
import { observer } from 'mobx-vue';
export default observer({
    name: 'app-security-center-dingding',
    components: {
        DdLoginCode,
    },
    data() {
        return {
            accountStore,
            goto: '',
            loginTmpCodeUrl: '',
            loading: false,
            status: '',
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
        when(
            () => this.accountStore && this.accountStore.accountId,
            () => {
                console.log('----this.accountStore.accountId', this.accountStore.accountId);
                this.getQrcode();
            }
        );

        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', this.handleMessage, false);
        } else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', this.handleMessage);
        }
    },
    methods: {
        ok() {
            console.log('---------submit');
            this.callback && this.callback();
            this.closeDialog();
        },
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
                if (event.data.event === 'ding-talk-bind' || event.data.event === 'ding-talk-unbind') {
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
            // 微信扫码点击登录后跳转到的中转页面
            // http://www.abc.com/admin-web/#/scanTransfer 映射到 http://172.20.10.44:13080/admin-web/#/scanTransfer
            // const redirectUri = `${process.env.VUE_APP_DD_REDIRECT_URL}${process.env.VUE_APP_PUBLIC_PATH}%23/scanTransfer`;
            const callbackUrl = encodeURIComponent(
                `${location.origin}${process.env.VUE_APP_PUBLIC_PATH}#/scanTransfer`
            );
            const redirectUri = `${process.env.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/${this.eventType}/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}/${this.accountStore.accountId}?callbackUrl=${callbackUrl}`;
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
        tryAgain() {
            this.goto = null;
            this.loginTmpCodeUrl = '';
            this.status = '';
            this.getQrcode();
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
