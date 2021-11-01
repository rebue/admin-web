<template>
    <base-edit-form
        ref="baseEditForm"
        title="字典项"
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
import { racDicItemApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racDicItemApi;
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            formItems: [
                { dataIndex: 'dicItemKey', title: '字典项Key' },
                { dataIndex: 'name', title: '字典项名称' },
                { dataIndex: 'dicItemValue', title: '字典项值' },
                { dataIndex: 'dicId', title: '字典ID', type: 'hidden' },
                { dataIndex: 'remark', title: '备注' },
            ],
            rules: {
                dicItemKey: [
                    {
                        required: true,
                        message: '请输入字典项Key',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入字典项名称',
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
