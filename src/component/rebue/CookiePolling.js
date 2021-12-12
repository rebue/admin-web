import { racMenuAction } from '@/action/Action';
let interval = 0
// 轮询加载
const loopFetch = function() {
    racMenuAction.refreshAccountInfo();
    return setTimeout(loopFetch, process.env.VUE_APP_COOKIE_LOOP * 60 * 1000);
}
export default {
    mounted() {
        interval = loopFetch()
    },
    beforeDestroy(){
        if(interval) {
            clearInterval(interval)
        }
    }
};