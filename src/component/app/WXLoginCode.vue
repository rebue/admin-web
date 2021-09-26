<template>
    <div class="wx_login_box">
        <div id="wx_login_container"></div>
        <div class="refresh-box" @click="init">
            <!-- <a-button type="link" icon="sync" size="small">刷新</a-button> -->
        </div>
    </div>
    

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
        script.src = `${location.protocol}//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js`;
        script.onload = () => {
           this.init()
        };
        document.body.appendChild(script);
    },
    methods:{
        init(){
            new window.WxLogin({
                ...this.defaultOption,
                ...this.option,
            });
            document.getElementsByTagName('iframe')[0].width = this.width || '300';
            document.getElementsByTagName('iframe')[0].height = this.height || '400';
        }
    }
};
</script>
<style scoped>
.wx_login_box {
    position: relative;
}
.refresh-box {
    position: absolute;
    font-size: 14px;
    top: 257px;
    left: 0;
    right: 0;
    height: 30px;
    color: transparent;
    cursor: pointer;
}
#wx_login_container {
    display: flex;
    justify-content: center;
}
.refresh-box >>> .ant-btn > .anticon + span, .refresh-box >>> .ant-btn > span + .anticon {
    margin-left: 0;
}
</style>
