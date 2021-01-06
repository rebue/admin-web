<template>
    <a-spin :spinning="loading">
        <a-modal
            :title="fullTitle"
            okText="提交"
            :ok-button-props="{ props: { icon: 'check' } }"
            cancelText="返回"
            :cancel-button-props="{ props: { icon: 'rollback' } }"
            :width="640"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="编码" prop="id">
                    <a-input auto-focus v-model.trim="model.id" placeholder="请输入领域编码" />
                </a-form-model-item>
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model.trim="model.name" placeholder="请输入领域名称" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model.trim="model.remark" placeholder="请输入领域备注" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </a-spin>
</template>

<script>
import { EditFormTypeDic, getEditFormTypeName } from '@/dic/EditFormTypeDic';

export default {
    props: {
        title: {
            type: String,
            default: () => '',
        },
        model: {
            type: Object,
            default: () => null,
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
            loading: false,
            rules: {
                id: [{ required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val.trim() }],
                name: [{ required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val.trim() }],
            },
        };
    },
    computed: {
        fullTitle() {
            return (
                getEditFormTypeName(this.editFormType) +
                this.title +
                (this.editFormType === EditFormTypeDic.Update ? '信息' : '')
            );
        },
    },
    methods: {
        handleOk() {
            this.$emit('close');
        },
        handleCancel() {
            this.$emit('close');
        },
    },
};
</script>
