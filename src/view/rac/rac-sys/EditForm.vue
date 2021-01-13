<template>
    <base-edit-form
        ref="baseEditForm"
        title="系统"
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
import { racSysApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racSysApi;
        return {
            editFormType: EditFormTypeDic.None,
            rules: {
                id: [
                    { required: true, message: '请输入系统编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入系统名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'id', title: '编码', disabled: this.editFormType === EditFormTypeDic.Modify },
                { dataIndex: 'name', title: '名称' },
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
