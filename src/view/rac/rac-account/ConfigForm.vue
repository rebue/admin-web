<template>
    <a-spin :spinning="loading">
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="配置" prop="content" key="content">
                <a-textarea :autoSize="true" v-model.trim="model.content" placeholder="" />
            </a-form-model-item>
        </a-form-model>
    </a-spin>
</template>
<script>
import { racAccountApi } from '@/api/Api';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

const separator = '\n';
export default {
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
        this.api = racAccountApi;
        return {
            editFormType: EditFormTypeDic.Add,
            model: {
                content: '',
            },
            rules: {
                content: [
                    { required: true, message: '请输入配置', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            loading: false,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.api.getNacosConfig().then(ro => {
                console.log('getNacosConfig', ro);
                this.model.content = ro.extra.join(separator);
            });
        },
        ok() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    return this.api
                        .setNacosConfig({
                            content: this.model.content.split(separator),
                        })
                        .then(ro => {
                            this.callback && this.callback(ro);
                            this.closeDialog && this.closeDialog(); //针对弹窗
                        })
                        .finally(() => (this.loading = false));
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
