<template>
    <base-edit-form
        ref="baseEditForm"
        title="角色"
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
import { racRoleApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racRoleApi;
        return {
            editFormType: EditFormTypeDic.None,
            rules: {
                id: [
                    { required: true, message: '请输入角色编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'id', title: '编码', disabled: this.editFormType === EditFormTypeDic.Modify },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'domainId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'remark', title: '备注' },
            ];
        },
    },
    methods: {
        show: function(editFormType, ...params) {
            this.editFormType = editFormType;
            this.$refs.baseEditForm.show(editFormType, ...params);
        },
    },
};
</script>
