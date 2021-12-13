<template>
    <base-edit-form
        ref="baseEditForm"
        title="项目"
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
                <a-col :span="24">
                    <a-form-model-item label="年度项目编号">
                        <a-input v-model="model.value1" placeholder="请输入年度项目编号" />
                    </a-form-model-item>
                    <a-form-model-item label="年度项目名称">
                        <a-input v-model="model.value2" placeholder="请输入年度项目名称" />
                    </a-form-model-item>
                    <a-form-model-item label="年度">
                        <a-select v-model="model.value3" style="width: 320px">
                            <a-select-option v-for="value3 in value3" :key="value3">
                                {{ value3 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="分类表">
                        <a-select v-model="model.value4" style="width: 320px">
                            <a-select-option v-for="value4 in value4" :key="value4">
                                {{ value4 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="保管期限">
                        <a-select v-model="model.value5">
                            <a-select-option v-for="value5 in value5" :key="value5">
                                {{ value5 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="整改规划">
                        <a-input v-model="model.value6" placeholder="请输入整改规划" />
                    </a-form-model-item>
                    <a-form-model-item label="归档部门">
                        <a-select v-model="model.value7">
                            <a-select-option v-for="value7 in value7" :key="value7">
                                {{ value7 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="密级">
                        <a-select v-model="model.value8">
                            <a-select-option v-for="value8 in value8" :key="value8">
                                {{ value8 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="项目类型">
                        <a-select v-model="model.value9">
                            <a-select-option v-for="value9 in value9" :key="value9">
                                {{ value9 }}
                            </a-select-option>
                        </a-select>
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

const value3 = ['2021年', '2020年', '2019年', '2018年', '2017年', '2016年', '2015年'];
const value4 = ['分类表1', '分类表2', '分类表3'];
const value5 = ['永久', '1天', '3天', '7天', '30天'];
const value7 = ['财务部', '办公室', '机关党委', '指挥部办公室', '绩效办公室'];
const value8 = ['公开(GK)', '私密(SM)'];
const value9 = ['类型1', '类型2', '类型13'];
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
            value3,
            value4,
            value5,
            value7,
            value8,
            value9,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'value1', title: '年度项目编号' },
                { dataIndex: 'value2', title: '年度项目名称' },
                { dataIndex: 'value3', title: '年度' },
                { dataIndex: 'value4', title: '分类表' },
                { dataIndex: 'value5', title: '保管期限' },
                { dataIndex: 'value6', title: '整改规划' },
                { dataIndex: 'value7', title: '归档部门' },
                { dataIndex: 'value8', title: '密级' },
                { dataIndex: 'value9', title: '项目类型' },
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
