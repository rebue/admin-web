<template>
    <a-modal
        title="编辑领域"
        :width="640"
        :visible="visible"
        :confirmLoading="loading"
        @ok="$emit('ok')"
        @cancel="$emit('cancel')"
    >
        <a-spin :spinning="loading">
            <a-form-model ref="form" :model="form" :rules="rules" v-bind="formLayout">
                <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
                <a-form-model-item label="编码" prop="id">
                    <a-input auto-focus v-model.trim="form.id" placeholder="请输入领域编码" />
                </a-form-model-item>
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model.trim="form.name" placeholder="请输入领域名称" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model.trim="form.remark" placeholder="请输入领域备注" />
                </a-form-model-item>
            </a-form-model>
        </a-spin>
    </a-modal>
</template>

<script>
// 表单字段
const fields = ['description', 'id'];

export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        loading: {
            type: Boolean,
            default: () => false,
        },
        record: {
            type: Object,
            default: () => null,
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
            form: this.record,
            rules: {
                id: [{ required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val.trim() }],
                name: [{ required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val.trim() }],
            },
        };
    },
};
</script>
