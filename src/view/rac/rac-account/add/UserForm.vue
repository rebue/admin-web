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
            source: {},
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
                            if (value === this.source.idCard) {
                                // 没有改动
                                callback();
                                return;
                            }
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
                                if (value === this.source.mobile) {
                                    // 没有改动
                                    callback();
                                    return;
                                }
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
                                if (value === this.source.email) {
                                    // 没有改动
                                    callback();
                                    return;
                                }
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
                        this.source = { ...ro.extra.one };
                        this.$emit('update:model', ro.extra.one);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        ok(e, successFn) {
            if (this.editFormType === EditFormTypeDic.Add) {
                this.loading = true;
                this.$refs.userForm.validate(valid => {
                    if (valid) {
                        return this.api
                            .add({ ...this.model })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
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
            } else if (this.editFormType === EditFormTypeDic.Modify) {
                this.update(e, successFn);
            }
        },
        update(e, successFn) {
            //检查哪几个字段更改了
            const myset = new Set();
            for (const key in this.model) {
                if (this.model[key] !== this.source[key]) {
                    myset.add(key);
                }
            }
            if (myset.size) {
                const myarr = Array.from(myset);
                //只校验改变的字段
                this.$refs.userForm.validateField(myarr, errorMessage => {
                    console.log('--errorMessage', errorMessage);
                    if (!errorMessage) {
                        // 必传字段
                        const data = {
                            id: this.model.id,
                        };
                        // 只提交改变的的字段
                        myarr.forEach(key => {
                            data[key] = this.model[key];
                        });
                        this.loading = true;
                        return this.api
                            .modify(data)
                            .then(ro => {
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                                this.closeDialog && this.closeDialog(); //针对弹窗
                            })
                            .finally(() => (this.loading = false));
                    }
                });
            } else {
                this.closeDialog && this.closeDialog(); //针对弹窗
            }
        },
    },
};
</script>
