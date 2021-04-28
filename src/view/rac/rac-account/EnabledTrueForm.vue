<template>
    <base-modal
        ref="baseModal"
        title="备注"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="lockReason" label="锁定原因" prop="lockReason">
                <a-input v-autofocus v-model.trim="model.lockReason" placeholder="请输入锁定原因" />
            </a-form-model-item>
            <!-- <a-form-model-item key="unlockReason" label="解锁原因" prop="unlockReason">
                <a-input
                    v-show="record.isEnabled===false"
                    v-model.trim="model.unlockReason"
                    placeholder="请输入解锁原因"
                />
            </a-form-model-item> -->
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racDomainApi, racAccountApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        // id: {
        //     type: String,
        //     required: true,
        // },
        record: {
            type: Object,
            required: true,
        },
    },
    data() {
        this.rules = {
            lockReason: [
                { required: true, message: '请输入锁定原因', trigger: 'blur', transform: val => val && val.trim() },
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
                lockReason: '',
            },
        };
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.$refs.form.resetFields();
            });
        },
        handleOk() {
            this.record.lockReason = this.model.lockReason;
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    racAccountApi
                        .enable(this.record)
                        .then(() => this.$emit('update:visible', false))
                        .finally(() => (this.loading = false));
                    this.loading = false;
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
