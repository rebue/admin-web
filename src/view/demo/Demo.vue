<template>
    <div>
        <div>
            {{ msg }}
        </div>
        <div>
            {{ accessToken }}
        </div>
    </div>
</template>

<script>
// http://127.0.0.1:10080/oap-svr/oidc/authorize?scope=openid&response_type=code&client_id=unified-auth&state=RECOMMENDED&redirect_uri=http%3A%2F%2F127.0.0.1%3A13080%2Fadmin-web%2F%23%2Fdemo
import request from '@/util/request';

export default {
    name: 'Demo',
    data() {
        return {
            msg: '',
            accessToken: '',
        };
    },
    created() {
        const code = this.getCode();
        if (code) {
            this.msg = 'code: ' + code;
        } else {
            this.msg = '无code参数';
            return;
        }

        const redirectUri = encodeURIComponent('http://127.0.0.1:13080/admin-web/#/demo');
        request
            .get({
                url: '/orp-svr/oidc/callback?code=' + code + '&redirectUri=' + redirectUri,
            })
            .then(result => {
                if (result.result === 1) {
                    this.accessToken = result.extra;
                }
            });
    },
    methods: {
        getCode() {
            const idx = window.location.href.indexOf('?');
            if (idx < 0) {
                return '';
            }
            const queryParams = window.location.href.split('?')[1].split('&');
            for (let i = 0; i < queryParams.length; ++i) {
                const kv = queryParams[i].split('=');
                if (kv[0] === 'code') {
                    return kv[1];
                }
            }
            return '';
        },
    },
};
</script>

<style scoped></style>
