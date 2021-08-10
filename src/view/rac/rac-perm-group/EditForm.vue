<template>
    <base-edit-form
        ref="baseEditForm"
        title="权限分组"
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
import { racPermGroupApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racPermGroupApi;
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            formItems: [
                { dataIndex: 'id', title: '编码', type: 'hidden' },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'realmId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'remark', title: '备注' },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入权限分组名称',
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
