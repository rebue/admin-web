<template>
    <base-edit-form
        ref="baseEditForm"
        title="应用"
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
import { racAppApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racAppApi;
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            rules: {
                id: [
                    { required: true, message: '请输入应用编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入应用名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'id', title: '编码', disabled: this.editFormType === EditFormTypeDic.Modify },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'url', title: 'URL' },
                { dataIndex: 'realmId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'remark', title: '备注' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
    },
};
</script>
