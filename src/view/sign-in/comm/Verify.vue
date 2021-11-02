<template>
    <Verify
        ref="verify"
        mode="fixed"
        :captcha-type="'blockPuzzle'"
        :img-size="{ width: '400px', height: '200px' }"
        @success="success"
        @error="error"
    />
</template>
<script>
import Verify from '@/component/rebue/verifition/Verify.vue';
export default {
    components: {
        Verify,
    },
    methods: {
        success(res) {
            this.handleVerifySuccess(res);
            this.$nextTick(() => {
                this.closeDialog();
            });
        },
        error() {
            this.handleVerifyError();
        },
    },
};
</script>
