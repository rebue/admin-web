<template>
    <div>
        <wx-login-code :option="option" v-if="false"></wx-login-code>
    </div>
</template>
<script>
import WxLoginCode from './WXLoginCode.vue';
import request from '@/util/request';

export default {
    name: 'app-security-center-wechat',
    components: {
        WxLoginCode,
    },
    data() {
        return {
            option: {
                self_redirect: false,
                appid: process.env.VUE_APP_VX_CODE_APPID,
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent('https://khadmin.cocmis.cn/host/pcLogin?type=wxredirect'),
                state: Math.ceil(Math.random() * 1000),
                style: 'black',
                href:
                    'data:text/css;base64,IGJvZHkgewogICAgIGhlaWdodDogYXV0bzsKIH0KIC5pbXBvd2VyQm94IC5xcmNvZGUgewogICAgaGVpZ2h0OiBhdXRvOwogICAgd2lkdGg6IGF1dG87CiAgICBtYXgtd2lkdGg6IDEwMCU7CiAgICBtYXJnaW46IDA7CiAgICBib3JkZXI6IG5vbmU7Cn0=',
                // href: 'data:text/css;base64,Ym9keXsKICAgIGhlaWdodDogMjkwcHg7CiAgICBkaXNwbGF5OiBmbGV4OwogICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwp9Ci5pbXBvd2VyQm94IC5zdGF0dXNfYnJvd3NlcnsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnFyY29kZXsKICAgIGhlaWdodDogMjQwcHg7CiAgICB3aWR0aDogMjQwcHg7CiAgICBtYXJnaW46IDA7CiAgICBib3JkZXI6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnRpdGxlewpkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94IC5pbmZvewp3aWR0aDogMTAwJTsKfQ==',
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
            const redirectUri = `${process.env.VUE_APP_VX_REDIRECT_URL}/orp-svr/orp/get-user-info/wechat-open/${process.env.VUE_APP_VX_CODE_APPID}`;
            return request
                .get({
                    url: `/orp-svr/orp/get-auth-url/wechat-open/${process.env.VUE_APP_VX_CODE_APPID}`,
                    params: {
                        redirectUri,
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
