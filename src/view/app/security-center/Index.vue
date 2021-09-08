<template>
    <a-card class="security-center-card">
        <a-tabs tab-position="left">
            <a-tab-pane key="mobile" tab="手机号绑定">
                <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                    <a-form-model-item key="mobile" label="手机号" prop="mobile">
                        <a-input v-autofocus v-model.trim="model.mobile" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item key="verifyCode" label="验证码" prop="verifyCode">
                        <a-input v-autofocus v-model.trim="model.verifyCode" placeholder="" />
                        <a-button type="primary" @click="submit">获取验证码</a-button>
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 13, offset: 7 }">
                        <a-button type="primary" native-type="submit" @click="submit">确认绑定</a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-tab-pane>
            <a-tab-pane key="wechat" tab="微信绑定"> </a-tab-pane>
            <a-tab-pane key="dingding" tab="钉钉绑定"> </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script>
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { racAccountApi } from '@/api/Api';

export default {
    name: 'app-security-center-index',
    components: {},
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            accountStore,
            account: {},
            //form表单
            model: {
                mobile: '',
                verifyCode: '',
            },
            rules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur', transform: val => val.trim() }],
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
        };
    },
    methods: {
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
        submit() {
            console.log('--submit');
        },
    },
    watch: {
        accountStore: {
            handler(val, old) {
                // 用observer包裹，为啥只执行一次。
                // accountStore是异步获取的，放在mounted会有执行顺序问题，所以放在watch
                if (val && val.accountId) {
                    racAccountApi.getById(val.accountId).then(ro => {
                        this.account = ro.extra.one;
                    });
                }
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>
<style scoped>
.security-center-card {
}
</style>
