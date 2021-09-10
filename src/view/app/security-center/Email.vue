<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <a-form-model-item key="email" label="邮箱" prop="email">
            <a-input v-model.trim="model.email" placeholder="" />
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import { isEmail } from '@/util/validator';
export default {
    name: 'app-security-center-email',
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
                email: '',
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur', transform: val => val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isEmail(value)) {
                                    callback(new Error('邮箱不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
            },
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
    },
};
</script>
