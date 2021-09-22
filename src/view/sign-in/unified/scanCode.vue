<template>
    <div class="scanCodeIndex">
        <div class="munberLongin" @click="numberLoginClick()">账号登录</div>
        <div class="codeBox">
            <div class="topLogo">
                <div class="imgStyle">
                    <img v-if="codeType == '微信'" src="./weixin.png" alt="" />
                    <img v-else src="./dingd.png" alt="" />
                </div>
                <div class="textStyle">
                    <div>{{ modelVlaue }}</div>
                    <div>登录统一身份认证平台</div>
                </div>
            </div>
            <div class="loginBox">
                <div id="login_container"></div>
            </div>
            <div class="vxTips" v-if="codeType == '微信'">
                请使用微信扫描二维码登录
                <div class="iconCss" @click="refreshClick()"><a-icon type="sync" class="icon" />刷新</div>
            </div>
        </div>
    </div>
</template>
<script src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></script>
<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
import request from '@/util/request';
import { accountStore } from '@/store/Store';
export default {
    props: {
        codeType: {
            type: String,
        },
        numberLoginShow: {
            type: Function,
        },
    },
    data() {
        return {
            modelVlaue: '手机微信扫码登录',
            accountStore,
        };
    },
    mounted() {
        var _this = this;
        _this.modelVlaue = _this.codeType == '微信' ? '手机微信扫码登录' : '手机钉钉扫码登录';
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src =
            _this.codeType == '微信'
                ? 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
                : 'https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js';
        document.body.appendChild(s);
        s.onload = function() {
            _this.codeType == '微信' ? _this.wxLoginInit() : _this.ddLoginInit();
        };
    },
    methods: {
        //点击账号登录事件
        numberLoginClick() {
            this.numberLoginShow();
        },
        // 钉钉扫码接口
        ddLoginInit() {
            const callbackUrl = encodeURIComponent(
                `${location.origin}${process.env.VUE_APP_PUBLIC_PATH}#/scanTransfer`
            );
            const redirectUri = `${process.env.VUE_APP_DD_REDIRECT_URL}/orp-svr/orp/sign-in-by-code/ding-talk/${process.env.VUE_APP_DD_CODE_APPID}/login-marge`;
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
                    let goto = encodeURIComponent(this.goto);
                    let obj = DDLogin({
                        id: 'login_container', //对应刚刚的div盒子id
                        goto: goto,
                        style: 'border:none;background-color:#FFFFFF;',
                        width: 395,
                        height: 290,
                    });
                    if (typeof window.addEventListener != 'undefined') {
                        window.addEventListener('message', this.handleMessage, false);
                    } else if (typeof window.attachEvent != 'undefined') {
                        window.attachEvent('onmessage', this.handleMessage);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });

            // let url = encodeURIComponent('http://127.0.0.1:13080/admin-web/#/sign-in/unified'); //此处url写钉钉回调地址
            // let appid = process.env.VUE_APP_DD_CODE_APPID; //填写自己在钉钉开发者平台配的appid

            // let handleMessage = event => {
            //     let origin = event.origin;
            //     if (origin == 'https://login.dingtalk.com') {
            //         let loginTmpCode = event.data;
            //         window.location.href =
            // `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`;
            //     }
            // };
        },
        handleMessage(event) {
            const origin = event.origin;
            console.log('---------origin', event);
            if (origin == 'https://login.dingtalk.com') {
                //判断是否来自ddLogin扫码事件。
                const loginTmpCode = event.data;
                //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
                // window.open(`${this.goto}&loginTmpCode=${loginTmpCode}`)

                this.loginTmpCodeUrl = `${this.goto}&loginTmpCode=${loginTmpCode}`;
                window.open(this.loginTmpCodeUrl);
                this.loading = true;
                console.log('---------loginTmpCode', loginTmpCode, this.loginTmpCodeUrl);
            }
        },
        //微信扫码功能
        wxLoginInit() {
            const obj = new WxLogin({
                self_redirect: false,
                id: 'login_container',
                appid: process.env.VUE_APP_WX_CODE_APPID,
                scope: 'snsapi_login',
                redirect_uri: encodeURIComponent('https://khadmin.cocmis.cn/host/pcLogin?type=wxredirect'),
                state: Math.ceil(Math.random() * 1000),
                style: 'black',
                href:
                    'data:text/css;base64,Ym9keXsKICAgIGhlaWdodDogMjkwcHg7CiAgICBkaXNwbGF5OiBmbGV4OwogICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwp9Ci5pbXBvd2VyQm94IC5zdGF0dXNfYnJvd3NlcnsKICAgIGRpc3BsYXk6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnFyY29kZXsKICAgIGhlaWdodDogMjQwcHg7CiAgICB3aWR0aDogMjQwcHg7CiAgICBtYXJnaW46IDA7CiAgICBib3JkZXI6IG5vbmU7Cn0KLmltcG93ZXJCb3ggLnRpdGxlewpkaXNwbGF5OiBub25lOwp9Ci5pbXBvd2VyQm94IC5pbmZvewp3aWR0aDogMTAwJTsKfQ==',
            });
        },
        //刷新微信二维码
        refreshClick() {
            this.wxLoginInit();
        },
    },
};
</script>
<style lang="less" scoped>
.scanCodeIndex {
    width: 100%;
    height: 290px;
    position: relative;
    .munberLongin {
        position: absolute;
        top: -40px;
        right: -13px;
        font-size: 16px;
        font-weight: 400;
        color: #7aa8f2;
        cursor: pointer;
    }
    .codeBox {
        width: 100%;
        position: relative;
        .topLogo {
            width: 100%;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 16px;
            .imgStyle {
                width: 50px;
                height: 50px;
                margin-right: 17px;
            }
            .textStyle {
                div:first-child {
                    font-size: 20px;
                    font-weight: 400;
                    color: #212122;
                }
                div:last-child {
                    font-size: 16px;
                    font-weight: 400;
                    color: #a5a5a5;
                }
            }
        }
        #login_container {
            width: 100%;
            height: 290px;
            display: flex;
            justify-content: center;
        }
        .vxTips {
            position: absolute;
            left: 23%;
            bottom: -1%;
            color: #898d90;
            font-size: 14px;
            .iconCss {
                color: #38adff;
                cursor: pointer;
                float: right;
                margin-left: 5px;
                .icon {
                    margin-right: 2px;
                }
            }
        }
    }
}
</style>
