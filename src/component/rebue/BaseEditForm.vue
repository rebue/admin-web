<template>
    <base-modal
        :title="fullTitle"
        :loading="loading"
        :visible.sync="visible"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <slot name="formItems" :model="model">
                <a-form-model-item
                    v-for="formItem in formItems"
                    v-show="formItem.type !== 'hidden' && (formItem.visible === undefined || formItem.visible === true)"
                    :key="formItem.dataIndex"
                    :label="formItem.title"
                    :prop="formItem.dataIndex"
                >
                    <a-input-password
                        v-if="formItem.type === 'password'"
                        v-model.trim="model[formItem.dataIndex]"
                        :placeholder="'请输入' + formItem.title"
                        autocomplete="new-password"
                    />
                    <a-switch
                        v-else-if="formItem.type === 'switch'"
                        v-model.trim="model[formItem.dataIndex]"
                        checked-children="是"
                        un-checked-children="否"
                    />
                    <a-radio-group
                        v-else-if="formItem.type === 'radioGroup'"
                        v-model="model[formItem.dataIndex]"
                        button-style="solid"
                        @change="(e) => handleRadioGroupChanged(e, formItem)"
                    >
                        <a-radio-button v-for="(item, index) in formItem.radios" :value="item.value" :key="index">
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
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

export default {
    components: {
        BaseModal,
    },
    props: {
        title: {
            type: String,
            default: () => '',
        },
        editFormType: {
            type: String,
            default: () => '',
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
            model: {},
            orgName: '',
            curFullNameModify: '',
        };
    },
    watch: {
        model: {
            handler(newValue, oldValue) {
                this.orgName = this.model.name; //通过orgName，可以避免不能单独修改model.fullName的值
            },
            deep: true,
        },
        orgName: {
            handler(newValue, oldValue) {
                //newValue 改变后的数据
                //oldValue  改变前的数据
                this.changeModel(newValue, oldValue);
            },
            deep: true,
        },
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
            this.model.fullName = this.model.name;
            return this.$refs.form;
        },
    },
    methods: {
        changeModel(newValue, oldValue) {
            this.$nextTick(() => {
                if (this.editFormType === EditFormTypeDic.Add) {
                    if (this.model.superFullName) {
                        this.model.fullName = this.model.superFullName + (this.model.name ? this.model.name : '');
                        this.model.remark = this.model.fullName;
                    } else {
                        this.model.fullName = this.model.name ? this.model.name : '';
                        this.model.remark = this.model.fullName;
                    }
                }
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.model.fullName = this.curFullNameModify + (this.model.name ? this.model.name : '');
                    this.model.remark = this.model.fullName;
                }
            });
        },
        show(editFormType, model) {
            this.orgName = model.name;
            this.$emit('update:editFormType', editFormType);
            // 添加时给model初始化属性，否则输入后移开焦点，输入的内容会被清空
            if (editFormType === EditFormTypeDic.Add) {
                for (const formItem of this.formItems) {
                    if (!(formItem.dataIndex in model)) model[formItem.dataIndex] = undefined;
                }
            }
            console.log('model', model);
            this.model = model;
            // console.log('this.$refs.form', this);

            this.visible = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getById(this.model.id)
                        .then((ro) => {
                            this.$emit('update:model', ro.extra.one);
                            const regex = ro.extra.one.name;
                            this.curFullNameModify = ro.extra.one.fullName.replace(regex, '');
                            console.log('curFullNameModify', this.curFullNameModify, regex);
                        })
                        .catch(() => (this.visible = false))
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.loading = false;
                }
            });
        },
        handleRadioGroupChanged(e, formItem) {
            this.model = { ...this.model, [formItem.dataIndex]: e.target.value };
        },
        handleOk() {
            this.loading = true;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .add(this.model)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api
                            .modify(this.model)
                            .then(() => (this.visible = false))
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
};
</script>