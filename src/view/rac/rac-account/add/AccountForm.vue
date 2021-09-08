<template>
    <a-spin :spinning="loading">
        <a-form-model ref="accountEditform" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="登录昵称" prop="signInNickname">
                <a-input v-model.trim="model.signInNickname" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="登录名称" prop="signInName">
                <a-input v-model.trim="model.signInName" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="登录密码" prop="signInPswd" v-show="editFormType === EditFormTypeDic.Add">
                <a-input-password v-model.trim="model.signInPswd" placeholder="" />
            </a-form-model-item>
            <a-form-model-item
                label="登录密码(再次确认)"
                prop="signInPswdAgain"
                v-show="editFormType === EditFormTypeDic.Add"
            >
                <a-input-password v-model.trim="model.signInPswdAgain" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="测试者" prop="isTester">
                <a-switch v-model.trim="model.isTester" checked-children="是" un-checked-children="否" />
            </a-form-model-item>
            <a-form-model-item label="账号备注" prop="remark">
                <a-input v-model.trim="model.remark" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="编码" prop="id" v-show="false">
                <a-input v-model.trim="model.id" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="领域ID" prop="realmId" v-show="false">
                <a-input v-model.trim="model.realmId" placeholder="" />
            </a-form-model-item>
            <a-form-model-item label="组织ID" prop="orgId" v-show="false">
                <a-input v-model.trim="model.orgId" placeholder="" />
            </a-form-model-item>

            <!-- <a-form-model-item :wrapperCol="{span: 13, offset: 7}">
                <a-button type="primary" @click="ok">提交</a-button>
            </a-form-model-item> -->
        </a-form-model>
    </a-spin>
</template>
<script>
import { racAccountApi } from '@/api/Api';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
export default {
    props: {
        editFormType: {
            type: String,
            default: () => EditFormTypeDic.Add,
        },
        extraModel: {
            type: Object,
            default: () => ({}),
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
        this.api = racAccountApi;
        this.addRules = {
            signInNickname: [
                { required: true, message: '请输入登录昵称', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInName: [
                { required: true, message: '请输入登录名称', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswd: [
                { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    message: '请输入登录密码(再次确认)',
                    trigger: ['change', 'blur'],
                    validator: (rule, value, callback) => {
                        if (this.editFormType === 'modify') {
                            callback();
                            return;
                        }

                        if (value === undefined) value = '';

                        value = value.trim();
                        if (value === '') {
                            callback(new Error('请输入登录密码(再次确认)'));
                            return;
                        }

                        if (value !== this.$refs.accountEditform.model.signInPswd) {
                            callback(new Error('两次输入的登录密码不相同'));
                            return;
                        }

                        callback();
                    },
                },
            ],
        };
        this.modifyRules = {
            signInName: [
                {
                    required: true,
                    message: '请输入登录名称',
                    trigger: 'blur',
                    transform: val => val && val.trim(),
                },
            ],
        };
        return {
            EditFormTypeDic,
            model: {
                signInNickname: '',
                signInName: '',
                signInPswd: '',
                signInPswdAgain: '',
                isTester: false,
                remark: '',
                id: '',
                realmId: '',
                orgId: '',
                userId: '',
            },
            rules: this.addRules,
            loading: false,
        };
    },
    mounted() {
        if (this.editFormType === EditFormTypeDic.Modify) {
            this.rules = this.modifyRules;
        } else {
            this.rules = this.addRules;
        }
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
            this.$refs.accountEditform.validate(valid => {
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
    watch: {
        extraModel: {
            handler(val) {
                this.model = { ...this.model, ...val };
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>
