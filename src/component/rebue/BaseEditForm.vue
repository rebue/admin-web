<template>
    <!-- FIXME 如果不包裹上iframe，在同一页面如果有两个EditForm，显示前面的EditForm时，
        在form-model-item下的输入框打任意一个字就会马上失去焦点 -->
    <!-- FIXME 如果没有属性destroyOnClose=true，新建分组和添加新权限都点击后，再点击设置焦点会失效 -->
    <iframe v-show="false">
        <a-modal
            :title="fullTitle"
            okText="提交"
            :ok-button-props="{ props: { icon: 'check' } }"
            cancelText="返回"
            :cancel-button-props="{ props: { icon: 'rollback' } }"
            :width="width"
            :centered="true"
            :visible="visible"
            :destroyOnClose="true"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-spin :spinning="loading">
                <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                    <slot name="formItems" :model="model">
                        <a-form-model-item
                            v-for="formItem in formItems"
                            v-show="formItem.type !== 'hidden'"
                            :key="formItem.dataIndex"
                            :label="formItem.title"
                            :prop="formItem.dataIndex"
                        >
                            <a-radio-group
                                v-if="formItem.type === 'radioGroup'"
                                v-model="model[formItem.dataIndex]"
                                button-style="solid"
                                @change="e => handleRadioGroupChanged(e, formItem)"
                            >
                                <a-radio-button
                                    v-for="(item, index) in formItem.radios"
                                    :value="item.value"
                                    :key="index"
                                >
                                    {{ item.title }}
                                </a-radio-button>
                            </a-radio-group>
                            <a-input
                                v-else
                                v-model.trim="model[formItem.dataIndex]"
                                :placeholder="'请输入' + formItem.title"
                                :type="formItem.type"
                                :disabled="formItem.disabled"
                            />
                        </a-form-model-item>
                    </slot>
                </a-form-model>
            </a-spin>
        </a-modal>
    </iframe>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

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
        formItems: {
            type: Array,
            default: () => [],
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
            visible: false,
            editFormType: EditFormTypeDic.None,
            model: {},
        };
    },
    computed: {
        fullTitle() {
            return (
                EditFormTypeDic.getName(this.editFormType) +
                this.title +
                (this.editFormType === EditFormTypeDic.Modify ? '信息' : '')
            );
        },
        form() {
            return this.$refs.form;
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.loading = true;
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getById(this.model.id)
                        .then(ro => this.$emit('update:model', ro.extra.one))
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
        show(editFormType, model) {
            this.model = model;
            this.editFormType = editFormType;
            this.visible = true;
        },
        handleRadioGroupChanged(e, formItem) {
            console.log('handleRadioGroupChanged', e, formItem);
            this.model = { ...this.model, [formItem.dataIndex]: e.target.value };
        },
        handleOk() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                console.log('validate form: ', valid, this.model);
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .add(this.model)
                            .then(() => this.handleClose())
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api
                            .modify(this.model)
                            .then(() => this.handleClose())
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
            this.handleClose();
        },
        handleClose() {
            this.$emit('close');
            this.visible = false;
        },
    },
};
</script>
