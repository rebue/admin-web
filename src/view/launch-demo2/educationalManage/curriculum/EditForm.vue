<template>
    <base-edit-form
        ref="baseEditForm"
        title="课程表"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-row>
                <a-col :span="12">
                    <a-form-model-item label="日期">
                        <a-date-picker v-model="model.value1" />
                    </a-form-model-item>
                    <!-- <a-form-model-item label="星期">
        <a-input v-model="model.value2" placeholder="" />
      </a-form-model-item> -->
                    <a-form-model-item label="上课时间" style="display: inline-block">
                        <a-date-picker v-model="model.value3" :format="dateFormat" />
                        <a-time-picker style="width:160px" v-model="model.value3" format="HH:mm:ss" />
                    </a-form-model-item>
                    <a-form-model-item label="下课时间">
                        <a-date-picker v-model="model.value4" :format="dateFormat" />
                        <a-time-picker style="width:160px" v-model="model.value4" format="HH:mm:ss" />
                    </a-form-model-item>
                    <a-form-model-item label="教学内容">
                        <a-input v-model="model.value5" placeholder="请输入教学内容" />
                    </a-form-model-item>
                    <a-form-model-item label="授课人">
                        <a-input v-model="model.value6" placeholder="请输入授课人" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="地点">
                        <a-input v-model="model.value7" placeholder="请输入地点" />
                    </a-form-model-item>
                    <a-form-model-item label="主持人">
                        <a-input v-model="model.value8" placeholder="请输入主持人" />
                    </a-form-model-item>
                    <a-form-model-item label="辅助人">
                        <a-input v-model="model.value9" placeholder="请输入辅助人" />
                    </a-form-model-item>
                    <a-form-model-item label="备注">
                        <a-input v-model="model.value10" placeholder="请输入备注" />
                    </a-form-model-item>
                    <a-form-model-item label="评估问卷">
                        <a-input v-model="model.value11" placeholder="请输入评估问卷" />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

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
            dateFormat: 'YYYY-MM-DD',
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
                        message: '请选择上课时间',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value4: [
                    {
                        required: true,
                        message: '请选择下课时间',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value5: [
                    {
                        required: true,
                        message: '请输入教学内容',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value6: [
                    {
                        required: true,
                        message: '请输入授课人',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value7: [
                    {
                        required: true,
                        message: '请输入地点',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value8: [
                    {
                        required: true,
                        message: '请输入住主持人',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value9: [
                    {
                        required: true,
                        message: '请输入辅助人',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value10: [
                    {
                        required: true,
                        message: '请输入备注',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                value11: [
                    {
                        required: true,
                        message: '请输入评估问卷',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },

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
                { dataIndex: 'value3', title: '上课时间' },
                { dataIndex: 'value4', title: '下课时间' },
                { dataIndex: 'value5', title: '教学内容' },
                { dataIndex: 'value6', title: '授课人' },
                { dataIndex: 'value7', title: '地点' },
                { dataIndex: 'value8', title: '主持人' },
                { dataIndex: 'value9', title: '辅助人' },
                { dataIndex: 'value10', title: '备注' },
                { dataIndex: 'value11', title: '评估问卷' },
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
