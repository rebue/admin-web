<template>
    <base-edit-form
        ref="baseEditForm"
        title="领域"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-form-model-item label="教学点编号">
                <a-select v-model="model.teachPointNum" style="width: 320px">
                    <a-select-option v-for="teachPointNum in teachPointNum" :key="teachPointNum">
                        {{ teachPointNum }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="专业编号">
                <a-select v-model="model.majorNum" style="width: 320px">
                    <a-select-option v-for="majorNum in majorNum" :key="majorNum">
                        {{ majorNum }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="录取指标">
                <a-input placeholder="请输入录取指标" />
            </a-form-model-item>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

const teachPointNum = ['中共广西区委党校', '中共广西政法大学'];
const majorNum = ['电子商务', '公共管理', '计算机应用', '政治与法律', '软件技术', '中共党史'];
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
                teachPointNum: [
                    {
                        required: true,
                        message: '请输入教学点编号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                majorNum: [
                    { required: true, message: '请输入专业编号', trigger: 'blur', transform: val => val && val.trim() },
                ],
                admissionIndex: [
                    { required: true, message: '请输入录取指标', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            majorNum,
            teachPointNum,
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'teachPointNum',
                    title: '教学点编号',
                    disabled: this.editFormType === EditFormTypeDic.Modify,
                },
                { dataIndex: 'majorNum', title: '专业编号' },
                { dataIndex: 'admissionIndex', title: '录取指标' },
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
