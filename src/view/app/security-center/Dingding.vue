<template>
    <div>
        <dd-login-code :option="option"></dd-login-code>
    </div>
</template>
<script>
import DdLoginCode from './DDLoginCode.vue';
export default {
    name: 'app-security-center-dingding',
    components: {
        DdLoginCode,
    },
    data() {
        const url = encodeURIComponent('http://127.0.0.1:13080/admin-web/#/sign-in/unified'); //此处url写钉钉回调地址
        const appid = 'dinggm0fx8u7agmucbij'; //填写自己在钉钉开发者平台配的appid
        const goto = encodeURIComponent(
            `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
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
