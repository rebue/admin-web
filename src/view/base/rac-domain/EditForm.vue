<template>
    <base-edit-form :formItems="formItems" :rules="rules" :api="api" v-bind="$attrs" v-on="$listeners">
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        return {
            api: racDomainApi,
            rules: {
                id: [
                    { required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'id', title: '编码', disabled: this.$attrs.editFormType === EditFormTypeDic.Modify },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'remark', title: '备注' },
            ];
        },
    },
};
</script>
