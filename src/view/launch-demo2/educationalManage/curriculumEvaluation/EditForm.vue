<template>
    <base-edit-form
        ref="baseEditForm"
        title="课表评估"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-form-model-item label="日期">
                <a-date-picker style="width:320px" v-model="model.value1" />
            </a-form-model-item>
            <!-- <a-form-model-item label="星期">
        <a-input v-model="model.value2" placeholder="" />
      </a-form-model-item> -->
            <a-form-model-item label="午别">
                <a-select v-model="model.value3">
                    <a-select-option v-for="(value3, index) in value3" :key="index">
                        {{ value3 }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="教学内容">
                <a-input v-model="model.value4" placeholder="请输入教学内容" />
            </a-form-model-item>
            <a-form-model-item label="授课人">
                <a-input v-model="model.value5" placeholder="请输入授课人" />
            </a-form-model-item>
            <a-form-model-item label="地点">
                <a-input v-model="model.value6" placeholder="请输入地点" />
            </a-form-model-item>
            <a-form-model-item label="评估问卷">
                <a-input v-model="model.value7" placeholder="请输入评估问卷" />
            </a-form-model-item>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

const value3 = ['上午', '下午'];

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
                        message: '请选择日期',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value3: [
                    {
                        required: true,
                        message: '请选择午别',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value4: [
                    {
                        required: true,
                        message: '请输入教学内容',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value5: [
                    {
                        required: true,
                        message: '请输入授课人',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value6: [
                    {
                        required: true,
                        message: '请输入地点',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value7: [
                    {
                        required: true,
                        message: '请输入评估问卷',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            value3,
            api: {},
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'value1',
                    title: '日期',
                },
                { dataIndex: 'value3', title: '午别' },
                { dataIndex: 'value4', title: '教学内容' },
                { dataIndex: 'value5', title: '授课人' },
                { dataIndex: 'value6', title: '地点' },
                { dataIndex: 'value7', title: '评估问卷' },
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
