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
