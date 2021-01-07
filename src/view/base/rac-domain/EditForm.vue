<template>
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
        <a-spin :spinning="loading">
            <a-form-model ref="form" :model="form" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="编码" prop="id">
                    <a-input v-model.trim="form.id" placeholder="请输入领域编码" :disabled="modifyDisabled" />
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
import { EditFormTypeDic, getEditFormTypeName } from '@/dic/EditFormTypeDic';
import RacDomainApi from '@/api/rac/RacDomainApi';
import RacDomainMo from '@/mo/rac/RacDomainMo';
import { locateFirstInput, locateFirstErrorInput } from '@/util/comm';

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
            loading: true,
            form: new RacDomainMo(),
            rules: {
                id: [
                    { required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
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
        modifyDisabled() {
            return this.editFormType === EditFormTypeDic.Modify;
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.loading = true;
                if (this.editFormType === EditFormTypeDic.Modify) {
                    RacDomainApi.getById(this.model.id)
                        .then(ro => (this.form = ro.extra.one))
                        .catch(() => this.$emit('close'))
                        .finally(() => {
                            this.$nextTick(() => {
                                locateFirstInput();
                            });
                            this.loading = false;
                        });
                } else {
                    this.$nextTick(() => {
                        locateFirstInput();
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
                        RacDomainApi.add(mo)
                            .then(() => this.$emit('close'))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        RacDomainApi.modify(mo)
                            .then(() => this.$emit('close'))
                            .finally(() => (this.loading = false));
                    }
                } else {
                    this.$nextTick(() => {
                        locateFirstErrorInput(); // 定位到第一个出错的输入框
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
