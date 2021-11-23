export default {
    id: 'nnxy',
    name: '南宁学院',
    env: {
        development: {
            /* 微信的扫码登录redireact_url
            # 必须是https协议，保持和微信https协议统一
            # http站点下 使用iframe.src=https站点，https站点页面window.locattion=http接口，此时http接口会丢失已登录的http站点的cookie
            # 微信不是302回来是window.location回来，所以协议不同就丢了cookie
            # 目前是保持统一http协议就行，要么统一http, 要么统一https。wxlogin那个js库默认写了https, 所以保持和微信统一，redireact_url必须是https协议
            */
            VUE_APP_WX_REDIRECT_URL: 'https://auth.nnxy.edu.cn',

            // 微信的扫码登录appId
            VUE_APP_WX_CODE_APPID: 'wxbb5672e7fd568b0b',

            // 钉钉的扫码登录redireact_url
            VUE_APP_DD_REDIRECT_URL: '',

            // 钉钉的扫码登录appId
            VUE_APP_DD_CODE_APPID: '',

            // 平台/运营默认走oidc登录流程
            VUE_APP_LOGIN_BY_OIDC: true,
        },
        production: {
            // 微信的扫码登录redireact_url
            VUE_APP_WX_REDIRECT_URL: 'https://auth.nnxy.edu.cn',

            // 微信的扫码登录appId
            VUE_APP_WX_CODE_APPID: 'wxbb5672e7fd568b0b',

            // 钉钉的扫码登录redireact_url
            VUE_APP_DD_REDIRECT_URL: '',

            // 钉钉的扫码登录appId
            VUE_APP_DD_CODE_APPID: '',

            // 平台/运营默认走oidc登录流程
            VUE_APP_LOGIN_BY_OIDC: true,
        },
    },
};
