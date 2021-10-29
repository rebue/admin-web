<template>
    <a-tabs default-active-key="1" @change="callback" class="tabs">
        <a-tab-pane key="1" tab="账号密码登录">
            <div v-if="show" class="sign">
                <psw-form />
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="手机短信登录">
            <div v-if="!show" class="sign phone-sign">
                <phone-form />
            </div>
        </a-tab-pane>
    </a-tabs>
</template>
<script>
import PswForm from './Password.vue';
import PhoneForm from './Phone.vue';
export default {
    components: {
        PswForm,
        PhoneForm,
    },
    props: {},
    data() {
        return {
            show: true,
            tabKey: 1,
        };
    },
    methods: {
        //TAB切换事件
        callback(key) {
            this.show = !this.show;
            this.tabKey = key; //key值
        },
    },
};
</script>
<style scoped>
.tabs >>> .ant-tabs-bar {
    margin-bottom: 32px;
}
.tabs >>> .ant-tabs-nav {
    width: 100%;
}
.tabs >>> .ant-tabs-nav > div {
    width: 100%;
    display: flex;
}
.tabs >>> .ant-tabs-nav .ant-tabs-tab {
    flex: 1;
    text-align: center;
    font-size: 20px;
}
.input >>> .ant-input {
    height: 56px;
}
.input >>> .ant-input:not(:first-child) {
    padding-left: 40px;
}
.sign-btn {
    height: 56px;
    line-height: 56px;
    font-size: 20px;
}
.remenber {
    margin: 20px 0;
    float: right;
}
.phone-sign .ant-input-lg {
    height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection__rendered {
    line-height: 56px;
}
.phone-sign >>> .ant-select-lg .ant-select-selection--single {
    height: 56px;
}
.comFromStyle {
    position: relative;
}
.code-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #7aa8f2;
    cursor: pointer;
}
</style>
