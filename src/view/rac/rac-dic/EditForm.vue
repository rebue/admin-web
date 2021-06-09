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
import { SysDic } from '@/dic/SysDic';

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
        const syss = Object.values(SysDic)
            .filter(item => typeof item == 'string')
            .map(item => {
                return {
                    value: item,
                    title: SysDic.getName(item),
                };
            });
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            formItems: [
                { dataIndex: 'id', title: '字典ID' },
                { dataIndex: 'name', title: '字典名称' },
                { dataIndex: 'domainId', title: '领域ID', type: 'radioGroup', radios: domains },
                {
                    dataIndex: 'sysId',
                    title: '系统ID',
                    type: 'radioGroup',
                    radios: syss,
                },
                { dataIndex: 'remark', title: '备注' },
            ],
            rules: {
                id: [
                    {
                        required: true,
                        message: '请输入字典ID',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
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
