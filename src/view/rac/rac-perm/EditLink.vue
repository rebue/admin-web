<template>
    <base-modal
        ref="baseModal"
        title="链接"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
        :width="750"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="permLink" label="输入链接" prop="permLink" style="width: 700px">
                <a-textarea v-autofocus v-model.trim="model.permLink" placeholder="请输入链接" rows="10" cols="250" />
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racPermUrnApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
    data() {
        this.rules = {
            permLink: [
                { required: true, message: '请输入输入链接', trigger: 'blur', transform: val => val && val.trim() },
            ],
        };
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
            loading: false,
            model: {
                permLink: '',
            },
        };
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.model = {};
                this.$refs.form.resetFields();
            });
        },
        handleOk() {
            this.record.urn = this.model.permLink.split(/\n/);
            this.record.permId = this.record.id;
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    racPermUrnApi
                        .modifyByPermId(this.record)
                        .then(() => this.$emit('update:visible', false))
                        .finally(() => (this.loading = false));
                    this.loading = false;
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
