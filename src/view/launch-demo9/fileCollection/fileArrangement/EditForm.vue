<template>
    <base-edit-form
        ref="baseEditForm"
        title="文件"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
        width="1000px"
    >
        <template #formItems>
            <a-row>
                <a-col :span="11">
                    <a-form-model-item label="分类号">
                        <a-select v-model="model.value1" style="width: 320px">
                            <a-select-option v-for="value1 in value1" :key="value1">
                                {{ value1 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="保管期限">
                        <a-select v-model="model.value2" style="width: 320px">
                            <a-select-option v-for="value2 in value2" :key="value2">
                                {{ value2 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="密级">
                        <a-select v-model="model.value3" style="width: 320px">
                            <a-select-option v-for="value3 in value3" :key="value3">
                                {{ value3 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="归档部门">
                        <a-select v-model="model.value4" style="width: 320px">
                            <a-select-option v-for="value4 in value4" :key="value4">
                                {{ value4 }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="在库分数">
                        <a-input v-model="model.value5" style="width: 320px" placeholder="请输入在库分数" />
                    </a-form-model-item>
                    <a-form-model-item label="报名">
                        <a-input v-model="model.value6" style="width: 320px" placeholder="请输入报名号" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item label="档号">
                        <a-input v-model="model.value7" style="width: 320px" placeholder="请输入档号" />
                    </a-form-model-item>
                    <a-form-model-item label="页数">
                        <a-input v-model="model.value9" style="width: 320px" placeholder="请输入页数" />
                    </a-form-model-item>
                    <a-form-model-item label="全宗号">
                        <a-input v-model="model.value10" style="width: 320px" placeholder="请输入全宗号" />
                    </a-form-model-item>
                    <a-form-model-item label="责任者">
                        <a-input v-model="model.value11" style="width: 320px" placeholder="请输入责任者   " />
                    </a-form-model-item>
                    <a-form-model-item label="年度">
                        <a-date-picker v-model="model.value12" style="width: 320px" />
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

const value1 = ['党务工作(01)', '党务工作(02)'];
const value2 = ['永久(Y)', '永久(N)'];
const value3 = ['公开(GK)', '私密(SM)'];
const value4 = ['06(党群工作部)', '05(党群工作部)'];
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
            value1,
            value2,
            value3,
            value4,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'value1', title: '分类号' },
                { dataIndex: 'value2', title: '保管期限' },
                { dataIndex: 'value3', title: '密级' },
                { dataIndex: 'value4', title: '归档部门' },
                { dataIndex: 'value5', title: '在库分数' },
                { dataIndex: 'value6', title: '报名' },
                { dataIndex: 'value7', title: '档号' },
                { dataIndex: 'value8', title: '序号' },
                { dataIndex: 'value9', title: '页数' },
                { dataIndex: 'value10', title: '全宗号' },
                { dataIndex: 'value11', title: '责任者' },
                { dataIndex: 'value12', title: '年度' },
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
