<template>
    <base-edit-form
        ref="baseEditForm"
        title="字典"
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
import { racDicApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';
import { DomainDic } from '@/dic/DomainDic';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racDicApi;
        const domains = Object.values(DomainDic)
            .filter(item => typeof item == 'string')
            .map(item => {
                return {
                    value: item,
                    title: DomainDic.getName(item),
                };
            });
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            formItems: [
                { dataIndex: 'name', title: '字典名称' },
                { dataIndex: 'domainId', title: '领域ID', type: 'radioGroup', radios: domains },
                { dataIndex: 'sysId', title: '系统ID' },
                { dataIndex: 'remark', title: '备注' },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入字典名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
        };
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
    },
};
</script>
