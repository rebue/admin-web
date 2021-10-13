<template>
    <a-spin :spinning="loading">
        <a-form-model ref="userForm" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="姓名" prop="realName" key="realName">
                <a-input v-model.trim="model.realName" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="身份证号" prop="idCard" key="idCard">
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
import { isIdCard, isPhone, isEmail } from '@/util/validator';

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
        this.api = racUserApi;
        return {
            editFormType: EditFormTypeDic.Add,
            model: {
                realName: '',
                idCard: '',
                mobile: '',
                email: '',
            },
            rules: {
                realName: [
                    { required: true, message: '请输入姓名', trigger: 'blur', transform: val => val && val.trim() },
                ],
                idCard: [
                    {
                        required: true,
                        message: '请输入身份证号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (!isIdCard(value)) {
                                callback(new Error('身份证号不合法'));
                                return false;
                            }
                            callback();
                        },
                    },
                ],
                mobile: [
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
                email: [
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isEmail(value)) {
                                    callback(new Error('电子邮箱不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
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
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        return this.api
                            .add({ ...this.model })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                                this.closeDialog && this.closeDialog(); //针对弹窗
                            })
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        return this.api
                            .modify({ ...this.model })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                                this.closeDialog && this.closeDialog(); //针对弹窗
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
