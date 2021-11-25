<template>
    <div class="scanCodeIndex">
        <div class="codeBox">
            <div class="topLogo">
                <div class="imgStyle">
                    <img v-if="codeType == '微信'" src="./images/weixin.png" alt="" />
                    <img v-else src="./images/dingd.png" alt="" />
                </div>
                <div class="textStyle">
                    <div>{{ modelVlaue }}</div>
                    <div>登录统一身份认证平台</div>
                </div>
            </div>
            <div class="loginBox">
                <!-- <div id="login_container"></div> -->
                <scan-wechat :clientId="clientId" v-if="codeType == '微信'" />
                <scan-dingding :clientId="clientId" v-else />
            </div>
            <!-- <div class="vxTips" v-if="codeType == '微信'">
                请使用微信扫描二维码登录
                <div class="iconCss" @click="refreshClick()"><a-icon type="sync" class="icon" />刷新</div>
            </div> -->
        </div>
    </div>
</template>
<script>
import ScanWechat from './ScanWechat.vue';
import ScanDingding from './ScanDingding.vue';
export default {
    components: {
        ScanWechat,
        ScanDingding,
    },
    props: {
        codeType: {
            type: String,
        },
    },
    data() {
        return {
            modelVlaue: '手机微信扫码登录',
            clientId: sessionStorage.getItem('auth_info_clientId'),
        };
    },
    mounted() {
        this.modelVlaue = this.codeType == '微信' ? '手机微信扫码登录' : '手机钉钉扫码登录';
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
