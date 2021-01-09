<template>
    <a-modal
        :title="fullTitle"
        okText="提交"
        :ok-button-props="{ props: { icon: 'check' } }"
        cancelText="返回"
        :cancel-button-props="{ props: { icon: 'rollback' } }"
        :width="width"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <a-spin :spinning="loading">
            <a-form-model ref="form" :model="form" :rules="rules" v-bind="formLayout">
                <slot></slot>
            </a-form-model>
        </a-spin>
    </a-modal>
</template>

<script>
import { EditFormTypeDic, getEditFormTypeName } from '@/dic/EditFormTypeDic';

export default {
    props: {
        title: {
            type: String,
            default: () => '',
        },
        width: {
            type: Number,
            default: () => 640,
        },
        visible: {
            type: Boolean,
            required: true,
        },
        editFormType: {
            type: String,
            required: true,
            default: () => EditFormTypeDic.None,
        },
        model: {
            type: Object,
            default: () => null,
        },
        form: {
            type: Object,
            default: () => null,
        },
        rules: {
            type: Object,
            default: () => {},
        },
        api: {
            type: Object,
            required: true,
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
        return {
            loading: true,
        };
    },
    computed: {
        fullTitle() {
            return (
                getEditFormTypeName(this.editFormType) +
                this.title +
                (this.editFormType === EditFormTypeDic.Modify ? '信息' : '')
            );
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.loading = true;
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getById(this.model.id)
                        .then(ro => this.$emit('update:form', ro.extra.one))
                        .catch(() => this.$emit('close'))
                        .finally(() => {
                            this.$nextTick(() => {
                                this.$focus();
                            });
                            this.loading = false;
                        });
                } else {
                    this.$nextTick(() => {
                        this.$focus();
                    });
                    this.loading = false;
                }
            } else {
                this.$refs.form.resetFields();
            }
        },
    },
    methods: {
        handleOk() {
            this.loading = true;
            const mo = this.form;
            this.$refs.form.validate(valid => {
                console.log('validate form: ', valid);
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api.add(mo)
                            .then(() => this.$emit('close'))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api.modify(mo)
                            .then(() => this.$emit('close'))
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
        handleCancel() {
            this.$emit('close');
        },
    },
};
</script>
