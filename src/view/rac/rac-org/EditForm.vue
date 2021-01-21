<template>
    <base-edit-form
        ref="baseEditForm"
        title="权限分组"
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
import { racOrgApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racOrgApi;
        return {
            editFormType: EditFormTypeDic.None,
            formItems: [
                { dataIndex: 'id', title: '编码', type: 'hidden' },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'domainId', title: '领域ID', type: 'hidden' },
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
        show: function(editFormType, ...params) {
            this.editFormType = editFormType;
            this.$refs.baseEditForm.show(editFormType, ...params);
        },
    },
};
</script>
