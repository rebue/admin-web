<template>
    <div id="wx_login_container"></div>
</template>
<script>
export default {
    props: {
        width: String,
        height: String,
        option: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            defaultOption: {
                self_redirect: false,
                id: 'wx_login_container',
                appid: '',
                scope: '',
                redirect_uri: '',
                state: '',
                style: 'black',
                href: '',
            },
        };
    },
    mounted() {
        const script = document.createElement('script');
        script.src = '//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
        script.onload = () => {
            new window.WxLogin({
                ...this.defaultOption,
                ...this.option,
            });
            // window.requestAnimationFrame(()=>{
            document.getElementsByTagName('iframe')[0].width = this.width || '300';
            document.getElementsByTagName('iframe')[0].height = this.height || '400';
            // })
        };
        document.body.appendChild(script);
    },
};
</script>
<style scoped>
#wx_login_container {
    display: flex;
    justify-content: center;
}
</style>
