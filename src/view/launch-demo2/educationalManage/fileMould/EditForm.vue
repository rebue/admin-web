<template>
    <base-edit-form
        ref="baseEditForm"
        title="文档模板"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-form-model-item label="类型">
                <a-select v-model="model.value1">
                    <a-select-option v-for="(value1, index) in value1" :key="index">
                        {{ value1 }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="名称">
                <a-input v-model="model.value2" placeholder="请输入名称" />
            </a-form-model-item>
            <a-form-model-item label="简要说明">
                <a-input v-model="model.value3" placeholder="请输入简要说明" />
            </a-form-model-item>
            <a-form-model-item label="责任部门">
                <a-select v-model="model.value4">
                    <a-select-option v-for="(value4, index) in value4" :key="index">
                        {{ value4 }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="模板文件">
                <a-input v-model="model.value5" placeholder="请输入模板文件" />
            </a-form-model-item>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

const value1 = ['单份文档', '内置功能'];
const value4 = ['教学部', '教学项目负责人'];

export default {
    components: {
        BaseEditForm,
    },
    data() {
        // this.api=racRealmApi
        return {
            record: {},
            editFormType: EditFormTypeDic.None,
            model: {},
            rules: {
                value1: [
                    {
                        required: true,
                        message: '请选择类型',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value2: [
                    {
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value3: [
                    {
                        required: true,
                        message: '请输入简要说明',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value4: [
                    {
                        required: true,
                        message: '请选择责任部门',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value5: [
                    {
                        required: true,
                        message: '请输入模板文件',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            value1,
            value4,
            api: {},
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'value1',
                    title: '类型',
                    disabled: this.editFormType === EditFormTypeDic.Modify,
                },
                { dataIndex: 'value2', title: '名称' },
                { dataIndex: 'value3', title: '简要说明' },
                { dataIndex: 'value4', title: '责任部门' },
                { dataIndex: 'value5', title: '模板文件' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.record = { ...params[1] };
            this.$refs.baseEditForm.show(...params);
        },
    },
    watch: {
        record: {
            handler(val) {
                this.api = {
                    getById(id) {
                        const p = new Promise(resolve => {
                            const ro = {
                                extra: {
                                    one: { ...val },
                                },
                            };
                            console.log('----ro', ro);
                            resolve(ro);
                        });
                        return p;
                    },
                };
            },
        },
    },
};
</script>
