<template>
    <div id="dd_login_container"></div>
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
                id: 'dd_login_container', //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
                goto: '', //请参考注释里的方式
                style: '',
                width: '',
                height: '',
            },
        };
    },
    mounted() {
        const script = document.createElement('script');
        script.src = '//g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js';
        script.onload = () => {
            window.DDLogin({
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
#dd_login_container {
    display: flex;
    justify-content: center;
}
</style>
