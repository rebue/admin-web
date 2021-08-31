<template>
    <div>
        <div>
            登录成功
        </div>
    </div>
</template>

<script>
// http://127.0.0.1:13080/oap-svr/oidc/authorize?scope=openid&response_type=code&client_id=unified-auth&state=RECOMMENDED&redirect_uri=http%3A%2F%2F127.0.0.1%3A13080%2Forp-svr%2Foidc%2Fcallback
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
        console.log(111);
    },
    methods: {},
};
</script>

<style scoped></style>
