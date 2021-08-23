<template>
    <div>
        {{ msg }}
    </div>
</template>

<script>


export default {
    name: "Demo",
    data() {
        // http://localhost:10080/oap-svr/oidc/authorize?scope=openid&response_type=code&client_id=test1&state=RECOMMENDED&redirect_uri=http%3A%2F%2Flocalhost%3A13080%2Fadmin-web%2F%23%2Fdemo
        return {
            msg: ''
        }
    },
    created() {
        const code = this.getCode();
        if (code) {
            this.msg = 'code: ' + code;
        } else {
            this.msg = '无code参数';
            return;
        }
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
        }
    }
}
</script>

<style scoped>

</style>
