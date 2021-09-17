<template>
    <div>
        扫码中转窗口
    </div>
</template>
<script>
export default {
    mounted() {
        // query
        // event
        // result: 'success' || 'error'
        console.log('---------iframe 302', location.href, this.$route.query);
        this.$nextTick(() => {
            window.parent.postMessage(
                {
                    ...this.$route.query,
                },
                location.origin
            );
        });
    },
};
</script>
