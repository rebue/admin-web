<template>
    <a-spin :spinning="loading">
        <a-row>
            <a-col :span="12">
                <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                    <a-form-model-item label="用户名" prop="realName" key="realName">
                        <a-input v-model.trim="model.realName" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item label="身份证信息" prop="idCard" key="idCard">
                        <a-input v-model.trim="model.idCard" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item :wrapperCol="{ span: 13, offset: 7 }">
                        <a-button type="primary" @click="ok">查询</a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-col>
            <a-col :span="12">
                <div v-if="detail.id">
                    <p>用户名: {{ detail.realName }}</p>
                    <p>身份证信息: {{ detail.realName }}</p>
                    <p>性别: {{ detail.sex == 0 ? '男' : '女' }}</p>
                    <p>手机号码: {{ detail.mobile }}</p>
                    <p>电子邮箱: {{ detail.email }}</p>
                </div>
            </a-col>
        </a-row>
    </a-spin>
</template>
<script>
import { racUserApi } from '@/api/Api';
export default {
    props: {
        callback: {
            type: Function,
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
            },
            rules: {
                realName: [{ required: true, message: '请输入用户名', trigger: 'blur', transform: val => val.trim() }],
            },
            loading: false,
            detail: {},
        };
    },
    methods: {
        validate() {
            let valid = false;
            this.$refs.form.validate(val => {
                valid = val;
            });
            return valid;
        },
        ok(e, successFn) {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    //查询信息
                    return this.api
                        .getByRealNameAndIdCard({ ...this.model })
                        .then(ro => {
                            this.detail = ro.extra;
                            this.callback && this.callback(ro);
                            successFn && successFn(ro);
                        })
                        .finally(() => {
                            this.loading = false;
                        });
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
