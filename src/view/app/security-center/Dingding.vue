<template>
    <div>
        <dd-login-code :option="option" v-if="false"></dd-login-code>
    </div>
</template>
<script>
import DdLoginCode from './DDLoginCode.vue';
import request from '@/util/request';
export default {
    name: 'app-security-center-dingding',
    components: {
        DdLoginCode,
    },
    data() {
        // const url = encodeURIComponent(`${location.origin}/orp-svr/orp/get-user-info/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`)
        const url = encodeURIComponent(
            `${process.env.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/get-user-info/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`
        ); //此处url写钉钉回调地址
        const goto = encodeURIComponent(
            `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${process.env.VUE_APP_DD_CODE_APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
        );
        return {
            option: {
                goto: goto,
                style: 'border:none;background-color:#FFFFFF;',
                width: 395,
                height: 290,
            },
        };
    },
    mounted() {
        this.getQrcode();
    },
    methods: {
        ok() {
            console.log('--submit');
            //发请求
            //then
            this.callback && this.callback();
            this.closeDialog();
        },
        getQrcode() {
            const redirectUri = `${process.env.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/get-user-info/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`;
            // const redirectUri = `${location.origin}/orp-svr/orp/get-user-info/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`
            return request
                .get({
                    url: `/orp-svr/orp/get-auth-url/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}`,
                    params: {
                        redirectUri: redirectUri,
                    },
                })
                .then(ro => {
                    console.log('---res', ro.detail);
                    window.open(ro.detail);
                });
        },
    },
};
</script>
