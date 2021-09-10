<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <a-form-model-item key="mobile" label="手机号" prop="mobile">
            <a-input v-model.trim="model.mobile" placeholder="" />
        </a-form-model-item>
        <a-form-model-item key="newMobile" label="新手机号" prop="mobile" v-if="editFormType === 'modify'">
            <a-input v-model.trim="model.newMobile" placeholder="" />
        </a-form-model-item>
        <a-form-model-item key="verifyCode" label="验证码" prop="verifyCode">
            <div class="code">
                <a-input class="code-input" v-model.trim="model.verifyCode" placeholder="" />
                <a-button key="btn" type="primary" @click="getCode" :disabled="isCodeLoading" v-if="!isCodeLoading"
                    >获取验证码</a-button
                >
                <a-button key="s" v-else>{{ second }}s</a-button>
            </div>
        </a-form-model-item>
        <!-- <a-form-model-item :wrapper-col="{ span: 13, offset: 7 }">
            <a-button type="primary" native-type="submit" @click="ok">提交</a-button>
        </a-form-model-item> -->
    </a-form-model>
</template>
<script>
import { isPhone } from '@/util/validator';
const SECOND = 5;
export default {
    name: 'app-security-center-phone',
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
            //form表单
            model: {
                mobile: '',
                newMobile: '',
                verifyCode: '',
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur', transform: val => val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isPhone(value)) {
                                    callback(new Error('手机号不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
                newMobile: [
                    {
                        required: this.editFormType === 'modify',
                        message: '请输入新手机号',
                        trigger: 'blur',
                        transform: val => val.trim(),
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isPhone(value)) {
                                    callback(new Error('新手机号不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
            second: SECOND,
            isCodeLoading: false,
        };
    },
    methods: {
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求
                    //then
                    this.callback && this.callback();
                    this.closeDialog();
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        getCode() {
            //then
            this.isCodeLoading = true;
            this.countDown(this.second, val => {
                this.second = val;
                if (val === 0) {
                    this.second = SECOND;
                    this.isCodeLoading = false;
                }
            });
        },
        countDown(second, cb, immediate = false) {
            if (immediate) {
                if (second == 0) {
                    return;
                }
                second = second - 1;
                cb && cb(second);
            }
            setTimeout(() => {
                this.countDown(second, cb, true);
            }, 1000);
        },
    },
};
</script>
<style scoped>
.code {
    display: flex;
}
.code-input {
    margin-right: 10px;
}
</style>
