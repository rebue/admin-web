<template>
    <div>
        <wx-login-code :option="option"></wx-login-code>
    </div>
</template>
<script>
import WxLoginCode from './WXLoginCode.vue';
export default {
    name: 'app-security-center-wechat',
    components: {
        WxLoginCode,
    },
    data() {
        return {
            option: {
                self_redirect: false,
                appid: 'wx25d6c6c863c8629a',
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
    methods: {
        ok() {
            console.log('--submit');
            //发请求
            //then
            this.callback && this.callback();
            this.closeDialog();
        },
    },
};
</script>
