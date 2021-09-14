<template>
    <a-spin :spinning="loading">
        <a-row>
            <a-col>
                <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                    <a-form-model-item label="用户名称" prop="realName" key="realName">
                        <a-input v-model.trim="model.realName" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item label="身份证号" prop="idCard" key="idCard">
                        <a-input v-model.trim="model.idCard" placeholder="" />
                    </a-form-model-item>
                    <a-form-model-item :wrapperCol="{ span: 13, offset: 7 }">
                        <a-button type="primary" @click="ok">查询</a-button>
                    </a-form-model-item>
                </a-form-model>
            </a-col>
            <a-col class="detail-wrap" v-if="detail.id">
                <a-row class="item">
                    <a-col :span="7" class="label">用户编码：</a-col>
                    <a-col :span="17" class="value">{{ detail.code || '-' }}</a-col>
                </a-row>
                <a-row class="item">
                    <a-col :span="7" class="label">用户名称：</a-col>
                    <a-col :span="17" class="value">{{ detail.realName }}</a-col>
                </a-row>
                <a-row class="item">
                    <a-col :span="7" class="label">身份证号：</a-col>
                    <a-col :span="17" class="value">{{ detail.idCard }}</a-col>
                </a-row>
                <a-row class="item">
                    <a-col :span="7" class="label">性别：</a-col>
                    <a-col :span="17" class="value">{{ detail.sex == 0 ? '男' : '女' }}</a-col>
                </a-row>
                <a-row class="item">
                    <a-col :span="7" class="label">手机号码：</a-col>
                    <a-col :span="17" class="value">{{ detail.mobile }}</a-col>
                </a-row>
                <a-row class="item">
                    <a-col :span="7" class="label">电子邮箱：</a-col>
                    <a-col :span="17" class="value">{{ detail.email }}</a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-spin>
</template>
<script>
import { racUserApi } from '@/api/Api';
import { isIdCard } from '@/util/validator';
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
                realName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur', transform: val => val && val.trim() },
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
                            if (ro.extra) {
                                this.detail = ro.extra;
                                this.callback && this.callback(ro);
                                successFn && successFn(ro);
                            }
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
<style scoped>
.detail-wrap {
    margin: 50px 0;
}
.item {
    margin-bottom: 15px;
}
.label {
    text-align: right;
}
.value {
    padding: 0 12px;
}
</style>
