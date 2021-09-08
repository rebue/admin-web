<template>
    <a-spin :spinning="loading">
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="用户名" prop="realName" key="realName">
                <a-input v-model.trim="model.realName" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="身份证信息" prop="idCard" key="idCard">
                <a-input v-model.trim="model.idCard" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="手机号码" prop="mobile" key="mobile">
                <a-input v-model.trim="model.mobile" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="电子邮箱" prop="email" key="email">
                <a-input v-model.trim="model.email" placeholder="" />
            </a-form-model-item>
            <!-- <a-form-model-item :wrapperCol="{span: 13, offset: 7}">
                <a-button type="primary" @click="ok">提交</a-button>
            </a-form-model-item> -->
        </a-form-model>
    </a-spin>
</template>
<script>
import { racUserApi } from '@/api/Api';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
export default {
    props: {
        editFormType: {
            type: String,
            default: () => EditFormTypeDic.Add,
        },
    },
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
        this.api = racUserApi;
        return {
            model: {
                realName: '',
                idCard: '',
                mobile: '',
                email: '',
            },
            rules: {
                realName: [{ required: true, message: '请输入用户名', trigger: 'blur', transform: val => val.trim() }],
            },
            loading: false,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.editFormType === EditFormTypeDic.Modify) {
                this.loading = true;
                this.api
                    .getById(this.model.id)
                    .then(ro => {
                        this.model = ro.extra.one;
                        this.$emit('update:model', ro.extra.one);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        ok(e, successFn) {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        return this.api
                            .add(this.model)
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                            })
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        return this.api
                            .modify(this.model)
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                            })
                            .finally(() => (this.loading = false));
                    }
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
